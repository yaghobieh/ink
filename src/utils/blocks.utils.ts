import {
  BLOCK_DROP_POSITION_AFTER,
  BLOCK_DROP_POSITION_BEFORE,
  BLOCK_MIDPOINT_DIVISOR,
  INK_CLASS_BLOCK_ACTIVE,
  INK_CLASS_BLOCK_DRAGGING,
  INK_CLASS_BLOCK_DROP_AFTER,
  INK_CLASS_BLOCK_DROP_BEFORE,
} from '../constants';

const BLOCK_TAGS = new Set([
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'BLOCKQUOTE',
  'PRE',
  'TABLE',
  'DIV',
]);

export type BlockDropPosition =
  | typeof BLOCK_DROP_POSITION_BEFORE
  | typeof BLOCK_DROP_POSITION_AFTER;

export const getBlockElement = (node: Node | null, root: HTMLElement): HTMLElement | null => {
  let current: Node | null = node;
  while (current && current !== root) {
    if (current instanceof HTMLElement && BLOCK_TAGS.has(current.tagName) && current.parentElement === root) {
      return current;
    }
    current = current.parentNode;
  }
  return null;
};

export const moveBlock = (block: HTMLElement, direction: 'up' | 'down'): boolean => {
  const parent = block.parentElement;
  if (!parent) return false;
  if (direction === 'up') {
    const previous = block.previousElementSibling;
    if (!previous) return false;
    parent.insertBefore(block, previous);
    return true;
  }
  const next = block.nextElementSibling;
  if (!next) return false;
  parent.insertBefore(next, block);
  return true;
};

export const reorderBlockBefore = (block: HTMLElement, target: HTMLElement): boolean => {
  const parent = block.parentElement;
  if (!parent || block === target) return false;
  if (target.parentElement !== parent) return false;
  parent.insertBefore(block, target);
  return true;
};

export const reorderBlockAfter = (block: HTMLElement, target: HTMLElement): boolean => {
  const parent = block.parentElement;
  if (!parent || block === target) return false;
  if (target.parentElement !== parent) return false;
  const next = target.nextElementSibling;
  if (next === block) return true;
  if (next) {
    parent.insertBefore(block, next);
  } else {
    parent.appendChild(block);
  }
  return true;
};

export const resolveDropPosition = (
  clientY: number,
  target: HTMLElement,
): BlockDropPosition => {
  const rect = target.getBoundingClientRect();
  const midpoint = rect.top + rect.height / BLOCK_MIDPOINT_DIVISOR;
  return clientY < midpoint ? BLOCK_DROP_POSITION_BEFORE : BLOCK_DROP_POSITION_AFTER;
};

export const clearBlockDragClasses = (root: HTMLElement): void => {
  root
    .querySelectorAll(
      `.${INK_CLASS_BLOCK_DRAGGING}, .${INK_CLASS_BLOCK_DROP_BEFORE}, .${INK_CLASS_BLOCK_DROP_AFTER}`,
    )
    .forEach((element) => {
      element.classList.remove(
        INK_CLASS_BLOCK_DRAGGING,
        INK_CLASS_BLOCK_DROP_BEFORE,
        INK_CLASS_BLOCK_DROP_AFTER,
      );
    });
};

export const markDraggingBlock = (block: HTMLElement | null): void => {
  if (!block) return;
  block.classList.add(INK_CLASS_BLOCK_DRAGGING);
};

export const markDropTarget = (
  root: HTMLElement,
  target: HTMLElement | null,
  position: BlockDropPosition | null,
): void => {
  root
    .querySelectorAll(`.${INK_CLASS_BLOCK_DROP_BEFORE}, .${INK_CLASS_BLOCK_DROP_AFTER}`)
    .forEach((element) => {
      element.classList.remove(INK_CLASS_BLOCK_DROP_BEFORE, INK_CLASS_BLOCK_DROP_AFTER);
    });
  if (!target || !position) return;
  target.classList.add(
    position === BLOCK_DROP_POSITION_BEFORE
      ? INK_CLASS_BLOCK_DROP_BEFORE
      : INK_CLASS_BLOCK_DROP_AFTER,
  );
};

export const markActiveBlock = (root: HTMLElement, block: HTMLElement | null): void => {
  root.querySelectorAll(`.${INK_CLASS_BLOCK_ACTIVE}`).forEach((element) => {
    element.classList.remove(INK_CLASS_BLOCK_ACTIVE);
  });
  block?.classList.add(INK_CLASS_BLOCK_ACTIVE);
};
