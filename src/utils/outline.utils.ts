import {
  EMPTY_STRING,
  INK_ATTR_TITLE,
  INK_OUTLINE_HEADING_SELECTOR,
  NUMBER_ONE,
  NUMBER_THREE,
  NUMBER_TWO,
  NUMBER_ZERO,
} from '../constants';
import type { OutlineItem } from '../types';

const OUTLINE_NODE_SELECTOR = `${INK_OUTLINE_HEADING_SELECTOR}, [${INK_ATTR_TITLE}]`;

const HEADING_LEVEL_FROM_TAG: Record<string, OutlineItem['level']> = {
  H1: NUMBER_ONE,
  H2: NUMBER_TWO,
  H3: NUMBER_THREE,
};

const outlineLevel = (node: HTMLElement): OutlineItem['level'] | null => {
  if (node.hasAttribute(INK_ATTR_TITLE)) return NUMBER_ONE;
  return HEADING_LEVEL_FROM_TAG[node.tagName] ?? null;
};

export const collectOutlineItems = (root: HTMLElement | null): OutlineItem[] => {
  if (!root) return [];
  const nodes = root.querySelectorAll(OUTLINE_NODE_SELECTOR);
  const items: OutlineItem[] = [];
  nodes.forEach((node, index) => {
    if (!(node instanceof HTMLElement)) return;
    const level = outlineLevel(node);
    if (!level) return;
    const text = (node.textContent ?? EMPTY_STRING).trim();
    if (!text) return;
    items.push({ index, level, text });
  });
  return items;
};

export const scrollOutlineHeading = (root: HTMLElement, index: number): void => {
  const nodes = root.querySelectorAll(OUTLINE_NODE_SELECTOR);
  const target = nodes.item(index);
  if (!(target instanceof HTMLElement)) return;
  target.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

export const getCaretLineCol = (
  root: HTMLElement | null,
): { line: number; col: number } => {
  if (!root) return { line: NUMBER_ONE, col: NUMBER_ONE };
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === NUMBER_ZERO) {
    return { line: NUMBER_ONE, col: NUMBER_ONE };
  }
  const range = selection.getRangeAt(NUMBER_ZERO);
  if (!root.contains(range.startContainer)) {
    return { line: NUMBER_ONE, col: NUMBER_ONE };
  }
  const headings = root.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre');
  let line = NUMBER_ONE;
  let found = false;
  headings.forEach((node, index) => {
    if (found || !(node instanceof HTMLElement)) return;
    if (node.contains(range.startContainer) || node === range.startContainer) {
      line = index + NUMBER_ONE;
      found = true;
    }
  });
  const block = found
    ? headings.item(line - NUMBER_ONE)
    : null;
  if (!(block instanceof HTMLElement)) {
    return { line, col: NUMBER_ONE };
  }
  const pre = range.cloneRange();
  pre.selectNodeContents(block);
  pre.setEnd(range.startContainer, range.startOffset);
  return { line, col: pre.toString().length + NUMBER_ONE };
};
