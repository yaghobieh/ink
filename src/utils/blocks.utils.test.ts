import { describe, expect, it } from 'vitest';
import {
  getBlockElement,
  reorderBlockAfter,
  reorderBlockBefore,
  resolveDropPosition,
} from './blocks.utils';
import {
  BLOCK_DROP_POSITION_AFTER,
  BLOCK_DROP_POSITION_BEFORE,
  INK_CLASS_CONTENT,
} from '../constants';

const createEditor = (): { root: HTMLElement; first: HTMLElement; second: HTMLElement; third: HTMLElement } => {
  const root = document.createElement('div');
  root.className = INK_CLASS_CONTENT;
  const first = document.createElement('p');
  first.textContent = 'one';
  const second = document.createElement('p');
  second.textContent = 'two';
  const third = document.createElement('p');
  third.textContent = 'three';
  root.append(first, second, third);
  document.body.appendChild(root);
  return { root, first, second, third };
};

describe('reorderBlockBefore', () => {
  it('moves a block before the target sibling', () => {
    const { root, first, second, third } = createEditor();
    expect(reorderBlockBefore(third, first)).toBe(true);
    expect(Array.from(root.children)).toEqual([third, first, second]);
    root.remove();
  });

  it('returns false when block equals target', () => {
    const { root, first } = createEditor();
    expect(reorderBlockBefore(first, first)).toBe(false);
    root.remove();
  });
});

describe('reorderBlockAfter', () => {
  it('moves a block after the target sibling', () => {
    const { root, first, second, third } = createEditor();
    expect(reorderBlockAfter(first, second)).toBe(true);
    expect(Array.from(root.children)).toEqual([second, first, third]);
    root.remove();
  });

  it('appends when target is the last child', () => {
    const { root, first, second, third } = createEditor();
    expect(reorderBlockAfter(first, third)).toBe(true);
    expect(Array.from(root.children)).toEqual([second, third, first]);
    root.remove();
  });
});

describe('resolveDropPosition', () => {
  it('returns before when pointer is above midpoint', () => {
    const target = document.createElement('p');
    target.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        height: 100,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 100,
        toJSON: () => ({}),
      }) as DOMRect;
    expect(resolveDropPosition(120, target)).toBe(BLOCK_DROP_POSITION_BEFORE);
  });

  it('returns after when pointer is below midpoint', () => {
    const target = document.createElement('p');
    target.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        height: 100,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 100,
        toJSON: () => ({}),
      }) as DOMRect;
    expect(resolveDropPosition(170, target)).toBe(BLOCK_DROP_POSITION_AFTER);
  });
});

describe('getBlockElement', () => {
  it('finds the top-level block under the editor root', () => {
    const { root, second } = createEditor();
    const span = document.createElement('span');
    second.appendChild(span);
    expect(getBlockElement(span, root)).toBe(second);
    root.remove();
  });
});
