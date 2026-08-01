import { TYPO_DICTIONARY, TYPO_WORD_BOUNDARY } from '../constants';
import type { TypoFixResult } from '../types';

const fixWord = (word: string): string => {
  const lower = word.toLowerCase();
  const replacement = TYPO_DICTIONARY[lower];
  if (!replacement) return word;
  if (word === word.toUpperCase()) return replacement.toUpperCase();
  if (word[0] === word[0]?.toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
};

export const applyTypoAutoFix = (html: string): TypoFixResult => {
  let fixedCount = 0;
  const htmlParts = html.split(/(<[^>]+>)/g);
  const next = htmlParts
    .map((part) => {
      if (!part || part.startsWith('<')) return part;
      return part.replace(TYPO_WORD_BOUNDARY, (match) => {
        const fixed = fixWord(match);
        if (fixed !== match) fixedCount += 1;
        return fixed;
      });
    })
    .join('');
  return { html: next, fixedCount };
};
