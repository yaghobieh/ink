import { PLUGIN_COLOR_THEME, PLUGIN_ID_THEME } from '../../constants/plugins.const';
import { inkPlugins } from '../host';
import { INK_THEMES, THEME_ATTR, THEME_DEFAULT, THEME_ID_PAPER } from './theme.const';
import type { InkThemeId, InkThemePlugin } from './theme.types';

let currentTheme: InkThemeId = THEME_DEFAULT;

export const applyInkTheme = (root: HTMLElement | null, id: InkThemeId): void => {
  currentTheme = id;
  if (!root) return;
  if (id === THEME_ID_PAPER) {
    root.removeAttribute(THEME_ATTR);
    return;
  }
  root.setAttribute(THEME_ATTR, id);
};

export const createInkThemePlugin = (): InkThemePlugin => ({
  install: () => {
    inkPlugins.install({
      id: PLUGIN_ID_THEME,
      label: 'Theme',
      color: PLUGIN_COLOR_THEME,
      hint: 'Paper theme for the editor',
    });
  },
  apply: applyInkTheme,
  list: () => INK_THEMES,
  current: () => currentTheme,
});

export const inkTheme = createInkThemePlugin();
