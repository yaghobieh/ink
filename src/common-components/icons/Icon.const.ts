import {
  NUMBER_SEVEN,
  NUMBER_NINE,
  NUMBER_TWELVE,
  NUMBER_FIFTEEN,
  NUMBER_SEVENTEEN,
} from '@/constants/numbers';

export const ICON_CLASS = 'Ink-Icon';
export const ICON_CLASS_GRIP = 'Ink-Icon--grip';
export const ICON_VIEWBOX = '0 0 24 24';

export const GRIP_DOT_RADIUS = 1.35;
export const GRIP_DOT_COLS = [NUMBER_NINE, NUMBER_FIFTEEN] as const;
export const GRIP_DOT_ROWS = [NUMBER_SEVEN, NUMBER_TWELVE, NUMBER_SEVENTEEN] as const;
