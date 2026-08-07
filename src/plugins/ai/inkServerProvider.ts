import {
  INK_AI_INK_SERVER_COMPLETE_PATH,
  INK_AI_INK_SERVER_PROVIDER_ID,
  INK_AI_INK_SERVER_PROVIDER_NAME,
  INK_AI_OPENAI_AUTH_HEADER,
  INK_AI_OPENAI_BEARER_PREFIX,
  INK_AI_OPENAI_CONTENT_TYPE_HEADER,
  INK_AI_OPENAI_CONTENT_TYPE_JSON,
  INK_AI_OPENAI_META_MODEL_KEY,
  INK_AI_OPENAI_META_PROVIDER_KEY,
  INK_AI_OPENAI_META_TOKENS_KEY,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
  INK_AI_OPENAI_MODELS,
} from '../../constants/openai.const';
import { EMPTY_STRING } from '../../constants/generals.const';
import type { InkAiProvider, InkAiRequest, InkAiResponse } from '../../types';
import { estimateTokens } from './openaiProvider.utils';
import type {
  CreateInkServerAiProviderOptions,
  InkServerAiCompleteBody,
} from './inkServerProvider.types';

const resolveCompleteUrl = (apiUrl: string): string => {
  const trimmed = apiUrl.replace(/\/+$/, EMPTY_STRING);
  return `${trimmed}${INK_AI_INK_SERVER_COMPLETE_PATH}`;
};

const normalizeResponse = (
  payload: InkAiResponse,
  modelId: string,
): InkAiResponse => {
  const tokensSource = payload.text || payload.html || EMPTY_STRING;
  const existingTokens = payload.meta?.[INK_AI_OPENAI_META_TOKENS_KEY];
  return {
    ...payload,
    meta: {
      ...payload.meta,
      [INK_AI_OPENAI_META_PROVIDER_KEY]: INK_AI_INK_SERVER_PROVIDER_ID,
      [INK_AI_OPENAI_META_MODEL_KEY]:
        payload.meta?.[INK_AI_OPENAI_META_MODEL_KEY] || modelId,
      [INK_AI_OPENAI_META_TOKENS_KEY]:
        existingTokens || estimateTokens(tokensSource),
    },
  };
};

export const createInkServerAiProvider = (
  options: CreateInkServerAiProviderOptions,
): InkAiProvider => {
  const defaultModelId = options.modelId || INK_AI_OPENAI_MODEL_GPT_4_1_MINI;

  return {
    id: INK_AI_INK_SERVER_PROVIDER_ID,
    name: INK_AI_INK_SERVER_PROVIDER_NAME,
    models: INK_AI_OPENAI_MODELS,
    run: async (request: InkAiRequest): Promise<InkAiResponse> => {
      const modelId = request.modelId || defaultModelId;
      const token = options.getToken();
      const headers: Record<string, string> = {
        [INK_AI_OPENAI_CONTENT_TYPE_HEADER]: INK_AI_OPENAI_CONTENT_TYPE_JSON,
      };
      if (token) {
        headers[INK_AI_OPENAI_AUTH_HEADER] = `${INK_AI_OPENAI_BEARER_PREFIX}${token}`;
      }
      const body: InkServerAiCompleteBody = {
        prompt: request.prompt,
        capability: request.capability,
        html: request.html,
        selectionHtml: request.selectionHtml,
        options: request.options,
        modelId,
      };
      const response = await fetch(resolveCompleteUrl(options.apiUrl), {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(
          `Ink server AI request failed (${response.status}): ${detail || response.statusText}`,
        );
      }
      const payload = (await response.json()) as InkAiResponse;
      return normalizeResponse(payload, modelId);
    },
  };
};
