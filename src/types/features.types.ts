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
  | 'findReplace';

export type InkFeaturesConfig = Partial<Record<InkFeatureName, boolean>>;

export type InkEditorVariant = 'classic' | 'document';

export type InkAiPlacement = 'sidebar' | 'drawer' | 'floating';
