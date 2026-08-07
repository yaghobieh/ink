export type InkFeatureName =
  | 'table'
  | 'trackChanges'
  | 'comments'
  | 'ai'
  | 'blocks'
  | 'slash'
  | 'history'
  | 'typoAutoFix'
  | 'signature'
  | 'findReplace'
  | 'horizontalRule';

export type InkFeaturesConfig = Partial<Record<InkFeatureName, boolean>>;

export type InkEditorVariant = 'classic' | 'document';

export type InkEditorChrome = 'boxed' | 'borderless';

export type InkColorMode = 'light' | 'dark' | 'system';

export type InkAiPlacement = 'sidebar' | 'drawer' | 'floating';
