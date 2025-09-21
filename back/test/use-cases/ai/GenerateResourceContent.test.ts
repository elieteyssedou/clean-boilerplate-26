import { expect } from 'chai';
import { createSandbox } from 'sinon';
import GenerateResourceContentUseCase from '@/use-cases/ai/GenerateResourceContent';
import type { AIService } from '@/domain/services/AIService';

describe('GenerateResourceContentUseCase', () => {
  const sandbox = createSandbox();
  let useCase: GenerateResourceContentUseCase;
  let mockAIService: AIService;
  let generateTextStub: sinon.SinonStub;

  beforeEach(() => {
    const generateTextStubTemp = sandbox.stub();
    mockAIService = {
      generateText: generateTextStubTemp,
    };

    generateTextStub = generateTextStubTemp;

    useCase = new GenerateResourceContentUseCase(mockAIService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('execute', () => {
    const validInput = {
      resourceName: 'Test Resource',
      resourceDescription: 'A test resource for demonstration',
      contentType: 'documentation' as const,
      maxTokens: 500,
    };

    it('should generate content successfully', async () => {
      const mockResponse = {
        content: 'Generated documentation content',
        model: 'claude-3-5-sonnet-20241022',
        tokensUsed: 150,
      };

      // Using global generateTextStub
      generateTextStub.resolves(mockResponse);

      const result = await useCase.execute(validInput);

      expect(generateTextStub).to.have.been.calledOnce;

      const callArgs = generateTextStub.getCall(0).args[0];
      expect(callArgs.systemPrompt).to.include('technical writer');
      expect(callArgs.userPrompt).to.include(validInput.resourceName);
      expect(callArgs.userPrompt).to.include(validInput.resourceDescription);
      expect(callArgs.maxTokens).to.equal(validInput.maxTokens);

      expect(result).to.deep.equal({
        content: mockResponse.content,
        model: mockResponse.model,
        tokensUsed: mockResponse.tokensUsed,
        contentType: validInput.contentType,
      });
    });

    it('should use default contentType when not provided', async () => {
      const inputWithoutContentType = {
        resourceName: validInput.resourceName,
        resourceDescription: validInput.resourceDescription,
      };

      const mockResponse = {
        content: 'Generated content',
        model: 'claude-3-5-sonnet-20241022',
        tokensUsed: 100,
      };

      // Using global generateTextStub
      generateTextStub.resolves(mockResponse);

      const result = await useCase.execute(inputWithoutContentType);

      expect(result.contentType).to.equal('documentation');

      const callArgs = generateTextStub.getCall(0).args[0];
      expect(callArgs.systemPrompt).to.include('technical writer');
    });

    it('should use default maxTokens when not provided', async () => {
      const inputWithoutMaxTokens = {
        resourceName: validInput.resourceName,
        resourceDescription: validInput.resourceDescription,
        contentType: validInput.contentType,
      };

      // Using global generateTextStub
      generateTextStub.resolves({
        content: 'Generated content',
        model: 'claude-3-5-sonnet-20241022',
        tokensUsed: 100,
      });

      await useCase.execute(inputWithoutMaxTokens);

      const callArgs = generateTextStub.getCall(0).args[0];
      expect(callArgs.maxTokens).to.equal(1000);
    });

    it('should handle different content types with appropriate system prompts', async () => {
      const contentTypes = [
        { type: 'code' as const, expectedPrompt: 'software developer' },
        { type: 'tutorial' as const, expectedPrompt: 'educator' },
        { type: 'summary' as const, expectedPrompt: 'summarization expert' },
      ];

      // Using global generateTextStub
      generateTextStub.resolves({
        content: 'Generated content',
        model: 'claude-3-5-sonnet-20241022',
        tokensUsed: 100,
      });

      for (const { type, expectedPrompt } of contentTypes) {
        const input = { ...validInput, contentType: type };
        await useCase.execute(input);

        const callArgs = generateTextStub.getCall(-1).args[0];
        expect(callArgs.systemPrompt).to.include(expectedPrompt);
      }
    });

    it('should propagate AI service errors', async () => {
      const aiError = new Error('AI service unavailable');
      // Using global generateTextStub
      generateTextStub.rejects(aiError);

      try {
        await useCase.execute(validInput);
        expect.fail('Should have thrown AI service error');
      } catch (error) {
        expect(error).to.equal(aiError);
      }
    });

    it('should build proper user prompt with resource details', async () => {
      // Using global generateTextStub
      generateTextStub.resolves({
        content: 'Generated content',
        model: 'claude-3-5-sonnet-20241022',
        tokensUsed: 100,
      });

      await useCase.execute(validInput);

      const callArgs = generateTextStub.getCall(0).args[0];
      expect(callArgs.userPrompt).to.include(`Generate ${validInput.contentType} content`);
      expect(callArgs.userPrompt).to.include(`"${validInput.resourceName}"`);
      expect(callArgs.userPrompt).to.include(`Description: ${validInput.resourceDescription}`);
    });
  });
});
