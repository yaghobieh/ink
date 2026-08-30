import type { ToolbarOption } from '../types';

export const TOOLBAR_CONTEXT_MENU_ID_CUSTOMIZE = 'toolbar-customize';
export const TOOLBAR_CONTEXT_MENU_ID_HIDE = 'toolbar-hide';
export const TOOLBAR_CONTEXT_MENU_LABEL_CUSTOMIZE = 'Customize toolbar';
export const TOOLBAR_CONTEXT_MENU_LABEL_HIDE = 'Hide toolbar';

export const CONTEXT_MENU_ID_SHOW_TOOLBAR = 'show-toolbar';
export const CONTEXT_MENU_LABEL_SHOW_TOOLBAR = 'Show toolbar';

export const TOOLBAR_SHOW_CONTROL_LABEL = 'Show toolbar';
export const AGENT_BAR_PLACEHOLDER = 'Ask about this document or request a change…';
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
  fontDropdown: 'Font',
  bulletList: 'Bullet list',
  orderedList: 'Numbered list',
  checklist: 'Checklist',
  listDropdown: 'List',
  blockquote: 'Quote',
  code: 'Code',
  link: 'Link',
  image: 'Image',
  table: 'Table',
  signature: 'Sign pad',
  findReplace: 'Find and replace',
  findReplaceDropdown: 'Find and replace',
  horizontalRule: 'Horizontal rule',
  undo: 'Undo',
  redo: 'Redo',
  trackChanges: 'Track changes',
  comments: 'Comments',
  ai: 'AI',
  textColor: 'Text color',
  highlightColor: 'Highlight color',
  directionLtr: 'Left to right',
  directionRtl: 'Right to left',
  superscript: 'Superscript',
  subscript: 'Subscript',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  alignJustify: 'Justify',
  indent: 'Indent',
  outdent: 'Outdent',
  clearFormat: 'Clear formatting',
  htmlSource: 'HTML source',
  titles: 'Titles',
  excel: 'Sheet',
  graph: 'Graph',
  outline: 'Outline',
  fullscreen: 'Fullscreen',
  theme: 'Theme',
  divider: 'Divider',
};

export const TOOLBAR_OPTION_HINTS: Record<ToolbarOption, string> = {
  bold: 'Bold the selected text',
  italic: 'Italicize the selected text',
  underline: 'Underline the selected text',
  strikethrough: 'Strike through the selected text',
  heading1: 'Largest heading',
  heading2: 'Section heading',
  heading3: 'Subsection heading',
  heading4: 'Small heading',
  heading5: 'Caption heading',
  heading6: 'Fine heading',
  paragraph: 'Body paragraph',
  headingDropdown: 'Paragraph and heading styles',
  fontDropdown: 'Font family',
  bulletList: 'Bulleted list',
  orderedList: 'Numbered list',
  checklist: 'Checklist',
  listDropdown: 'List style',
  blockquote: 'Quote block',
  code: 'Code block',
  link: 'Link the selected text',
  image: 'Insert an image',
  table: 'Insert a table',
  signature: 'Open the sign pad',
  findReplace: 'Find and replace',
  findReplaceDropdown: 'Find and replace',
  horizontalRule: 'Insert a divider line',
  undo: 'Undo the last change',
  redo: 'Redo the last undone change',
  trackChanges: 'Show insert and delete marks',
  comments: 'Add or open comments',
  ai: 'Ask Ink AI about this document',
  textColor: 'Text color',
  highlightColor: 'Highlight color',
  directionLtr: 'Left to right',
  directionRtl: 'Right to left',
  superscript: 'Superscript',
  subscript: 'Subscript',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  alignJustify: 'Justify',
  indent: 'Indent',
  outdent: 'Outdent',
  clearFormat: 'Clear formatting',
  htmlSource: 'Toggle HTML source',
  titles: 'Styled title gallery',
  excel: 'Sheet grid or CSV import',
  graph: 'Bar, line, or pie graph',
  outline: 'Show or hide the outline rail',
  fullscreen: 'Fill the screen with the editor',
  theme: 'Editor paper theme',
  divider: '',
};

export const TOOLBAR_HINT_DEFAULT = 'Hover a tool for details';

export const TOOLBAR_CUSTOMIZE_TITLE = 'Customize toolbar';
export const TOOLBAR_CUSTOMIZE_CLOSE_LABEL = 'Done';
export const TOOLBAR_CUSTOMIZE_LIST_ARIA_LABEL = 'Toolbar options';
