import { inject, injectable } from 'tsyringe';
import { AIService, AIServiceToken } from '@/domain/services/AIService';
import BaseUseCase from '../BaseUseCase';

interface Input {
  resourceName: string;
  resourceDescription: string;
  contentType?: 'documentation' | 'code' | 'tutorial' | 'summary';
  maxTokens?: number;
}

interface Output {
  content: string;
  model: string;
  tokensUsed: number;
  contentType: string;
}

@injectable()
export default class GenerateResourceContentUseCase extends BaseUseCase<Input, Output> {
  constructor(
    @inject(AIServiceToken) private aiService: AIService,
  ) {
    super();
  }

  async execute(input: Input): Promise<Output> {
    const contentType = input.contentType ?? 'documentation';

    const systemPrompt = this.buildSystemPrompt(contentType);

    const userPrompt = this.buildUserPrompt(
      input.resourceName,
      input.resourceDescription,
      contentType,
    );

    const result = await this.aiService.generateText({
      userPrompt,
      systemPrompt,
      maxTokens: input.maxTokens ?? 1000,
    });

    return {
      content: result.content,
      model: result.model,
      tokensUsed: result.tokensUsed,
      contentType,
    };
  }

  private buildSystemPrompt(contentType: string): string {
    const prompts: Record<string, string> = {
      documentation: 'You are a technical writer. Generate clear, comprehensive documentation.',
      code: 'You are a software developer. Generate clean, well-commented code with examples.',
      tutorial: 'You are an educator. Create step-by-step tutorials that are easy to follow.',
      summary: 'You are a summarization expert. Create concise, informative summaries.',
    };

    return prompts[contentType] || prompts.documentation;
  }

  private buildUserPrompt(name: string, description: string, contentType: string): string {
    return `Generate ${contentType} content for a resource named "${name}".

Description: ${description}

Please provide high-quality, relevant content that matches the resource's purpose and description.`;
  }
}
