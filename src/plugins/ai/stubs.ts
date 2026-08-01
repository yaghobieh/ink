import type {
  InkAiCostControlHooks,
  InkAiExternalKnowledgeHook,
  InkAiModerationHook,
  InkAiPermissionsHook,
  InkAiQualityEvalHook,
} from '../../types';

export const createNoopCostControl = (): InkAiCostControlHooks => ({
  cacheGet: async () => undefined,
  cacheSet: async () => undefined,
  rateLimitCheck: async () => true,
  preferCheaperModel: (_capability, modelId) => modelId,
});

export const createNoopModeration = (): InkAiModerationHook => ({
  screen: async () => ({ allowed: true }),
});

export const createOpenPermissions = (): InkAiPermissionsHook => ({
  canUse: () => true,
});

export const createNoopExternalKnowledge = (): InkAiExternalKnowledgeHook => ({
  retrieve: async () => [],
});

export const createNoopQualityEval = (): InkAiQualityEvalHook => ({
  evaluate: async () => ({ score: 1, notes: 'MVP stub — no remote eval suite' }),
});
