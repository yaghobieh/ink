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
