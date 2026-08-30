import { INK_TITLE_STYLE_COUNT, NUMBER_ONE, NUMBER_ZERO } from '../../constants';

const PAD_LENGTH = 2;

export const TITLE_STYLE_IDS = Array.from({ length: INK_TITLE_STYLE_COUNT }, (_, index) => {
  const next = index + NUMBER_ONE;
  return `t${String(next).padStart(PAD_LENGTH, '0')}`;
});

export const TITLE_PREVIEW_TEXT = 'Aa';
export const TITLE_STYLE_DEFAULT = TITLE_STYLE_IDS[NUMBER_ZERO] ?? 't01';
