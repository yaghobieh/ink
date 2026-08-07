import { EMPTY_STRING } from '../../../../constants/generals.const';
import { NUMBER_ZERO } from '../../../../constants/numbers';
import {
  AI_AUTOCOMPLETE_CARET_OFFSET_Y_PX,
  AI_AUTOCOMPLETE_MAX_PREFIX_CHARS,
} from './AiAutocomplete.const';
import type { AiAutocompletePosition } from './AiAutocomplete.types';

export const getTextBeforeCaret = (
  root: HTMLElement,
  maxChars = AI_AUTOCOMPLETE_MAX_PREFIX_CHARS,
): string => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === NUMBER_ZERO || !selection.isCollapsed) {
    return EMPTY_STRING;
  }
  if (!root.contains(selection.anchorNode)) {
    return EMPTY_STRING;
  }
  const range = selection.getRangeAt(NUMBER_ZERO);
  const preRange = document.createRange();
  preRange.selectNodeContents(root);
  preRange.setEnd(range.startContainer, range.startOffset);
  const text = preRange.toString();
  return text.slice(-maxChars);
};

export const getCaretPositionInRoot = (root: HTMLElement): AiAutocompletePosition | null => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === NUMBER_ZERO || !selection.isCollapsed) {
    return null;
  }
  if (!root.contains(selection.anchorNode)) {
    return null;
  }
  const range = selection.getRangeAt(NUMBER_ZERO);
  const rect = range.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  return {
    top: rect.top - rootRect.top + root.scrollTop + AI_AUTOCOMPLETE_CARET_OFFSET_Y_PX,
    left: rect.left - rootRect.left + root.scrollLeft,
  };
};
