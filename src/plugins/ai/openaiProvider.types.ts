export interface CreateOpenAiProviderOptions {
  apiKey: string;
  modelId?: string;
  baseUrl?: string;
}

export interface OpenAiChatMessage {
  role: string;
  content: string;
}

export interface OpenAiChatCompletionsRequestBody {
  model: string;
  messages: OpenAiChatMessage[];
  max_tokens: number;
  temperature: number;
}

export interface OpenAiChatCompletionsResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  usage?: {
    total_tokens?: number;
  };
}

export interface ParsedReviewItem {
  message?: unknown;
  severity?: unknown;
  originalText?: unknown;
  suggestedText?: unknown;
}
