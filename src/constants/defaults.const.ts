import type { DropdownOption, SlashCommandItem, ToolbarOption } from '../types';
import type { InkFeaturesConfig } from '../types';
import {
  INK_DEFAULT_TABLE_COLS,
  INK_DEFAULT_TABLE_ROWS,
} from './numbers';
import {
  INK_CHECKLIST_ITEM,
  SLASH_GENERATE_TABLE_DESC,
  SLASH_GENERATE_TABLE_ID,
  SLASH_GENERATE_TABLE_KEYWORDS,
  SLASH_GENERATE_TABLE_LABEL,
  SLASH_GENERATE_TABLE_MARK,
  SLASH_GENERATE_TABLE_SHORTCUT,
} from './generals.const';
import {
  TOOLBAR_OPTION_DIRECTION_LTR,
  TOOLBAR_OPTION_DIRECTION_RTL,
  TOOLBAR_OPTION_FIND_REPLACE_DROPDOWN,
  TOOLBAR_OPTION_FONT_DROPDOWN,
  TOOLBAR_OPTION_HORIZONTAL_RULE,
  TOOLBAR_OPTION_CHECKLIST,
  TOOLBAR_OPTION_HTML_SOURCE,
  TOOLBAR_OPTION_TITLES,
  TOOLBAR_OPTION_EXCEL,
  TOOLBAR_OPTION_GRAPH,
  TOOLBAR_OPTION_OUTLINE,
  TOOLBAR_OPTION_FULLSCREEN,
  TOOLBAR_OPTION_THEME,
  TOOLBAR_OPTION_LIST_DROPDOWN,
  TOOLBAR_OPTION_SIGNATURE,
  TOOLBAR_OPTION_SUBSCRIPT,
  TOOLBAR_OPTION_SUPERSCRIPT,
} from './toolbar.const';
import { LIST_CLASS_CHECK } from './lists.const';

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
  TOOLBAR_OPTION_TITLES,
  TOOLBAR_OPTION_EXCEL,
  TOOLBAR_OPTION_GRAPH,
  TOOLBAR_OPTION_OUTLINE,
  TOOLBAR_OPTION_THEME,
  TOOLBAR_OPTION_FULLSCREEN,
  TOOLBAR_OPTION_HTML_SOURCE,
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
  TOOLBAR_OPTION_HTML_SOURCE,
  'divider',
  'trackChanges',
  'comments',
  'ai',
  'divider',
  'undo',
  'redo',
];

export const INK_CHROME_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'bulletList',
  'orderedList',
  TOOLBAR_OPTION_CHECKLIST,
  'blockquote',
  'divider',
  'image',
  'link',
  'table',
  TOOLBAR_OPTION_TITLES,
  TOOLBAR_OPTION_EXCEL,
  TOOLBAR_OPTION_GRAPH,
  TOOLBAR_OPTION_OUTLINE,
  TOOLBAR_OPTION_THEME,
  TOOLBAR_OPTION_FULLSCREEN,
  'code',
  TOOLBAR_OPTION_HTML_SOURCE,
  'divider',
  'undo',
  'redo',
  'ai',
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

export const INK_PLACEHOLDER_DEFAULT = 'Type / to insert a block, or press ⌘K for AI';
export const INK_CLASS_ROOT = 'Ink-Editor';
export const INK_CLASS_TOOLBAR = 'Ink-Editor__toolbar';
export const INK_CLASS_TOOLBAR_SHOW = 'Ink-Editor__toolbar-show';
export const INK_CLASS_CONTENT = 'Ink-Editor__content';
export const INK_CLASS_DIVIDER = 'Ink-Editor__divider';
export const INK_CLASS_BUTTON = 'Ink-Editor__button';
export const INK_CLASS_BUTTON_ACTIVE = 'Ink-Editor__button--active';
export const INK_CLASS_STYLE_DD = 'Ink-Editor__style-dd';
export const INK_CLASS_STYLE_TRIGGER = 'Ink-Editor__style-dd-trigger';
export const INK_CLASS_STYLE_MENU = 'Ink-Editor__style-menu';
export const INK_CLASS_STYLE_MENU_PORTAL = 'Ink-Editor__style-menu--portal';
export const INK_CLASS_STYLE_MENU_FORCED = 'Ink-Editor__style-menu--forced-light';
export const INK_CLASS_SOURCE = 'Ink-Editor__source';
export const INK_CLASS_CONTENT_HIDDEN = 'Ink-Editor__content--hidden';
export const INK_CLASS_TABLE_PICKER = 'Ink-Editor__table-picker';
export const INK_CLASS_TABLE_PICKER_GRID = 'Ink-Editor__table-picker-grid';
export const INK_CLASS_TABLE_PICKER_CELL = 'Ink-Editor__table-picker-cell';
export const INK_CLASS_TABLE_PICKER_CELL_ON = 'Ink-Editor__table-picker-cell--on';
export const INK_CLASS_TABLE_PICKER_LABEL = 'Ink-Editor__table-picker-label';
export const INK_CLASS_TABLE_RESIZE = 'Ink-table--resizing';
export const INK_CLASS_TITLE = 'Ink-title';
export const INK_CLASS_TITLE_GALLERY = 'Ink-Editor__title-gallery';
export const INK_CLASS_TITLE_GRID = 'Ink-Editor__title-grid';
export const INK_CLASS_TITLE_CELL = 'Ink-Editor__title-cell';
export const INK_CLASS_EXCEL_PANEL = 'Ink-Editor__excel';
export const INK_CLASS_EXCEL_GRID = 'Ink-Editor__excel-grid';
export const INK_CLASS_EXCEL_CELL = 'Ink-Editor__excel-cell';
export const INK_CLASS_EXCEL_ACTIONS = 'Ink-Editor__excel-actions';
export const INK_CLASS_EXCEL_TITLE = 'Ink-Editor__excel-title';
export const INK_CLASS_EXCEL_INSERT = 'Ink-Editor__excel-insert';
export const INK_CLASS_GRAPH_PANEL = 'Ink-Editor__graph';
export const INK_CLASS_GRAPH_TYPES = 'Ink-Editor__graph-types';
export const INK_CLASS_GRAPH_PREVIEW = 'Ink-Editor__graph-preview';
export const INK_CLASS_GRAPH_WRAP = 'Ink-graph';
export const INK_CLASS_GRAPH_BLOCK = 'Ink-graph-block';
export const INK_CLASS_TOOLBAR_HINT = 'Ink-Editor__toolbar-hint';
export const INK_CLASS_TOOLBAR_ROW = 'Ink-Editor__toolbar-row';
export const INK_CLASS_TOOLBAR_MEASURE = 'Ink-Editor__toolbar-measure';
export const INK_CLASS_TOOLBAR_OVERFLOW = 'Ink-Editor__toolbar-overflow';
export const INK_CLASS_TOOLBAR_MORE = 'Ink-Editor__toolbar-more';
export const INK_CLASS_EXCEL_HEAD = 'Ink-Editor__excel-head';
export const INK_CLASS_EXCEL_CORNER = 'Ink-Editor__excel-corner';
export const INK_CLASS_EXCEL_COL_HOVER = 'Ink-Editor__excel-cell--col';
export const INK_CLASS_EXCEL_ROW_HOVER = 'Ink-Editor__excel-cell--row';
export const INK_ATTR_GRAPH_COLORS = 'data-ink-graph-colors';
export const INK_ATTR_MORE = 'data-ink-more';
export const EXCEL_COL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const INK_CLASS_PLUGIN_PIP = 'Ink-Editor__plugin-pip';
export const INK_CLASS_TOOL_WRAP = 'Ink-Editor__tool';
export const INK_CLASS_AI_PILL_INSTALLED = 'Ink-AiPill--installed';
export const INK_CLASS_OUTLINE_TOGGLE = 'Ink-Outline__toggle';
export const INK_CLASS_AI_TAB = 'Ink-Ai__tab';
export const INK_CLASS_AI_TAB_ON = 'Ink-Ai__tab--on';
export const INK_ATTR_GRAPH = 'data-ink-graph';
export const INK_ATTR_GRAPH_POINTS = 'data-ink-graph-points';
export const INK_ATTR_TITLE = 'data-ink-title';
export const INK_CLASS_STYLE_OPTION = 'Ink-Editor__style-option';
export const INK_CLASS_STYLE_OPTION_SEL = 'Ink-Editor__style-option--sel';
export const INK_CLASS_STYLE_OPTION_MARK = 'Ink-Editor__style-option-mark';
export const INK_CLASS_STYLE_OPTION_TXT = 'Ink-Editor__style-option-txt';
export const INK_CLASS_STYLE_OPTION_NAME = 'Ink-Editor__style-option-name';
export const INK_CLASS_STYLE_OPTION_DESC = 'Ink-Editor__style-option-desc';
export const INK_CLASS_STYLE_MENU_RICH = 'Ink-Editor__style-menu--rich';
export const INK_CLASS_STYLE_CHEV = 'Ink-Editor__select-chev';
export const INK_CLASS_STYLE_CHECK = 'Ink-Editor__style-check';
export const INK_CLASS_BUTTON_WIDE = 'Ink-Editor__button--wide';
export const INK_CLASS_BUTTON_LABEL = 'Ink-Editor__button-label';
export const INK_CLASS_AI_PILL_DOT = 'Ink-AiPill__dot';
export const INK_CLASS_SLASH_MARK_AI = 'Ink-Slash__mark--ai';
export const INK_CLASS_GLYPH = 'Ink-Editor__glyph';
export const INK_CLASS_GLYPH_BOLD = 'Ink-Editor__glyph--bold';
export const INK_CLASS_GLYPH_ITALIC = 'Ink-Editor__glyph--italic';
export const INK_CLASS_GLYPH_UNDERLINE = 'Ink-Editor__glyph--underline';
export const INK_CLASS_GLYPH_STRIKE = 'Ink-Editor__glyph--strike';
export const INK_CLASS_FOOTER = 'Ink-Editor__footer';
export const INK_CLASS_FOOTER_META = 'Ink-Editor__footer-meta';
export const INK_CLASS_AI_PILL = 'Ink-AiPill';
export const INK_CLASS_CALLOUT = 'Ink-callout';
export const SLASH_CATEGORY_BASIC = 'Blocks';
export const SLASH_CATEGORY_MEDIA = 'Media';
export const SLASH_CATEGORY_AI = 'AI';
export const SLASH_CATEGORY_PLUGINS = 'Plugins';
export const SLASH_ARIA_LABEL = 'Insert a block';
export const SLASH_SEARCH_LABEL = '';
export const INK_FORMAT_BLOCK_H1 = 'h1';
export const INK_FORMAT_BLOCK_H2 = 'h2';
export const INK_FORMAT_BLOCK_H3 = 'h3';
export const INK_FORMAT_BLOCK_P = 'p';
export const INK_FORMAT_BLOCK_PRE = 'pre';
export const INK_FORMAT_BLOCK_QUOTE = 'blockquote';
export const INK_CALLOUT_HTML =
  '<blockquote class="Ink-callout"><p>Callout</p></blockquote>';
export const INK_CHECKLIST_HTML = `<ul class="${LIST_CLASS_CHECK}"><li>${INK_CHECKLIST_ITEM}</li></ul>`;
export const INK_CLASS_SHELL = 'Ink-Editor__shell';
export const INK_CLASS_OUTLINE = 'Ink-Outline';
export const INK_CLASS_OUTLINE_LABEL = 'Ink-Outline__label';
export const INK_CLASS_OUTLINE_ITEM = 'Ink-Outline__item';
export const INK_CLASS_OUTLINE_ITEM_ACTIVE = 'Ink-Outline__item--active';
export const INK_OUTLINE_LABEL = 'Outline';
export const INK_OUTLINE_EMPTY = 'No headings yet';
export const INK_OUTLINE_HIDE = 'Hide';
export const INK_OUTLINE_HEADING_SELECTOR = 'h1, h2, h3';
export const INK_VARIANT_DOCUMENT = 'document';
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
  htmlSource: true,
  titles: true,
  excel: true,
  graph: true,
  outline: true,
  fullscreen: true,
  theme: true,
};
export const INK_TABLE_DEFAULT_ROWS = INK_DEFAULT_TABLE_ROWS;
export const INK_TABLE_DEFAULT_COLS = INK_DEFAULT_TABLE_COLS;

export const INK_SLASH_COMMANDS: SlashCommandItem[] = [
  {
    id: 'paragraph',
    label: 'Text',
    keywords: ['p', 'paragraph', 'text'],
    insert: 'paragraph',
    description: 'Just start typing with plain text.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/t',
    mark: 'T',
  },
  {
    id: 'heading1',
    label: 'Heading 1',
    keywords: ['h1', 'title', 'heading'],
    insert: 'heading1',
    description: 'Big section heading.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/h1',
    mark: 'H1',
  },
  {
    id: 'heading2',
    label: 'Heading 2',
    keywords: ['h2', 'subtitle', 'heading'],
    insert: 'heading2',
    description: 'Medium section heading.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/h2',
    mark: 'H2',
  },
  {
    id: 'heading3',
    label: 'Heading 3',
    keywords: ['h3', 'heading'],
    insert: 'heading3',
    description: 'Small section heading.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/h3',
    mark: 'H3',
  },
  {
    id: 'bullet',
    label: 'Bulleted list',
    keywords: ['ul', 'list', 'bullet'],
    insert: 'bulletList',
    description: 'Create a simple bulleted list.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/ul',
    mark: '•',
  },
  {
    id: 'ordered',
    label: 'Numbered list',
    keywords: ['ol', 'list', 'numbered'],
    insert: 'orderedList',
    description: 'Create a numbered list.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/ol',
    mark: '1.',
  },
  {
    id: 'checklist',
    label: 'Checklist',
    keywords: ['check', 'todo', 'task'],
    insert: 'checklist',
    description: 'Track tasks with checkboxes.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/todo',
    mark: '☑',
  },
  {
    id: 'quote',
    label: 'Quote',
    keywords: ['quote', 'blockquote'],
    insert: 'quote',
    description: 'Highlight a quotation.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/q',
    mark: '“',
  },
  {
    id: 'callout',
    label: 'Callout',
    keywords: ['callout', 'note', 'tip'],
    insert: 'callout',
    description: 'Call out a note beside the copy.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/note',
    mark: 'i',
  },
  {
    id: 'code',
    label: 'Code block',
    keywords: ['code', 'pre', 'html'],
    insert: 'code',
    description: 'Syntax-highlighted snippet.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/code',
    mark: '</>',
  },
  {
    id: 'table',
    label: 'Table',
    keywords: ['table', 'grid'],
    insert: 'table',
    description: 'Structured rows and columns.',
    category: SLASH_CATEGORY_BASIC,
    shortcut: '/table',
    mark: '▦',
  },
  {
    id: 'image',
    label: 'Image',
    keywords: ['image', 'img', 'media', 'upload'],
    insert: 'image',
    description: 'Upload or embed an image.',
    category: SLASH_CATEGORY_MEDIA,
    shortcut: '/img',
    mark: '▣',
  },
  {
    id: 'ai',
    label: 'Ask Ink AI',
    keywords: ['ai', 'assistant', 'chat'],
    insert: 'ai',
    description: 'Draft a block from a prompt.',
    category: SLASH_CATEGORY_AI,
    shortcut: '/ai',
    mark: '✦',
  },
  {
    id: SLASH_GENERATE_TABLE_ID,
    label: SLASH_GENERATE_TABLE_LABEL,
    keywords: SLASH_GENERATE_TABLE_KEYWORDS,
    insert: 'ai',
    description: SLASH_GENERATE_TABLE_DESC,
    category: SLASH_CATEGORY_AI,
    shortcut: SLASH_GENERATE_TABLE_SHORTCUT,
    mark: SLASH_GENERATE_TABLE_MARK,
  },
  {
    id: 'titles',
    label: 'Title',
    keywords: ['title', 'wordart', 'heading', 'style'],
    insert: 'titles',
    description: 'Styled title from the titles gallery.',
    category: SLASH_CATEGORY_PLUGINS,
    shortcut: '/ti',
    mark: 'Aa',
  },
  {
    id: 'excel',
    label: 'Sheet',
    keywords: ['excel', 'sheet', 'csv', 'spreadsheet'],
    insert: 'excel',
    description: 'Insert a sheet grid or import CSV.',
    category: SLASH_CATEGORY_PLUGINS,
    shortcut: '/ex',
    mark: '⊞',
  },
  {
    id: 'graph',
    label: 'Graph',
    keywords: ['graph', 'chart', 'bar', 'pie'],
    insert: 'graph',
    description: 'Insert a bar, line, or pie graph.',
    category: SLASH_CATEGORY_PLUGINS,
    shortcut: '/gr',
    mark: '▦',
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
