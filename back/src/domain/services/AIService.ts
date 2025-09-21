export const AIServiceToken = Symbol.for('AIService');

export interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GenerateTextRequest {
  systemPrompt?: string;
  userPrompt: string;
  conversationHistory?: ConversationMessage[];
  maxTokens?: number;
}

export interface GenerateTextResponse {
  content: string;
  model: string;
  tokensUsed: number;
  conversationHistory: ConversationMessage[];
}

export interface AIService {
  generateText(request: GenerateTextRequest): Promise<GenerateTextResponse>;
}
