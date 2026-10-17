import { INK_CLASS_COMMENT_MARK, INK_COMMENT_HIGHLIGHT_COLOR } from '../constants';
import type { InkCommentThread } from '../types';
import { createInkId } from './id.utils';

export const createCommentThread = (
  author: string,
  body: string,
  highlightId: string,
): InkCommentThread => ({
  id: createInkId('cmt'),
  author,
  body,
  timestamp: Date.now(),
  highlightId,
  replies: [],
});

export const wrapSelectionAsComment = (highlightId: string): boolean => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return false;
  const range = selection.getRangeAt(0);
  const mark = document.createElement('mark');
  mark.className = INK_CLASS_COMMENT_MARK;
  mark.dataset.inkComment = highlightId;
  mark.style.backgroundColor = INK_COMMENT_HIGHLIGHT_COLOR;
  try {
    range.surroundContents(mark);
    selection.removeAllRanges();
    return true;
  } catch {
    const fragment = range.extractContents();
    mark.appendChild(fragment);
    range.insertNode(mark);
    selection.removeAllRanges();
    return true;
  }
};

export const COMMENT_RESOLVED_CLASS = 'Ink-comment-mark--resolved';

export const findCommentMark = (root: ParentNode, highlightId: string): HTMLElement | null => {
  const mark = root.querySelector(`mark[data-ink-comment="${highlightId}"]`);
  return mark instanceof HTMLElement ? mark : null;
};

export const scrollToComment = (root: ParentNode, highlightId: string): boolean => {
  const mark = findCommentMark(root, highlightId);
  if (!mark) return false;
  mark.scrollIntoView({ block: 'center' });
  return true;
};

export const setCommentResolvedMark = (
  root: ParentNode,
  highlightId: string,
  resolved: boolean,
): boolean => {
  const mark = findCommentMark(root, highlightId);
  if (!mark) return false;
  mark.classList.toggle(COMMENT_RESOLVED_CLASS, resolved);
  return true;
};

export const removeCommentMark = (html: string, highlightId: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return html;
  root.querySelectorAll(`mark[data-ink-comment="${highlightId}"]`).forEach((node) => {
    node.replaceWith(...Array.from(node.childNodes));
  });
  return root.innerHTML;
};
