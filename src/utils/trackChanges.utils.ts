import { INK_CLASS_TC_DELETE, INK_CLASS_TC_INSERT } from '../constants';
import type { InkTrackChange } from '../types';
import { createInkId } from './id.utils';

export const wrapInsertHtml = (html: string, changeId: string): string =>
  `<ins class="${INK_CLASS_TC_INSERT}" data-ink-tc="${changeId}">${html}</ins>`;

export const wrapDeleteHtml = (html: string, changeId: string): string =>
  `<del class="${INK_CLASS_TC_DELETE}" data-ink-tc="${changeId}">${html}</del>`;

export const createTrackChange = (
  type: InkTrackChange['type'],
  html: string,
  author: string,
): InkTrackChange => ({
  id: createInkId('tc'),
  type,
  html,
  author,
  timestamp: Date.now(),
});

export const acceptTrackChangeInHtml = (html: string, changeId: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return html;
  root.querySelectorAll(`[data-ink-tc="${changeId}"]`).forEach((node) => {
    if (node.tagName === 'INS') {
      node.replaceWith(...Array.from(node.childNodes));
      return;
    }
    if (node.tagName === 'DEL') {
      node.remove();
    }
  });
  return root.innerHTML;
};

export const rejectTrackChangeInHtml = (html: string, changeId: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return html;
  root.querySelectorAll(`[data-ink-tc="${changeId}"]`).forEach((node) => {
    if (node.tagName === 'INS') {
      node.remove();
      return;
    }
    if (node.tagName === 'DEL') {
      node.replaceWith(...Array.from(node.childNodes));
    }
  });
  return root.innerHTML;
};
