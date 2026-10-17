import type { InkAiCapability } from '../../../../types';
import { NUMBER_EIGHT, NUMBER_FORTY } from '@/constants/numbers';

export const AI_SELECTION_BUBBLE_CLASS = 'Ink-AiSelection';
export const AI_SELECTION_ACTION_CLASS = 'Ink-AiSelection__action';
export const AI_SELECTION_ACTION_ACTIVE_CLASS = 'Ink-AiSelection__action--active';
export const AI_SELECTION_BUBBLE_ARIA_LABEL = 'Selection AI';
export const AI_SELECTION_APPLY_LABEL = 'Apply';
export const AI_SELECTION_DISMISS_LABEL = 'Dismiss';
export const AI_SELECTION_BUSY_LABEL = 'Ink AI is writing…';
export const AI_SELECTION_TRANSLATE_LANGUAGE = 'Spanish';
export const AI_SELECTION_GAP_PX = NUMBER_EIGHT;
export const AI_SELECTION_EDGE_PX = NUMBER_EIGHT;
export const AI_SELECTION_ESTIMATED_HEIGHT_PX = NUMBER_FORTY;
export const AI_SELECTION_ESTIMATED_WIDTH_PX = 448;
export const AI_SELECTION_LINE_CAP_PX = 28;

export const AI_SELECTION_ACTIONS: ReadonlyArray<{
  id: string;
  label: string;
  capability: InkAiCapability;
}> = [
  { id: 'improve', label: 'Improve', capability: 'rewrite' },
  { id: 'shorter', label: 'Shorter', capability: 'summarize' },
  { id: 'longer', label: 'Longer', capability: 'expand' },
  { id: 'fix', label: 'Fix', capability: 'review' },
  { id: 'tone', label: 'Tone', capability: 'tone' },
  { id: 'translate', label: 'Translate', capability: 'translate' },
];
