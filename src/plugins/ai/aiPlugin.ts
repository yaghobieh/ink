import type { InkAiAgent, InkAiPlugin, InkAiRequest, InkAiResponse } from '../../types';

const agents = new Map<string, InkAiAgent>();

export const createInkAiPlugin = (): InkAiPlugin => ({
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
      throw new Error(`Ink AI agent "${agentId}" is not registered. AI agents ship in 1.x.`);
    }
    if (!agent.capabilities.includes(request.capability)) {
      throw new Error(`Ink AI agent "${agentId}" does not support "${request.capability}".`);
    }
    return agent.run(request);
  },
});

export const inkAi = createInkAiPlugin();
