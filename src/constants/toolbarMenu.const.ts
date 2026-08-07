import type { ToolbarOption } from '../types';

export const TOOLBAR_CONTEXT_MENU_ID_CUSTOMIZE = 'toolbar-customize';
export const TOOLBAR_CONTEXT_MENU_ID_HIDE = 'toolbar-hide';
export const TOOLBAR_CONTEXT_MENU_LABEL_CUSTOMIZE = 'Customize toolbar';
export const TOOLBAR_CONTEXT_MENU_LABEL_HIDE = 'Hide toolbar';

export const CONTEXT_MENU_ID_SHOW_TOOLBAR = 'show-toolbar';
export const CONTEXT_MENU_LABEL_SHOW_TOOLBAR = 'Show toolbar';

export const TOOLBAR_SHOW_CONTROL_LABEL = 'Show toolbar';
export const TOOLBAR_SHOW_CONTROL_ARIA_LABEL = 'Show formatting toolbar';

export const TOOLBAR_STORAGE_KEY_HIDDEN = 'ink-toolbar-hidden';
export const TOOLBAR_STORAGE_KEY_ITEMS = 'ink-toolbar-items';
export const TOOLBAR_STORAGE_VALUE_TRUE = 'true';
export const TOOLBAR_STORAGE_VALUE_FALSE = 'false';

export const TOOLBAR_OPTION_DIVIDER = 'divider' as const;

export const TOOLBAR_OPTION_LABELS: Record<ToolbarOption, string> = {
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  heading4: 'Heading 4',
  heading5: 'Heading 5',
  heading6: 'Heading 6',
  paragraph: 'Paragraph',
  headingDropdown: 'Heading',
  bulletList: 'Bullet list',
  orderedList: 'Numbered list',
  blockquote: 'Quote',
  code: 'Code',
  link: 'Link',
  image: 'Image',
  table: 'Table',
  signature: 'Sign pad',
  findReplace: 'Find and replace',
  horizontalRule: 'Horizontal rule',
  undo: 'Undo',
  redo: 'Redo',
  trackChanges: 'Track changes',
  comments: 'Comments',
  ai: 'AI',
  textColor: 'Text color',
  highlightColor: 'Highlight color',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  alignJustify: 'Justify',
  indent: 'Indent',
  outdent: 'Outdent',
  clearFormat: 'Clear formatting',
  divider: 'Divider',
};

export const TOOLBAR_CUSTOMIZE_TITLE = 'Customize toolbar';
export const TOOLBAR_CUSTOMIZE_CLOSE_LABEL = 'Done';
export const TOOLBAR_CUSTOMIZE_LIST_ARIA_LABEL = 'Toolbar options';
