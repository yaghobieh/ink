import type { DropdownOption, ToolbarOption } from '../types';

export const INK_DEFAULT_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'textColor',
  'highlightColor',
  'divider',
  'bulletList',
  'orderedList',
  'divider',
  'link',
  'image',
  'divider',
  'clearFormat',
];

export const INK_SIMPLE_TOOLBAR: ToolbarOption[] = [
  'bold',
  'italic',
  'underline',
  'divider',
  'bulletList',
  'orderedList',
];

export const INK_HEADING_OPTIONS: DropdownOption[] = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
];

export const INK_BUTTON_CONFIG: Record<
  string,
  { title: string; command: string; value?: string }
> = {
  bold: { title: 'Bold (Ctrl+B)', command: 'bold' },
  italic: { title: 'Italic (Ctrl+I)', command: 'italic' },
  underline: { title: 'Underline (Ctrl+U)', command: 'underline' },
  strikethrough: { title: 'Strikethrough', command: 'strikeThrough' },
  heading1: { title: 'Heading 1', command: 'formatBlock', value: 'h1' },
  heading2: { title: 'Heading 2', command: 'formatBlock', value: 'h2' },
  heading3: { title: 'Heading 3', command: 'formatBlock', value: 'h3' },
  heading4: { title: 'Heading 4', command: 'formatBlock', value: 'h4' },
  heading5: { title: 'Heading 5', command: 'formatBlock', value: 'h5' },
  heading6: { title: 'Heading 6', command: 'formatBlock', value: 'h6' },
  paragraph: { title: 'Paragraph', command: 'formatBlock', value: 'p' },
  bulletList: { title: 'Bullet list', command: 'insertUnorderedList' },
  orderedList: { title: 'Numbered list', command: 'insertOrderedList' },
  blockquote: { title: 'Quote', command: 'formatBlock', value: 'blockquote' },
  code: { title: 'Code block', command: 'formatBlock', value: 'pre' },
  alignLeft: { title: 'Align left', command: 'justifyLeft' },
  alignCenter: { title: 'Align center', command: 'justifyCenter' },
  alignRight: { title: 'Align right', command: 'justifyRight' },
  alignJustify: { title: 'Justify', command: 'justifyFull' },
  indent: { title: 'Indent', command: 'indent' },
  outdent: { title: 'Outdent', command: 'outdent' },
  clearFormat: { title: 'Clear formatting', command: 'removeFormat' },
};

export const INK_COLOR_SWATCHES = [
  '#111827',
  '#dc2626',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#2563eb',
  '#7c3aed',
  '#db2777',
];

export const INK_PLACEHOLDER_DEFAULT = 'Start typing...';
export const INK_CLASS_ROOT = 'Ink-Editor';
export const INK_CLASS_TOOLBAR = 'Ink-Editor__toolbar';
export const INK_CLASS_CONTENT = 'Ink-Editor__content';
export const INK_CLASS_DIVIDER = 'Ink-Editor__divider';
export const INK_CLASS_BUTTON = 'Ink-Editor__button';
export const INK_CLASS_BUTTON_ACTIVE = 'Ink-Editor__button--active';
export const INK_CLASS_FOOTER = 'Ink-Editor__footer';
