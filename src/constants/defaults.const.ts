import type { DropdownOption, SlashCommandItem, ToolbarOption } from '../types';
import type { InkFeaturesConfig } from '../types';
import {
  INK_DEFAULT_TABLE_COLS,
  INK_DEFAULT_TABLE_ROWS,
} from './numbers';
import {
  TOOLBAR_OPTION_DIRECTION_LTR,
  TOOLBAR_OPTION_DIRECTION_RTL,
  TOOLBAR_OPTION_FIND_REPLACE_DROPDOWN,
  TOOLBAR_OPTION_FONT_DROPDOWN,
  TOOLBAR_OPTION_HORIZONTAL_RULE,
  TOOLBAR_OPTION_LIST_DROPDOWN,
  TOOLBAR_OPTION_SIGNATURE,
  TOOLBAR_OPTION_SUBSCRIPT,
  TOOLBAR_OPTION_SUPERSCRIPT,
} from './toolbar.const';

export const INK_DEFAULT_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  TOOLBAR_OPTION_FONT_DROPDOWN,
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  TOOLBAR_OPTION_SUPERSCRIPT,
  TOOLBAR_OPTION_SUBSCRIPT,
  'divider',
  'textColor',
  'highlightColor',
  'divider',
  TOOLBAR_OPTION_LIST_DROPDOWN,
  TOOLBAR_OPTION_DIRECTION_LTR,
  TOOLBAR_OPTION_DIRECTION_RTL,
  'divider',
  'link',
  'image',
  'table',
  TOOLBAR_OPTION_SIGNATURE,
  TOOLBAR_OPTION_FIND_REPLACE_DROPDOWN,
  TOOLBAR_OPTION_HORIZONTAL_RULE,
  'divider',
  'undo',
  'redo',
  'divider',
  'trackChanges',
  'comments',
  'ai',
  'divider',
  'clearFormat',
];

export const INK_SIMPLE_TOOLBAR: ToolbarOption[] = [
  'bold',
  'italic',
  'underline',
  'divider',
  TOOLBAR_OPTION_LIST_DROPDOWN,
];

export const INK_COLLAB_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'divider',
  TOOLBAR_OPTION_LIST_DROPDOWN,
  'table',
  'divider',
  'trackChanges',
  'comments',
  'ai',
  'divider',
  'undo',
  'redo',
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
  directionLtr: { title: 'Left to right', command: 'directionLtr' },
  directionRtl: { title: 'Right to left', command: 'directionRtl' },
  superscript: { title: 'Superscript', command: 'superscript' },
  subscript: { title: 'Subscript', command: 'subscript' },
  alignLeft: { title: 'Align left', command: 'justifyLeft' },
  alignCenter: { title: 'Align center', command: 'justifyCenter' },
  alignRight: { title: 'Align right', command: 'justifyRight' },
  alignJustify: { title: 'Justify', command: 'justifyFull' },
  indent: { title: 'Indent', command: 'indent' },
  outdent: { title: 'Outdent', command: 'outdent' },
  clearFormat: { title: 'Clear formatting', command: 'removeFormat' },
  undo: { title: 'Undo', command: 'undo' },
  redo: { title: 'Redo', command: 'redo' },
};

export const INK_COLOR_SWATCHES = [
  '#111827',
  '#dc2626',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#2563eb',
  '#0f766e',
  '#db2777',
];

export const INK_PLACEHOLDER_DEFAULT = 'Start typing...';
export const INK_CLASS_ROOT = 'Ink-Editor';
export const INK_CLASS_TOOLBAR = 'Ink-Editor__toolbar';
export const INK_CLASS_TOOLBAR_SHOW = 'Ink-Editor__toolbar-show';
export const INK_CLASS_CONTENT = 'Ink-Editor__content';
export const INK_CLASS_DIVIDER = 'Ink-Editor__divider';
export const INK_CLASS_BUTTON = 'Ink-Editor__button';
export const INK_CLASS_BUTTON_ACTIVE = 'Ink-Editor__button--active';
export const INK_CLASS_FOOTER = 'Ink-Editor__footer';
export const INK_CLASS_SHELL = 'Ink-Editor__shell';
export const INK_CLASS_BODY = 'Ink-Editor__body';
export const INK_CLASS_BLOCK_ACTIVE = 'Ink-block--active';
export const INK_CLASS_TC_INSERT = 'Ink-tc-insert';
export const INK_CLASS_TC_DELETE = 'Ink-tc-delete';
export const INK_CLASS_COMMENT_MARK = 'Ink-comment-mark';
export const INK_DEFAULT_AUTHOR = 'You';
export const INK_DEFAULT_VARIANT = 'classic' as const;
export const INK_CHROME_BOXED = 'boxed' as const;
export const INK_CHROME_BORDERLESS = 'borderless' as const;
export const INK_DEFAULT_CHROME = INK_CHROME_BOXED;
export const INK_DEFAULT_FEATURES: InkFeaturesConfig = {
  table: true,
  trackChanges: true,
  comments: true,
  ai: true,
  blocks: true,
  slash: true,
  history: true,
  typoAutoFix: true,
  signature: true,
  findReplace: true,
  horizontalRule: true,
};
export const INK_TABLE_DEFAULT_ROWS = INK_DEFAULT_TABLE_ROWS;
export const INK_TABLE_DEFAULT_COLS = INK_DEFAULT_TABLE_COLS;

export const INK_SLASH_COMMANDS: SlashCommandItem[] = [
  {
    id: 'heading1',
    label: 'Heading 1',
    keywords: ['h1', 'title', 'heading'],
    insert: 'heading1',
  },
  {
    id: 'heading2',
    label: 'Heading 2',
    keywords: ['h2', 'subtitle', 'heading'],
    insert: 'heading2',
  },
  {
    id: 'bullet',
    label: 'Bullet list',
    keywords: ['ul', 'list', 'bullet'],
    insert: 'bulletList',
  },
  {
    id: 'ordered',
    label: 'Numbered list',
    keywords: ['ol', 'list', 'numbered'],
    insert: 'orderedList',
  },
  {
    id: 'table',
    label: 'Table',
    keywords: ['table', 'grid'],
    insert: 'table',
  },
  {
    id: 'ai',
    label: 'Ask AI',
    keywords: ['ai', 'assistant', 'chat'],
    insert: 'ai',
  },
];

export const INK_TRANSLATE_LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese (Simplified)',
  'Japanese',
  'Russian',
  'Portuguese',
  'Korean',
  'Italian',
] as const;

export const INK_QUICK_ACTIONS = [
  { id: 'rewrite', label: 'Rewrite', capability: 'rewrite' as const },
  { id: 'summarize', label: 'Summarize', capability: 'summarize' as const },
  { id: 'expand', label: 'Expand', capability: 'expand' as const },
  { id: 'tone', label: 'Adjust tone', capability: 'tone' as const },
];
