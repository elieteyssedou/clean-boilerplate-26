import expect from '@test/chai';
import sinon from 'sinon';
import AnthropicAiService from '@/frameworks/web/services/AnthropicAiService';
import type { GenerateTextRequest } from '@/domain/services/AIService';
import AiServiceError from '@/domain/errors/AiServiceError';

describe('AnthropicAiService', () => {
  let anthropicAiService: AnthropicAiService;
  let mockChatModel: any;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Mock the ChatAnthropic instance
    mockChatModel = {
      invoke: sandbox.stub(),
      model: 'claude-3-5-sonnet-20241022',
    };

    anthropicAiService = new AnthropicAiService();
    // Replace the private chatModel with our mock
    (anthropicAiService as any).chatModel = mockChatModel;
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should throw error when ANTHROPIC_API_KEY is not set', () => {
      const originalKey = process.env.ANTHROPIC_API_KEY;
      delete process.env.ANTHROPIC_API_KEY;

      expect(() => new AnthropicAiService()).to.throw(AiServiceError, 'ANTHROPIC_API_KEY environment variable is required');

      process.env.ANTHROPIC_API_KEY = originalKey;
    });

    it('should throw error when ANTHROPIC_API_KEY is empty', () => {
      const originalKey = process.env.ANTHROPIC_API_KEY;
      process.env.ANTHROPIC_API_KEY = '';

      expect(() => new AnthropicAiService()).to.throw(AiServiceError, 'ANTHROPIC_API_KEY environment variable is required');

      process.env.ANTHROPIC_API_KEY = originalKey;
    });
  });

  describe('generateText', () => {
    it('should generate text with user prompt only', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Hello, how are you?',
      };

      const mockResponse = {
        content: 'I am doing well, thank you!',
        usage_metadata: { total_tokens: 25 },
      };

      mockChatModel.invoke.resolves(mockResponse);

      const result = await anthropicAiService.generateText(request);

      expect(result).to.deep.equal({
        content: 'I am doing well, thank you!',
        model: 'claude-3-5-sonnet-20241022',
        tokensUsed: 25,
      });

      expect(mockChatModel.invoke).to.have.been.calledOnce;
      const messages = mockChatModel.invoke.getCall(0).args[0];
      expect(messages).to.have.length(1);
      expect(messages[0].content).to.equal('Hello, how are you?');
    });

    it('should include system prompt when provided', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'What is AI?',
        systemPrompt: 'You are a helpful assistant specialized in technology.',
      };

      const mockResponse = {
        content: 'AI stands for Artificial Intelligence...',
        usage_metadata: { total_tokens: 50 },
      };

      mockChatModel.invoke.resolves(mockResponse);

      await anthropicAiService.generateText(request);

      const messages = mockChatModel.invoke.getCall(0).args[0];
      expect(messages).to.have.length(2);
      expect(messages[0].content).to.equal('You are a helpful assistant specialized in technology.');
      expect(messages[1].content).to.equal('What is AI?');
    });

    it('should include conversation history when provided', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Can you elaborate?',
        conversationHistory: [
          { role: 'user', content: 'What is machine learning?' },
          { role: 'assistant', content: 'Machine learning is a subset of AI...' },
        ],
      };

      const mockResponse = {
        content: 'Certainly! Machine learning involves...',
        usage_metadata: { total_tokens: 75 },
      };

      mockChatModel.invoke.resolves(mockResponse);

      await anthropicAiService.generateText(request);

      const messages = mockChatModel.invoke.getCall(0).args[0];
      expect(messages).to.have.length(3);
      expect(messages[0].content).to.equal('What is machine learning?');
      expect(messages[1].content).to.equal('Machine learning is a subset of AI...');
      expect(messages[2].content).to.equal('Can you elaborate?');
    });

    it('should include both system prompt and conversation history', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Continue the explanation',
        systemPrompt: 'You are an AI expert.',
        conversationHistory: [
          { role: 'user', content: 'Tell me about neural networks' },
          { role: 'assistant', content: 'Neural networks are computing systems...' },
        ],
      };

      const mockResponse = {
        content: 'Neural networks consist of layers...',
        usage_metadata: { total_tokens: 100 },
      };

      mockChatModel.invoke.resolves(mockResponse);

      await anthropicAiService.generateText(request);

      const messages = mockChatModel.invoke.getCall(0).args[0];
      expect(messages).to.have.length(4);
      expect(messages[0].content).to.equal('You are an AI expert.');
      expect(messages[1].content).to.equal('Tell me about neural networks');
      expect(messages[2].content).to.equal('Neural networks are computing systems...');
      expect(messages[3].content).to.equal('Continue the explanation');
    });

    it('should handle response without usage metadata', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Hello',
      };

      const mockResponse = {
        content: 'Hi there!',
        // No usage_metadata
      };

      mockChatModel.invoke.resolves(mockResponse);

      const result = await anthropicAiService.generateText(request);

      expect(result.tokensUsed).to.equal(0);
    });

    it('should throw AiServiceError for unsupported message roles', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Hello',
        conversationHistory: [
          { role: 'unknown' as any, content: 'Some message' },
        ],
      };

      await expect(anthropicAiService.generateText(request))
        .to.be.rejectedWith(AiServiceError, 'Unsupported message role: unknown');
    });

    it('should wrap and re-throw AiServiceError', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Hello',
      };

      const originalError = new AiServiceError('Original AI service error');
      mockChatModel.invoke.rejects(originalError);

      await expect(anthropicAiService.generateText(request))
        .to.be.rejectedWith(AiServiceError, 'Original AI service error');
    });

    it('should wrap generic errors in AiServiceError', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Hello',
      };

      mockChatModel.invoke.rejects(new Error('Network timeout'));

      await expect(anthropicAiService.generateText(request))
        .to.be.rejectedWith(AiServiceError, 'Failed to generate text: Network timeout');
    });

    it('should handle non-Error objects', async () => {
      const request: GenerateTextRequest = {
        userPrompt: 'Hello',
      };

      // Use callsFake to properly reject with a non-Error value
      mockChatModel.invoke.callsFake(() => Promise.reject(new Error('String error')));

      await expect(anthropicAiService.generateText(request))
        .to.be.rejectedWith(AiServiceError, 'Failed to generate text: String error');
    });
  });
});
