import type { InkAiCapability, InkAiModelCatalogEntry } from '../types';
import { NUMBER_FOUR, NUMBER_FORTY } from './numbers';
import { INK_AI_MODEL_CATALOG } from './aiModels.const';

export const INK_AI_OPENAI_PROVIDER_ID = 'openai';
export const INK_AI_OPENAI_PROVIDER_NAME = 'OpenAI';
export const INK_AI_OPENAI_MODEL_GPT_4_1_MINI = 'gpt-4.1-mini';
export const INK_AI_OPENAI_MODEL_GPT_4_1 = 'gpt-4.1';
export const INK_AI_OPENAI_DEFAULT_BASE_URL = 'https://api.openai.com/v1';
export const INK_AI_OPENAI_CHAT_COMPLETIONS_PATH = '/chat/completions';
export const INK_AI_OPENAI_AUTH_HEADER = 'Authorization';
export const INK_AI_OPENAI_BEARER_PREFIX = 'Bearer ';
export const INK_AI_OPENAI_CONTENT_TYPE_HEADER = 'Content-Type';
export const INK_AI_OPENAI_CONTENT_TYPE_JSON = 'application/json';
export const INK_AI_OPENAI_ROLE_SYSTEM = 'system';
export const INK_AI_OPENAI_ROLE_USER = 'user';
export const INK_AI_OPENAI_AUTOCOMPLETE_MAX_TOKENS = NUMBER_FORTY;
export const INK_AI_OPENAI_DEFAULT_MAX_TOKENS = 1024;
export const INK_AI_OPENAI_CHARS_PER_TOKEN_ESTIMATE = NUMBER_FOUR;
export const INK_AI_OPENAI_TEMPERATURE_DEFAULT = 0.3;
export const INK_AI_OPENAI_TEMPERATURE_AUTOCOMPLETE = 0.2;
export const INK_AI_OPENAI_HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;
export const INK_AI_OPENAI_JSON_ARRAY_PATTERN = /\[[\s\S]*\]/;
export const INK_AI_OPENAI_QUOTE_TRIM_PATTERN = /^["'`]+|["'`]+$/g;
export const INK_AI_OPENAI_PARAGRAPH_OPEN = '<p>';
export const INK_AI_OPENAI_PARAGRAPH_CLOSE = '</p>';
export const INK_AI_OPENAI_META_PROVIDER_KEY = 'provider';
export const INK_AI_OPENAI_META_MODEL_KEY = 'model';
export const INK_AI_OPENAI_META_TOKENS_KEY = 'tokens';
export const INK_AI_OPENAI_REVIEW_SEVERITY_INFO = 'info';
export const INK_AI_OPENAI_REVIEW_SEVERITY_WARNING = 'warning';
export const INK_AI_OPENAI_REVIEW_SEVERITY_ERROR = 'error';
export const INK_AI_OPENAI_DIFF_SUMMARY_REWRITE = 'Suggested rewrite';
export const INK_AI_OPENAI_DIFF_SUMMARY_SUMMARIZE = 'Suggested summary';
export const INK_AI_OPENAI_DIFF_SUMMARY_EXPAND = 'Suggested expansion';
export const INK_AI_OPENAI_DIFF_SUMMARY_TONE = 'Suggested tone adjustment';
export const INK_AI_OPENAI_DIFF_SUMMARY_TRANSLATE = 'Suggested translation';
export const INK_AI_OPENAI_DIFF_SUMMARY_SUGGEST = 'Suggested change';
export const INK_AI_OPENAI_REVIEW_FALLBACK_MESSAGE = 'Consider revising this passage for clarity.';

export const INK_AI_OPENAI_MODELS: InkAiModelCatalogEntry[] = INK_AI_MODEL_CATALOG.filter(
  (entry) =>
    entry.id === INK_AI_OPENAI_MODEL_GPT_4_1_MINI || entry.id === INK_AI_OPENAI_MODEL_GPT_4_1,
);

export const INK_AI_OPENAI_SYSTEM_PROMPTS: Record<InkAiCapability, string> = {
  chat: 'You are Ink AI, a helpful writing assistant. Answer clearly and concisely about the document context.',
  rewrite:
    'Rewrite the provided HTML or text for clarity and flow. Return only the rewritten content as simple HTML (prefer a single <p>…</p> or preserve simple tags). No preamble.',
  summarize:
    'Summarize the provided HTML or text. Return only the summary as simple HTML (prefer a single <p>…</p>). No preamble.',
  expand:
    'Expand the provided HTML or text with useful detail while staying on topic. Return only the expanded content as simple HTML (prefer a single <p>…</p> or preserve simple tags). No preamble.',
  tone: 'Adjust the tone of the provided HTML or text to be clearer and more professional unless another tone is specified in the user message. Return only the revised content as simple HTML. No preamble.',
  translate:
    'Translate the provided HTML or text into the target language from the user message. Return only the translation as simple HTML (prefer a single <p>…</p> or preserve simple tags). No preamble.',
  review:
    'Review the provided HTML or text for grammar and style. Respond with ONLY a JSON array of objects with keys: message, severity (info|warning|error), originalText, suggestedText. No markdown fences.',
  quickAction:
    'Perform the requested quick writing action on the provided HTML or text. Return only the result as simple HTML (prefer a single <p>…</p>). No preamble.',
  suggestDiff:
    'Suggest an improved version of the provided HTML or text. Return only the suggested content as simple HTML (prefer a single <p>…</p> or preserve simple tags). No preamble.',
  autocomplete:
    'Continue the user text with a short inline completion only. Return only the continuation tokens (no quotes, no explanation, no repeating the prefix). Keep it under about 40 tokens.',
};

export const INK_AI_INK_SERVER_PROVIDER_ID = 'ink-server';
export const INK_AI_INK_SERVER_PROVIDER_NAME = 'Ink Server';
export const INK_AI_INK_SERVER_COMPLETE_PATH = '/api/ai/complete';
