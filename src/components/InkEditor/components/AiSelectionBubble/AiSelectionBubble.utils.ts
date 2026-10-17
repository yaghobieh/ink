import { NUMBER_ZERO } from '@/constants/numbers';
import type { InkAiCapability, InkAiResponse } from '../../../../types';
import {
  AI_SELECTION_ACTIONS,
  AI_SELECTION_EDGE_PX,
  AI_SELECTION_ESTIMATED_HEIGHT_PX,
  AI_SELECTION_ESTIMATED_WIDTH_PX,
  AI_SELECTION_GAP_PX,
  AI_SELECTION_LINE_CAP_PX,
  AI_SELECTION_TRANSLATE_LANGUAGE,
} from './AiSelectionBubble.const';

export interface AiSelectionAnchor {
  top: number;
  left: number;
  bottom: number;
  width: number;
}

export interface AiSelectionViewport {
  width: number;
  height: number;
}

export const placeAiSelectionBubble = (
  selectionRect: AiSelectionAnchor,
  viewport: AiSelectionViewport,
): { top: number; left: number } => {
  const selectionHeight = selectionRect.bottom - selectionRect.top;
  const lineBottom =
    selectionHeight > AI_SELECTION_ESTIMATED_HEIGHT_PX
      ? selectionRect.top + AI_SELECTION_LINE_CAP_PX
      : selectionRect.bottom;
  const below = lineBottom + AI_SELECTION_GAP_PX;
  const above = selectionRect.top - AI_SELECTION_ESTIMATED_HEIGHT_PX - AI_SELECTION_GAP_PX;
  const fitsBelow = below + AI_SELECTION_ESTIMATED_HEIGHT_PX <= viewport.height - AI_SELECTION_EDGE_PX;
  const top = fitsBelow ? below : Math.max(AI_SELECTION_EDGE_PX, above);
  const maxLeft = Math.max(
    AI_SELECTION_EDGE_PX,
    viewport.width - AI_SELECTION_ESTIMATED_WIDTH_PX - AI_SELECTION_EDGE_PX,
  );
  const left = Math.min(Math.max(selectionRect.left, AI_SELECTION_EDGE_PX), maxLeft);
  return {
    top: Number.isFinite(top) ? top : NUMBER_ZERO,
    left: Number.isFinite(left) ? left : NUMBER_ZERO,
  };
};

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
