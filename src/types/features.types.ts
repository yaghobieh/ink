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
  | 'horizontalRule'
  | 'htmlSource'
  | 'titles'
  | 'excel'
  | 'graph'
  | 'outline'
  | 'fullscreen'
  | 'theme';

export type InkFeaturesConfig = Partial<Record<InkFeatureName, boolean>>;

export type InkEditorVariant =
  | 'classic'
  | 'document'
  | 'simple'
  | 'agent'
  | 'docx'
  | 'notion-like';

export type InkEditorChrome = 'boxed' | 'borderless';

export type InkColorMode = 'light' | 'dark' | 'system';

export type InkAiPlacement = 'sidebar' | 'drawer' | 'floating';
