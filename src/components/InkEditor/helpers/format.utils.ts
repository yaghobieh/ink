import type { ToolbarOption } from '../../../types';
import {
  DIR_ATTRIBUTE,
  DIR_LTR,
  DIR_RTL,
  FONT_COMMAND_NAME,
  FONT_FAMILY_BY_VALUE,
  FONT_STYLE_PROPERTY,
  FONT_VALUE_SYSTEM,
  LIST_CLASS_ALPHA,
  LIST_CLASS_DASH,
  LIST_MARKDOWN_DASH,
  LIST_MARKDOWN_SPACE,
  LIST_MARKDOWN_STAR,
  LIST_STYLE_DECIMAL,
  LIST_STYLE_DISC,
  LIST_STYLE_LOWER_ALPHA,
  LIST_TAG_LI,
  LIST_TAG_OL,
  LIST_TAG_UL,
  LIST_VALUE_BULLET,
  LIST_VALUE_DASH,
  LIST_VALUE_LETTERS,
  LIST_VALUE_NUMBERS,
  NUMBER_ZERO,
} from '../../../constants';
import { getBlockElement } from '../../../utils/blocks.utils';

const STYLE_COLOR = 'color';
const STYLE_BACKGROUND_COLOR = 'background-color';
const STYLE_BACKGROUND = 'background';
const ATTR_COLOR = 'color';
const ATTR_STYLE = 'style';
const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_TEXT = 3;
const COMMAND_REMOVE_FORMAT = 'removeFormat';
const COMMAND_UNORDERED_LIST = 'insertUnorderedList';
const COMMAND_ORDERED_LIST = 'insertOrderedList';
const COMMAND_SUPERSCRIPT = 'superscript';
const COMMAND_SUBSCRIPT = 'subscript';
const COMMAND_STYLE_WITH_CSS = 'styleWithCSS';

export const execCommand = (command: string, value?: string): boolean =>
  document.execCommand(command, false, value);

export const queryCommandState = (command: string): boolean =>
  document.queryCommandState(command);

export const queryCommandValue = (command: string): string =>
  document.queryCommandValue(command);

export const insertLink = (url: string): boolean => {
  if (!url) return false;
  const formattedUrl =
    url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')
      ? url
      : `https://${url}`;
  return execCommand('createLink', formattedUrl);
};

export const setTextColor = (color: string): boolean => execCommand('foreColor', color);

export const setHighlightColor = (color: string): boolean => execCommand('hiliteColor', color);

export const insertHTML = (html: string): boolean => execCommand('insertHTML', html);

export const insertImage = (src: string, alt = ''): boolean => {
  const safeAlt = alt.replace(/"/g, '&quot;');
  return insertHTML(`<img src="${src}" alt="${safeAlt}" style="max-width:100%;height:auto;" />`);
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const getActiveFormats = (): Set<string> => {
  const formats = new Set<string>();
  if (queryCommandState('bold')) formats.add('bold');
  if (queryCommandState('italic')) formats.add('italic');
  if (queryCommandState('underline')) formats.add('underline');
  if (queryCommandState('strikeThrough')) formats.add('strikethrough');
  if (queryCommandState(COMMAND_UNORDERED_LIST)) formats.add('bulletList');
  if (queryCommandState(COMMAND_ORDERED_LIST)) formats.add('orderedList');
  if (queryCommandState(COMMAND_SUPERSCRIPT)) formats.add('superscript');
  if (queryCommandState(COMMAND_SUBSCRIPT)) formats.add('subscript');
  return formats;
};

const stripColorsFromElement = (element: HTMLElement): void => {
  element.style.removeProperty(STYLE_COLOR);
  element.style.removeProperty(STYLE_BACKGROUND_COLOR);
  element.style.removeProperty(STYLE_BACKGROUND);
  if (element.hasAttribute(ATTR_COLOR)) {
    element.removeAttribute(ATTR_COLOR);
  }
  const styleValue = element.getAttribute(ATTR_STYLE);
  if (styleValue !== null && !styleValue.trim()) {
    element.removeAttribute(ATTR_STYLE);
  }
};

export const stripSelectionColors = (): void => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === NUMBER_ZERO) return;
  const range = selection.getRangeAt(NUMBER_ZERO);
  const ancestor = range.commonAncestorContainer;
  const root =
    ancestor.nodeType === NODE_TYPE_ELEMENT
      ? (ancestor as HTMLElement)
      : ancestor.parentElement;
  if (!root) return;
  if (root instanceof HTMLElement && selection.containsNode(root, true)) {
    stripColorsFromElement(root);
  }
  root.querySelectorAll('*').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (!selection.containsNode(node, true)) return;
    stripColorsFromElement(node);
  });
};

export const clearFormatDeep = (): boolean => {
  const removed = execCommand(COMMAND_REMOVE_FORMAT);
  stripSelectionColors();
  return removed;
};

export const applyFontFamily = (fontValue: string): boolean => {
  const family = FONT_FAMILY_BY_VALUE[fontValue] ?? fontValue;
  execCommand(COMMAND_STYLE_WITH_CSS, 'true');
  if (fontValue === FONT_VALUE_SYSTEM) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === NUMBER_ZERO || selection.isCollapsed) {
      return execCommand(FONT_COMMAND_NAME, family);
    }
    const range = selection.getRangeAt(NUMBER_ZERO);
    const span = document.createElement('span');
    span.style.setProperty(FONT_STYLE_PROPERTY, family);
    try {
      range.surroundContents(span);
      return true;
    } catch {
      return execCommand(FONT_COMMAND_NAME, family);
    }
  }
  return execCommand(FONT_COMMAND_NAME, fontValue);
};

const clearListTypeClasses = (list: HTMLElement): void => {
  list.classList.remove(LIST_CLASS_DASH, LIST_CLASS_ALPHA);
  list.style.removeProperty('list-style-type');
};

export const applyListType = (listValue: string): boolean => {
  if (listValue === LIST_VALUE_BULLET || listValue === LIST_VALUE_DASH) {
    execCommand(COMMAND_UNORDERED_LIST);
  } else {
    execCommand(COMMAND_ORDERED_LIST);
  }
  const selection = window.getSelection();
  const node = selection?.anchorNode ?? null;
  let current: Node | null = node;
  let list: HTMLElement | null = null;
  while (current) {
    if (current instanceof HTMLElement) {
      if (current.tagName === LIST_TAG_UL || current.tagName === LIST_TAG_OL) {
        list = current;
        break;
      }
    }
    current = current.parentNode;
  }
  if (!list) return true;
  clearListTypeClasses(list);
  if (listValue === LIST_VALUE_BULLET) {
    list.style.listStyleType = LIST_STYLE_DISC;
  } else if (listValue === LIST_VALUE_DASH) {
    list.classList.add(LIST_CLASS_DASH);
  } else if (listValue === LIST_VALUE_NUMBERS) {
    list.style.listStyleType = LIST_STYLE_DECIMAL;
  } else if (listValue === LIST_VALUE_LETTERS) {
    list.classList.add(LIST_CLASS_ALPHA);
    list.style.listStyleType = LIST_STYLE_LOWER_ALPHA;
  }
  return true;
};

export const detectListType = (): string => {
  const selection = window.getSelection();
  let current: Node | null = selection?.anchorNode ?? null;
  while (current) {
    if (current instanceof HTMLElement) {
      if (current.tagName === LIST_TAG_UL) {
        if (current.classList.contains(LIST_CLASS_DASH)) return LIST_VALUE_DASH;
        return LIST_VALUE_BULLET;
      }
      if (current.tagName === LIST_TAG_OL) {
        if (
          current.classList.contains(LIST_CLASS_ALPHA) ||
          current.style.listStyleType === LIST_STYLE_LOWER_ALPHA
        ) {
          return LIST_VALUE_LETTERS;
        }
        return LIST_VALUE_NUMBERS;
      }
    }
    current = current.parentNode;
  }
  return LIST_VALUE_BULLET;
};

export const setBlockDirection = (
  root: HTMLElement,
  direction: typeof DIR_LTR | typeof DIR_RTL,
): boolean => {
  const selection = window.getSelection();
  const block = getBlockElement(selection?.anchorNode ?? null, root);
  if (!block) return false;
  block.setAttribute(DIR_ATTRIBUTE, direction);
  return true;
};

export const tryConvertMarkdownListPrefix = (event: KeyboardEvent): boolean => {
  if (event.key !== LIST_MARKDOWN_SPACE) return false;
  const selection = window.getSelection();
  if (!selection || !selection.isCollapsed || selection.rangeCount === NUMBER_ZERO) {
    return false;
  }
  const node = selection.anchorNode;
  if (!node || node.nodeType !== NODE_TYPE_TEXT) return false;
  const text = node.textContent ?? '';
  const offset = selection.anchorOffset;
  const before = text.slice(NUMBER_ZERO, offset);
  const marker = before.endsWith(LIST_MARKDOWN_DASH)
    ? LIST_MARKDOWN_DASH
    : before.endsWith(LIST_MARKDOWN_STAR)
      ? LIST_MARKDOWN_STAR
      : null;
  if (!marker) return false;
  const prefixStart = offset - marker.length;
  if (prefixStart < NUMBER_ZERO) return false;
  const charBefore = prefixStart > NUMBER_ZERO ? before[prefixStart - 1] : '';
  if (charBefore && charBefore !== '\n') return false;
  event.preventDefault();
  const range = selection.getRangeAt(NUMBER_ZERO);
  range.setStart(node, prefixStart);
  range.setEnd(node, offset);
  range.deleteContents();
  execCommand(COMMAND_UNORDERED_LIST);
  return true;
};

export const isSelectionInListItem = (): boolean => {
  const selection = window.getSelection();
  let current: Node | null = selection?.anchorNode ?? null;
  while (current) {
    if (current instanceof HTMLElement && current.tagName === LIST_TAG_LI) {
      return true;
    }
    current = current.parentNode;
  }
  return false;
};

export const applyFormat = (format: ToolbarOption): boolean => {
  switch (format) {
    case 'bold':
      return execCommand('bold');
    case 'italic':
      return execCommand('italic');
    case 'underline':
      return execCommand('underline');
    case 'strikethrough':
      return execCommand('strikeThrough');
    case 'heading1':
      return execCommand('formatBlock', 'h1');
    case 'heading2':
      return execCommand('formatBlock', 'h2');
    case 'heading3':
      return execCommand('formatBlock', 'h3');
    case 'bulletList':
      return execCommand(COMMAND_UNORDERED_LIST);
    case 'orderedList':
      return execCommand(COMMAND_ORDERED_LIST);
    case 'superscript':
      return execCommand(COMMAND_SUPERSCRIPT);
    case 'subscript':
      return execCommand(COMMAND_SUBSCRIPT);
    case 'clearFormat':
      return clearFormatDeep();
    default:
      return false;
  }
};
