import {
  INK_AI_OPENAI_CHARS_PER_TOKEN_ESTIMATE,
  INK_AI_OPENAI_HTML_TAG_PATTERN,
  INK_AI_OPENAI_JSON_ARRAY_PATTERN,
  INK_AI_OPENAI_PARAGRAPH_CLOSE,
  INK_AI_OPENAI_PARAGRAPH_OPEN,
  INK_AI_OPENAI_QUOTE_TRIM_PATTERN,
  INK_AI_OPENAI_REVIEW_FALLBACK_MESSAGE,
  INK_AI_OPENAI_REVIEW_SEVERITY_ERROR,
  INK_AI_OPENAI_REVIEW_SEVERITY_INFO,
  INK_AI_OPENAI_REVIEW_SEVERITY_WARNING,
} from '../../constants/openai.const';
import type { InkAiReviewSuggestion } from '../../types';
import { createInkId } from '../../utils/id.utils';
import type { ParsedReviewItem } from './openaiProvider.types';
import { EMPTY_STRING } from '../../constants/generals.const';
import { NUMBER_ZERO } from '../../constants/numbers';

export const stripTags = (html: string): string =>
  html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const wrapParagraph = (text: string): string =>
  `${INK_AI_OPENAI_PARAGRAPH_OPEN}${text}${INK_AI_OPENAI_PARAGRAPH_CLOSE}`;

export const toSimpleHtml = (content: string): string => {
  const trimmed = content.trim();
  if (!trimmed) return wrapParagraph(EMPTY_STRING);
  if (INK_AI_OPENAI_HTML_TAG_PATTERN.test(trimmed)) return trimmed;
  return wrapParagraph(trimmed);
};

export const estimateTokens = (text: string, reported?: number): string => {
  if (typeof reported === 'number' && reported > NUMBER_ZERO) {
    return String(reported);
  }
  const estimate = Math.ceil(text.length / INK_AI_OPENAI_CHARS_PER_TOKEN_ESTIMATE);
  return String(estimate);
};

export const cleanAutocompleteText = (content: string): string =>
  content.replace(INK_AI_OPENAI_QUOTE_TRIM_PATTERN, EMPTY_STRING).trim();

const isReviewSeverity = (
  value: unknown,
): value is InkAiReviewSuggestion['severity'] =>
  value === INK_AI_OPENAI_REVIEW_SEVERITY_INFO ||
  value === INK_AI_OPENAI_REVIEW_SEVERITY_WARNING ||
  value === INK_AI_OPENAI_REVIEW_SEVERITY_ERROR;

export const parseReviewSuggestions = (
  content: string,
  fallbackOriginal: string,
): InkAiReviewSuggestion[] => {
  const match = content.match(INK_AI_OPENAI_JSON_ARRAY_PATTERN);
  const jsonText = match?.[NUMBER_ZERO];
  if (jsonText) {
    const parsed = (() => {
      try {
        return JSON.parse(jsonText) as unknown;
      } catch {
        return null;
      }
    })();
    if (Array.isArray(parsed) && parsed.length > NUMBER_ZERO) {
      return parsed.map((item: ParsedReviewItem) => ({
        id: createInkId('rev'),
        message:
          typeof item.message === 'string' && item.message
            ? item.message
            : INK_AI_OPENAI_REVIEW_FALLBACK_MESSAGE,
        severity: isReviewSeverity(item.severity)
          ? item.severity
          : INK_AI_OPENAI_REVIEW_SEVERITY_INFO,
        originalText:
          typeof item.originalText === 'string' ? item.originalText : fallbackOriginal,
        suggestedText:
          typeof item.suggestedText === 'string' ? item.suggestedText : fallbackOriginal,
      }));
    }
  }
  return [
    {
      id: createInkId('rev'),
      message: content.trim() || INK_AI_OPENAI_REVIEW_FALLBACK_MESSAGE,
      severity: INK_AI_OPENAI_REVIEW_SEVERITY_INFO,
      originalText: fallbackOriginal,
      suggestedText: fallbackOriginal,
    },
  ];
};

export const buildUserPrompt = (params: {
  capability: string;
  source: string;
  prompt?: string;
  options?: Record<string, string>;
}): string => {
  const { capability, source, prompt, options } = params;
  const parts = [`Capability: ${capability}`, `Content:\n${source || '(empty)'}`];
  if (prompt) parts.push(`User prompt:\n${prompt}`);
  if (options?.language) parts.push(`Target language: ${options.language}`);
  if (options?.tone) parts.push(`Tone: ${options.tone}`);
  return parts.join('\n\n');
};
