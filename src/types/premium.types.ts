import type { CSSProperties, ReactNode } from 'react';
import type { ToolbarOption } from './ink.types';

export type InkPremiumFeature =
  | 'icons'
  | 'theme'
  | 'richPaste'
  | 'imageUpload'
  | 'wysiwyg';

export type InkPasteMode = 'plain' | 'rich';

export type InkIconKey = Extract<
  ToolbarOption,
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'bulletList'
  | 'orderedList'
  | 'link'
  | 'image'
  | 'table'
  | 'signature'
  | 'findReplace'
  | 'undo'
  | 'redo'
  | 'trackChanges'
  | 'comments'
  | 'ai'
  | 'clearFormat'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'indent'
  | 'outdent'
  | 'blockquote'
  | 'code'
>;

export type InkIconMap = Partial<Record<InkIconKey, ReactNode>>;

export interface InkThemeTokens {
  border?: string;
  background?: string;
  toolbar?: string;
  text?: string;
  muted?: string;
  accent?: string;
  accentSoft?: string;
  shadow?: string;
  radius?: string;
  fontFamily?: string;
}

export interface InkPremiumConfig {
  enabled?: boolean;
  licenseKey?: string;
  features?: Partial<Record<InkPremiumFeature, boolean>>;
}

export interface InkResolvedPremium {
  active: boolean;
  features: Record<InkPremiumFeature, boolean>;
}

export type InkImageUploadHandler = (file: File) => Promise<string> | string;

export type InkThemeStyle = CSSProperties;
