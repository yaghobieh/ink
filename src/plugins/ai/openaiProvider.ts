import {
  INK_AI_OPENAI_AUTH_HEADER,
  INK_AI_OPENAI_AUTOCOMPLETE_MAX_TOKENS,
  INK_AI_OPENAI_BEARER_PREFIX,
  INK_AI_OPENAI_CHAT_COMPLETIONS_PATH,
  INK_AI_OPENAI_CONTENT_TYPE_HEADER,
  INK_AI_OPENAI_CONTENT_TYPE_JSON,
  INK_AI_OPENAI_DEFAULT_BASE_URL,
  INK_AI_OPENAI_DEFAULT_MAX_TOKENS,
  INK_AI_OPENAI_DIFF_SUMMARY_EXPAND,
  INK_AI_OPENAI_DIFF_SUMMARY_REWRITE,
  INK_AI_OPENAI_DIFF_SUMMARY_SUGGEST,
  INK_AI_OPENAI_DIFF_SUMMARY_SUMMARIZE,
  INK_AI_OPENAI_DIFF_SUMMARY_TONE,
  INK_AI_OPENAI_DIFF_SUMMARY_TRANSLATE,
  INK_AI_OPENAI_META_MODEL_KEY,
  INK_AI_OPENAI_META_PROVIDER_KEY,
  INK_AI_OPENAI_META_TOKENS_KEY,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
  INK_AI_OPENAI_MODELS,
  INK_AI_OPENAI_PROVIDER_ID,
  INK_AI_OPENAI_PROVIDER_NAME,
  INK_AI_OPENAI_ROLE_SYSTEM,
  INK_AI_OPENAI_ROLE_USER,
  INK_AI_OPENAI_SYSTEM_PROMPTS,
  INK_AI_OPENAI_TEMPERATURE_AUTOCOMPLETE,
  INK_AI_OPENAI_TEMPERATURE_DEFAULT,
} from '../../constants/openai.const';
import { EMPTY_STRING } from '../../constants/generals.const';
import type { InkAiDiffSuggestion, InkAiProvider, InkAiRequest, InkAiResponse } from '../../types';
import { createInkId } from '../../utils/id.utils';
import type {
  CreateOpenAiProviderOptions,
  OpenAiChatCompletionsRequestBody,
  OpenAiChatCompletionsResponse,
} from './openaiProvider.types';
import {
  buildUserPrompt,
  cleanAutocompleteText,
  estimateTokens,
  parseReviewSuggestions,
  stripTags,
  toSimpleHtml,
} from './openaiProvider.utils';

const DIFF_CAPABILITIES = new Set([
  'rewrite',
  'summarize',
  'expand',
  'tone',
  'translate',
  'suggestDiff',
  'quickAction',
]);

const diffSummaryFor = (capability: InkAiRequest['capability']): string => {
  switch (capability) {
    case 'summarize':
      return INK_AI_OPENAI_DIFF_SUMMARY_SUMMARIZE;
    case 'expand':
      return INK_AI_OPENAI_DIFF_SUMMARY_EXPAND;
    case 'tone':
      return INK_AI_OPENAI_DIFF_SUMMARY_TONE;
    case 'translate':
      return INK_AI_OPENAI_DIFF_SUMMARY_TRANSLATE;
    case 'suggestDiff':
      return INK_AI_OPENAI_DIFF_SUMMARY_SUGGEST;
    case 'rewrite':
    case 'quickAction':
    default:
      return INK_AI_OPENAI_DIFF_SUMMARY_REWRITE;
  }
};

const buildDiff = (originalHtml: string, suggestedHtml: string, summary: string): InkAiDiffSuggestion => ({
  id: createInkId('diff'),
  originalHtml,
  suggestedHtml,
  summary,
});

const resolveChatUrl = (baseUrl: string): string => {
  const trimmed = baseUrl.replace(/\/+$/, EMPTY_STRING);
  return `${trimmed}${INK_AI_OPENAI_CHAT_COMPLETIONS_PATH}`;
};

const callOpenAi = async (
  options: CreateOpenAiProviderOptions,
  body: OpenAiChatCompletionsRequestBody,
): Promise<OpenAiChatCompletionsResponse> => {
  const baseUrl = options.baseUrl || INK_AI_OPENAI_DEFAULT_BASE_URL;
  const response = await fetch(resolveChatUrl(baseUrl), {
    method: 'POST',
    headers: {
      [INK_AI_OPENAI_AUTH_HEADER]: `${INK_AI_OPENAI_BEARER_PREFIX}${options.apiKey}`,
      [INK_AI_OPENAI_CONTENT_TYPE_HEADER]: INK_AI_OPENAI_CONTENT_TYPE_JSON,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${detail || response.statusText}`);
  }
  return (await response.json()) as OpenAiChatCompletionsResponse;
};

const mapResponse = (
  request: InkAiRequest,
  content: string,
  modelId: string,
  totalTokens?: number,
): InkAiResponse => {
  const source = request.selectionHtml || request.html || EMPTY_STRING;
  const plain = stripTags(source);
  const meta = {
    [INK_AI_OPENAI_META_PROVIDER_KEY]: INK_AI_OPENAI_PROVIDER_ID,
    [INK_AI_OPENAI_META_MODEL_KEY]: modelId,
    [INK_AI_OPENAI_META_TOKENS_KEY]: estimateTokens(content, totalTokens),
  };

  if (request.capability === 'autocomplete') {
    return {
      text: cleanAutocompleteText(content),
      meta,
    };
  }

  if (request.capability === 'review') {
    return {
      text: content,
      reviewSuggestions: parseReviewSuggestions(content, plain),
      meta,
    };
  }

  if (request.capability === 'chat') {
    return {
      text: content.trim(),
      turns: [
        {
          id: createInkId('turn'),
          role: 'assistant',
          content: content.trim(),
          timestamp: Date.now(),
          capability: 'chat',
        },
      ],
      meta,
    };
  }

  if (DIFF_CAPABILITIES.has(request.capability)) {
    const html = toSimpleHtml(content);
    return {
      html,
      text: stripTags(html),
      diff: buildDiff(source, html, diffSummaryFor(request.capability)),
      meta,
    };
  }

  return {
    html: toSimpleHtml(content),
    text: content.trim(),
    meta,
  };
};

export const createOpenAiProvider = (options: CreateOpenAiProviderOptions): InkAiProvider => {
  const defaultModelId = options.modelId || INK_AI_OPENAI_MODEL_GPT_4_1_MINI;

  return {
    id: INK_AI_OPENAI_PROVIDER_ID,
    name: INK_AI_OPENAI_PROVIDER_NAME,
    models: INK_AI_OPENAI_MODELS,
    run: async (request: InkAiRequest): Promise<InkAiResponse> => {
      const modelId = request.modelId || defaultModelId;
      const source = request.selectionHtml || request.html || EMPTY_STRING;
      const isAutocomplete = request.capability === 'autocomplete';
      const userContent = isAutocomplete
        ? request.prompt || stripTags(source)
        : buildUserPrompt({
            capability: request.capability,
            source,
            prompt: request.prompt,
            options: request.options,
          });
      const payload = await callOpenAi(options, {
        model: modelId,
        messages: [
          {
            role: INK_AI_OPENAI_ROLE_SYSTEM,
            content: INK_AI_OPENAI_SYSTEM_PROMPTS[request.capability],
          },
          {
            role: INK_AI_OPENAI_ROLE_USER,
            content: userContent,
          },
        ],
        max_tokens: isAutocomplete
          ? INK_AI_OPENAI_AUTOCOMPLETE_MAX_TOKENS
          : INK_AI_OPENAI_DEFAULT_MAX_TOKENS,
        temperature: isAutocomplete
          ? INK_AI_OPENAI_TEMPERATURE_AUTOCOMPLETE
          : INK_AI_OPENAI_TEMPERATURE_DEFAULT,
      });
      const content = payload.choices?.[0]?.message?.content || EMPTY_STRING;
      return mapResponse(request, content, modelId, payload.usage?.total_tokens);
    },
  };
};
