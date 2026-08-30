import type { InkThemeDefinition, InkThemeId } from './theme.types';

export const THEME_ID_PAPER: InkThemeId = 'paper';
export const THEME_ID_SNOW: InkThemeId = 'snow';
export const THEME_ID_INK: InkThemeId = 'ink';
export const THEME_ID_DARK: InkThemeId = 'dark';
export const THEME_ATTR = 'data-ink-theme';
export const THEME_DEFAULT: InkThemeId = THEME_ID_PAPER;

export const INK_THEMES: InkThemeDefinition[] = [
  { id: THEME_ID_PAPER, label: 'Paper' },
  { id: THEME_ID_SNOW, label: 'Snow' },
  { id: THEME_ID_INK, label: 'Ink' },
  { id: THEME_ID_DARK, label: 'Dark' },
];
