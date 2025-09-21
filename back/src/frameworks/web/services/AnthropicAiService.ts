import { singleton } from 'tsyringe';
import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import type {
  AIService,
  GenerateTextRequest,
  GenerateTextResponse,
  ConversationMessage,
} from '@/domain/services/AIService';
import AiServiceError from '@/domain/errors/AiServiceError';

@singleton()
export default class AnthropicAiService implements AIService {
  private readonly chatModel: ChatAnthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY ?? '';
    if (!apiKey) {
      throw new AiServiceError('ANTHROPIC_API_KEY environment variable is required');
    }

    this.chatModel = new ChatAnthropic({
      anthropicApiKey: apiKey,
      model: 'claude-3-5-sonnet-20241022',
      maxTokens: 4000,
      temperature: 0.1,
    });
  }

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    try {
      const messages = [];

      // Add system prompt if provided
      if (request.systemPrompt) {
        messages.push(new SystemMessage(request.systemPrompt));
      }

      // Add conversation history if provided
      if (request.conversationHistory) {
        const historyMessages = request.conversationHistory.map((msg: ConversationMessage) => {
          switch (msg.role) {
            case 'system':
              return new SystemMessage(msg.content);
            case 'user':
              return new HumanMessage(msg.content);
            case 'assistant':
              return new AIMessage(msg.content);
            default:
              throw new AiServiceError(`Unsupported message role: ${String(msg.role)}`);
          }
        });
        messages.push(...historyMessages);
      }

      // Add the current user prompt
      messages.push(new HumanMessage(request.userPrompt));

      const response = await this.chatModel.invoke(messages);
      const content = response.content as string;

      return {
        content,
        model: this.chatModel.model,
        tokensUsed: response.usage_metadata?.total_tokens ?? 0,
      };
    } catch (error) {
      if (error instanceof AiServiceError) {
        throw error;
      }
      throw new AiServiceError(`Failed to generate text: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
