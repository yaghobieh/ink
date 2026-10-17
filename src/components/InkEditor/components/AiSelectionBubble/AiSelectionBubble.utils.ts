import type { InkAiCapability, InkAiResponse } from '../../../../types';
import {
  AI_SELECTION_ACTIONS,
  AI_SELECTION_TRANSLATE_LANGUAGE,
} from './AiSelectionBubble.const';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const capabilityForSelectionAction = (actionId: string): InkAiCapability | null => {
  const action = AI_SELECTION_ACTIONS.find((item) => item.id === actionId);
  return action?.capability ?? null;
};

export const optionsForSelectionAction = (
  actionId: string,
): Record<string, string> | undefined => {
  if (actionId === 'translate') {
    return { language: AI_SELECTION_TRANSLATE_LANGUAGE };
  }
  return undefined;
};

export const htmlFromAiResponse = (response: InkAiResponse): string => {
  if (response.diff?.suggestedHtml) return response.diff.suggestedHtml;
  if (response.html) return response.html;
  const suggestion = response.reviewSuggestions?.find((item) => item.suggestedText.trim());
  if (suggestion) return `<p>${escapeHtml(suggestion.suggestedText)}</p>`;
  if (response.text) return `<p>${escapeHtml(response.text)}</p>`;
  return '';
};
