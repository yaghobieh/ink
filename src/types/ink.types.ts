import type { HTMLAttributes, ReactNode } from 'react';

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
