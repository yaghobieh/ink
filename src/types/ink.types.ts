import type { HTMLAttributes, ReactNode } from 'react';
import type { InkAiConfig } from './ai.types';
import type { InkCommentThread, InkCommentsChangeHandler } from './comments.types';
import type {
  InkColorMode,
  InkEditorChrome,
  InkEditorVariant,
  InkFeaturesConfig,
} from './features.types';
import type {
  InkIconMap,
  InkImageUploadHandler,
  InkPasteMode,
  InkPremiumConfig,
  InkThemeTokens,
} from './premium.types';
import type { InkTrackChange, InkTrackChangesChangeHandler } from './trackChanges.types';

export type ToolbarOption =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'paragraph'
  | 'headingDropdown'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'code'
  | 'link'
  | 'image'
  | 'table'
  | 'signature'
  | 'findReplace'
  | 'horizontalRule'
  | 'undo'
  | 'redo'
  | 'trackChanges'
  | 'comments'
  | 'ai'
  | 'textColor'
  | 'highlightColor'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'indent'
  | 'outdent'
  | 'clearFormat'
  | 'divider';

export interface InkEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
  toolbar?: ToolbarOption[];
  testId?: string;
  allowImagePaste?: boolean;
  showCharCount?: boolean;
  charCountMax?: number;
  typoAutoFix?: boolean;
  variant?: InkEditorVariant;
  chrome?: InkEditorChrome;
  colorMode?: InkColorMode;
  features?: InkFeaturesConfig;
  author?: string;
  trackChanges?: InkTrackChange[];
  onTrackChangesChange?: InkTrackChangesChangeHandler;
  trackChangesEnabled?: boolean;
  onTrackChangesEnabledChange?: (enabled: boolean) => void;
  comments?: InkCommentThread[];
  onCommentsChange?: InkCommentsChangeHandler;
  showCommentsPanel?: boolean;
  onShowCommentsPanelChange?: (open: boolean) => void;
  ai?: InkAiConfig;
  slashCommands?: boolean;
  tableRows?: number;
  tableCols?: number;
  premium?: InkPremiumConfig;
  theme?: InkThemeTokens;
  icons?: InkIconMap;
  pasteMode?: InkPasteMode;
  onImageUpload?: InkImageUploadHandler;
  wysiwyg?: boolean;
  keepInMemory?: boolean;
  memoryKey?: string;
  onToolbarChange?: (items: ToolbarOption[]) => void;
  toolbarHidden?: boolean;
  onToolbarHiddenChange?: (hidden: boolean) => void;
}

export interface ToolbarButtonProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface ToolbarDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  title: string;
  disabled?: boolean;
}

export interface ToolbarColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  title: string;
  disabled?: boolean;
  type?: 'text' | 'highlight';
}

export interface TypoFixResult {
  html: string;
  fixedCount: number;
}

export interface SlashCommandItem {
  id: string;
  label: string;
  keywords: string[];
  insert: 'heading1' | 'heading2' | 'bulletList' | 'orderedList' | 'table' | 'ai';
}
