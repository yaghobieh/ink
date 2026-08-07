import { describe, expect, it } from 'vitest';
import {
  captureSelectionInRoot,
  restoreSelectionInRoot,
} from './selection.utils';
import { NUMBER_ZERO, NUMBER_ONE, NUMBER_TWO, NUMBER_FOUR } from '../constants';

describe('selection restore', () => {
  it('captures and restores a text caret path', () => {
    const root = document.createElement('div');
    root.innerHTML = '<p>Hello</p>';
    document.body.appendChild(root);
    const text = root.querySelector('p')?.firstChild;
    if (!text) throw new Error('missing text node');
    const range = document.createRange();
    range.setStart(text, NUMBER_ONE);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const saved = captureSelectionInRoot(root);
    root.innerHTML = '<p>Hello</p>';
    restoreSelectionInRoot(root, saved);

    const next = window.getSelection();
    expect(next?.rangeCount).toBeGreaterThan(NUMBER_ZERO);
    expect(next?.getRangeAt(NUMBER_ZERO).startOffset).toBe(NUMBER_ONE);
    expect(next?.getRangeAt(NUMBER_ZERO).startContainer.textContent).toBe('Hello');

    document.body.removeChild(root);
  });

  it('clamps offsets when text is shorter after restore', () => {
    const root = document.createElement('div');
    root.innerHTML = '<p>Hello</p>';
    document.body.appendChild(root);
    const text = root.querySelector('p')?.firstChild;
    if (!text) throw new Error('missing text node');
    const range = document.createRange();
    range.setStart(text, NUMBER_FOUR);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const saved = captureSelectionInRoot(root);
    root.innerHTML = '<p>Hi</p>';
    restoreSelectionInRoot(root, saved);

    const next = window.getSelection()?.getRangeAt(NUMBER_ZERO);
    expect(next?.startOffset).toBe(NUMBER_TWO);

    document.body.removeChild(root);
  });
});
