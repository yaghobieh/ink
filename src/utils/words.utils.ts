import { INK_WORD_SPLIT, NUMBER_ZERO } from '../constants';

export const countWords = (text: string): number => {
  const trimmed = text.trim();
  if (!trimmed) return NUMBER_ZERO;
  return trimmed.split(INK_WORD_SPLIT).filter(Boolean).length;
};
