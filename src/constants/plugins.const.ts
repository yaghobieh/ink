import type { InkHostPlugin } from '../types/plugin.types';

export const PLUGIN_ID_TITLES = 'titles';
export const PLUGIN_ID_EXCEL = 'excel';
export const PLUGIN_ID_GRAPH = 'graph';
export const PLUGIN_ID_AI = 'ai';
export const PLUGIN_ID_THEME = 'theme';

export const PLUGIN_COLOR_TITLES = '#E67E22';
export const PLUGIN_COLOR_EXCEL = '#0E8A6E';
export const PLUGIN_COLOR_GRAPH = '#2951C4';
export const PLUGIN_COLOR_AI = '#0E8A6E';
export const PLUGIN_COLOR_THEME = '#7B61FF';

export const BUNDLED_HOST_PLUGINS: InkHostPlugin[] = [
  {
    id: PLUGIN_ID_TITLES,
    label: 'Titles',
    color: PLUGIN_COLOR_TITLES,
    hint: 'Styled title gallery',
  },
  {
    id: PLUGIN_ID_EXCEL,
    label: 'Sheet',
    color: PLUGIN_COLOR_EXCEL,
    hint: 'Sheet grid or CSV import',
  },
  {
    id: PLUGIN_ID_GRAPH,
    label: 'Graph',
    color: PLUGIN_COLOR_GRAPH,
    hint: 'Bar, line, or pie graph',
  },
  {
    id: PLUGIN_ID_AI,
    label: 'Ink AI',
    color: PLUGIN_COLOR_AI,
    hint: 'Ask Ink AI about this document',
  },
  {
    id: PLUGIN_ID_THEME,
    label: 'Theme',
    color: PLUGIN_COLOR_THEME,
    hint: 'Paper theme for the editor',
  },
];
