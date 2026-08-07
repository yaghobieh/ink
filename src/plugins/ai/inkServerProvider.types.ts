import type { InkAiCapability } from '../../types';

export interface CreateInkServerAiProviderOptions {
  apiUrl: string;
  getToken: () => string | null;
  modelId?: string;
}

export interface InkServerAiCompleteBody {
  prompt?: string;
  capability: InkAiCapability;
  html: string;
  selectionHtml?: string;
  options?: Record<string, string>;
  modelId?: string;
}
