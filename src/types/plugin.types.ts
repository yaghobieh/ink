export type InkHostPluginId = 'titles' | 'excel' | 'graph' | 'ai' | 'theme';

export type InkHostPlugin = {
  id: InkHostPluginId;
  label: string;
  color: string;
  hint: string;
};
