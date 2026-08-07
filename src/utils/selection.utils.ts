import { NUMBER_ZERO } from '../constants';

export interface SavedSelection {
  startPath: number[];
  startOffset: number;
  endPath: number[];
  endOffset: number;
}

const NODE_TYPE_TEXT = 3;

const getNodePath = (root: Node, node: Node): number[] => {
  const path: number[] = [];
  let current: Node | null = node;
  while (current && current !== root) {
    const parentNode: ParentNode | null = current.parentNode;
    if (!parentNode) return [];
    path.unshift(Array.from(parentNode.childNodes).indexOf(current as ChildNode));
    current = parentNode;
  }
  return path;
};

const getNodeFromPath = (root: Node, path: number[]): Node | null => {
  let current: Node = root;
  for (const index of path) {
    const next = current.childNodes[index];
    if (!next) return null;
    current = next;
  }
  return current;
};

const getMaxOffset = (node: Node): number => {
  if (node.nodeType === NODE_TYPE_TEXT) {
    return node.textContent?.length ?? NUMBER_ZERO;
  }
  return node.childNodes.length;
};

export const captureSelectionInRoot = (root: HTMLElement | null): SavedSelection | null => {
  if (!root) return null;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === NUMBER_ZERO) return null;
  const range = selection.getRangeAt(NUMBER_ZERO);
  if (!root.contains(range.commonAncestorContainer)) return null;
  return {
    startPath: getNodePath(root, range.startContainer),
    startOffset: range.startOffset,
    endPath: getNodePath(root, range.endContainer),
    endOffset: range.endOffset,
  };
};

export const restoreSelectionInRoot = (
  root: HTMLElement | null,
  saved: SavedSelection | null,
): void => {
  if (!root || !saved) return;
  const startNode = getNodeFromPath(root, saved.startPath);
  const endNode = getNodeFromPath(root, saved.endPath);
  if (!startNode || !endNode) return;
  const selection = window.getSelection();
  if (!selection) return;
  try {
    const range = document.createRange();
    const startOffset = Math.min(saved.startOffset, getMaxOffset(startNode));
    const endOffset = Math.min(saved.endOffset, getMaxOffset(endNode));
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    selection.removeAllRanges();
    selection.addRange(range);
  } catch {
    return;
  }
};

export const withPreservedSelection = (
  root: HTMLElement | null,
  mutate: () => void,
): void => {
  const focused = Boolean(root && document.activeElement === root);
  const saved = focused ? captureSelectionInRoot(root) : null;
  mutate();
  if (focused && saved) {
    restoreSelectionInRoot(root, saved);
  }
};
