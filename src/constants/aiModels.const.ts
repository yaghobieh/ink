import type { InkAiModelCatalogEntry } from '../types';

export const INK_AI_MODEL_CATALOG: InkAiModelCatalogEntry[] = [
  { id: 'claude-opus-4.8', provider: 'anthropic', label: 'Claude Opus 4.8', family: 'Claude' },
  { id: 'claude-fable-5', provider: 'anthropic', label: 'Claude Fable 5', family: 'Claude' },
  { id: 'claude-opus-4.7', provider: 'anthropic', label: 'Claude Opus 4.7', family: 'Claude' },
  { id: 'claude-5-sonnet', provider: 'anthropic', label: 'Claude 5 Sonnet', family: 'Claude' },
  { id: 'claude-4.6-sonnet', provider: 'anthropic', label: 'Claude 4.6 Sonnet', family: 'Claude' },
  { id: 'claude-4.5-sonnet', provider: 'anthropic', label: 'Claude 4.5 Sonnet', family: 'Claude' },
  { id: 'claude-4.5-haiku', provider: 'anthropic', label: 'Claude 4.5 Haiku', family: 'Claude' },
  { id: 'gemini-3.1-pro', provider: 'google', label: 'Gemini 3.1 Pro', family: 'Gemini' },
  { id: 'gemini-2.5-flash', provider: 'google', label: 'Gemini 2.5 Flash', family: 'Gemini' },
  { id: 'gemini-3-flash', provider: 'google', label: 'Gemini 3 Flash', family: 'Gemini' },
  { id: 'gemini-3.5-flash', provider: 'google', label: 'Gemini 3.5 Flash', family: 'Gemini' },
  { id: 'gemini-3.6-flash', provider: 'google', label: 'Gemini 3.6 Flash', family: 'Gemini' },
  { id: 'gpt-5.6-sol', provider: 'openai', label: 'GPT-5.6 Sol', family: 'GPT' },
  { id: 'gpt-5.6-terra', provider: 'openai', label: 'GPT-5.6 Terra', family: 'GPT' },
  { id: 'gpt-5.5', provider: 'openai', label: 'GPT-5.5', family: 'GPT' },
  { id: 'gpt-5.4', provider: 'openai', label: 'GPT-5.4', family: 'GPT' },
  { id: 'gpt-5.2', provider: 'openai', label: 'GPT-5.2', family: 'GPT' },
  { id: 'gpt-5.1', provider: 'openai', label: 'GPT-5.1', family: 'GPT' },
  { id: 'gpt-5', provider: 'openai', label: 'GPT-5', family: 'GPT' },
  { id: 'gpt-4.1', provider: 'openai', label: 'GPT-4.1', family: 'GPT' },
  { id: 'gpt-5-mini', provider: 'openai', label: 'GPT-5 Mini', family: 'GPT' },
  { id: 'gpt-5.4-mini', provider: 'openai', label: 'GPT-5.4 Mini', family: 'GPT' },
  { id: 'gpt-4.1-mini', provider: 'openai', label: 'GPT-4.1 Mini', family: 'GPT' },
  { id: 'ink-demo', provider: 'demo', label: 'Ink Demo (local)', family: 'Demo' },
];

export const INK_AI_DEMO_PROVIDER_ID = 'demo';
export const INK_AI_DEMO_MODEL_ID = 'ink-demo';
