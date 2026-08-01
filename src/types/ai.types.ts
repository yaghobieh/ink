export type InkAiCapability =
  | 'rewrite'
  | 'summarize'
  | 'expand'
  | 'tone'
  | 'translate';

export interface InkAiRequest {
  capability: InkAiCapability;
  html: string;
  selectionHtml?: string;
  options?: Record<string, string>;
}

export interface InkAiResponse {
  html: string;
  meta?: Record<string, string>;
}

export interface InkAiAgent {
  id: string;
  name: string;
  capabilities: InkAiCapability[];
  run: (request: InkAiRequest) => Promise<InkAiResponse>;
}

export interface InkAiPlugin {
  register: (agent: InkAiAgent) => void;
  unregister: (agentId: string) => void;
  getAgent: (agentId: string) => InkAiAgent | undefined;
  listAgents: () => InkAiAgent[];
  run: (agentId: string, request: InkAiRequest) => Promise<InkAiResponse>;
}
