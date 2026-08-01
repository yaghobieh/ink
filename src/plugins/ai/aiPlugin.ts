import type { InkAiAgent, InkAiChatTurn, InkAiPlugin, InkAiProvider, InkAiRequest, InkAiResponse } from '../../types';
import { createDemoAiProvider } from './demoProvider';

const agents = new Map<string, InkAiAgent>();
const providers = new Map<string, InkAiProvider>();

const ensureDemoProvider = (): void => {
  if (!providers.has('demo')) {
    const demo = createDemoAiProvider();
    providers.set(demo.id, demo);
  }
};

export const createInkAiPlugin = (): InkAiPlugin => {
  ensureDemoProvider();

  return {
    register: (agent) => {
      agents.set(agent.id, agent);
    },
    unregister: (agentId) => {
      agents.delete(agentId);
    },
    getAgent: (agentId) => agents.get(agentId),
    listAgents: () => Array.from(agents.values()),
    run: async (agentId, request: InkAiRequest): Promise<InkAiResponse> => {
      const agent = agents.get(agentId);
      if (!agent) {
        throw new Error(`Ink AI agent "${agentId}" is not registered.`);
      }
      if (!agent.capabilities.includes(request.capability)) {
        throw new Error(`Ink AI agent "${agentId}" does not support "${request.capability}".`);
      }
      return agent.run(request);
    },
    registerProvider: (provider) => {
      providers.set(provider.id, provider);
    },
    unregisterProvider: (providerId) => {
      if (providerId === 'demo') return;
      providers.delete(providerId);
    },
    getProvider: (providerId) => {
      ensureDemoProvider();
      return providers.get(providerId);
    },
    listProviders: () => {
      ensureDemoProvider();
      return Array.from(providers.values());
    },
    runProvider: async (providerId, request: InkAiRequest): Promise<InkAiResponse> => {
      ensureDemoProvider();
      const provider = providers.get(providerId);
      if (!provider) {
        throw new Error(`Ink AI provider "${providerId}" is not registered. Bring your own LLM via inkAi.registerProvider.`);
      }
      return provider.run(request);
    },
    exportHistory: (turns: InkAiChatTurn[]) => JSON.stringify(turns, null, 2),
  };
};

export const inkAi = createInkAiPlugin();
