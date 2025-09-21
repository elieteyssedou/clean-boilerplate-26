import { injectable } from 'tsyringe';
import type {
  AIService,
  GenerateTextRequest,
  GenerateTextResponse,
} from '@/domain/services/AIService';

/**
 * Mock implementation of AIService for testing purposes
 * Returns consistent, predictable responses for text generation
 */
@injectable()
export default class MockAIService implements AIService {
  /**
   * Mock implementation of text generation
   * Returns predefined responses based on content type
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    // Determine response based on system prompt content type
    const isCodeGeneration = request.systemPrompt?.includes('software developer');
    const isTutorial = request.systemPrompt?.includes('educator');
    const isSummary = request.systemPrompt?.includes('summarization');

    let content = 'Generated documentation content';
    if (isCodeGeneration) {
      content = 'Generated code content with examples';
    } else if (isTutorial) {
      content = 'Generated tutorial content with step-by-step instructions';
    } else if (isSummary) {
      content = 'Generated summary content';
    }

    return Promise.resolve({
      content,
      model: 'claude-3-5-sonnet-20241022',
      tokensUsed: 150,
    });
  }
}
