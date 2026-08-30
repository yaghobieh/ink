export type InkThemeId = 'paper' | 'snow' | 'ink' | 'dark';

export type InkThemeDefinition = {
  id: InkThemeId;
  label: string;
};

export type InkThemePlugin = {
  install: () => void;
  apply: (root: HTMLElement | null, id: InkThemeId) => void;
  list: () => InkThemeDefinition[];
  current: () => InkThemeId;
};
