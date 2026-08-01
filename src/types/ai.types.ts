import type { InkAiPlacement } from './features.types';

export type InkAiCapability =
  | 'chat'
  | 'rewrite'
  | 'summarize'
  | 'expand'
  | 'tone'
  | 'translate'
  | 'review'
  | 'quickAction'
  | 'suggestDiff';

export interface InkAiChatTurn {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  capability?: InkAiCapability;
}

export interface InkAiDiffSuggestion {
  id: string;
  originalHtml: string;
  suggestedHtml: string;
  summary: string;
}

export interface InkAiReviewSuggestion {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  originalText: string;
  suggestedText: string;
}

export interface InkAiRequest {
  capability: InkAiCapability;
  html: string;
  selectionHtml?: string;
  prompt?: string;
  history?: InkAiChatTurn[];
  options?: Record<string, string>;
  modelId?: string;
  contextFiles?: InkAiContextFile[];
  documentSnapshot?: InkAiDocumentSnapshot;
}

export interface InkAiResponse {
  html?: string;
  text?: string;
  meta?: Record<string, string>;
  diff?: InkAiDiffSuggestion;
  reviewSuggestions?: InkAiReviewSuggestion[];
  turns?: InkAiChatTurn[];
}

export interface InkAiContextFile {
  id: string;
  name: string;
  mimeType: string;
  content: string;
}

export interface InkAiDocumentSnapshot {
  html: string;
  selectionHtml?: string;
  commentCount?: number;
  trackChangeCount?: number;
}

export interface InkAiModelCatalogEntry {
  id: string;
  provider: 'anthropic' | 'google' | 'openai' | 'custom' | 'demo';
  label: string;
  family: string;
}

export interface InkAiProvider {
  id: string;
  name: string;
  models: InkAiModelCatalogEntry[];
  run: (request: InkAiRequest) => Promise<InkAiResponse>;
}

export interface InkAiAgent {
  id: string;
  name: string;
  capabilities: InkAiCapability[];
  run: (request: InkAiRequest) => Promise<InkAiResponse>;
}

export interface InkAiCostControlHooks {
  cacheGet?: (key: string) => Promise<InkAiResponse | undefined>;
  cacheSet?: (key: string, value: InkAiResponse) => Promise<void>;
  rateLimitCheck?: (key: string) => Promise<boolean>;
  preferCheaperModel?: (capability: InkAiCapability, modelId?: string) => string | undefined;
}

export interface InkAiModerationHook {
  screen: (request: InkAiRequest) => Promise<{ allowed: boolean; reason?: string }>;
}

export interface InkAiPermissionsHook {
  canUse: (capability: InkAiCapability, modelId?: string) => boolean;
}

export interface InkAiExternalKnowledgeHook {
  retrieve: (query: string) => Promise<string[]>;
}

export interface InkAiQualityEvalHook {
  evaluate: (request: InkAiRequest, response: InkAiResponse) => Promise<{ score: number; notes?: string }>;
}

export interface InkAiFallbackChain {
  providerIds: string[];
}

export interface InkAiUiTheme {
  accent?: string;
  surface?: string;
  border?: string;
  className?: string;
}

export interface InkAiConfig {
  enabled?: boolean;
  placement?: InkAiPlacement;
  openOnInit?: boolean;
  providerId?: string;
  modelId?: string;
  uiTheme?: InkAiUiTheme;
  className?: string;
  showHistory?: boolean;
  costControl?: InkAiCostControlHooks;
  moderation?: InkAiModerationHook;
  permissions?: InkAiPermissionsHook;
  externalKnowledge?: InkAiExternalKnowledgeHook;
  qualityEval?: InkAiQualityEvalHook;
  fallbackChain?: InkAiFallbackChain;
}

export interface InkAiPlugin {
  register: (agent: InkAiAgent) => void;
  unregister: (agentId: string) => void;
  getAgent: (agentId: string) => InkAiAgent | undefined;
  listAgents: () => InkAiAgent[];
  run: (agentId: string, request: InkAiRequest) => Promise<InkAiResponse>;
  registerProvider: (provider: InkAiProvider) => void;
  unregisterProvider: (providerId: string) => void;
  getProvider: (providerId: string) => InkAiProvider | undefined;
  listProviders: () => InkAiProvider[];
  runProvider: (providerId: string, request: InkAiRequest) => Promise<InkAiResponse>;
  exportHistory: (turns: InkAiChatTurn[]) => string;
}
