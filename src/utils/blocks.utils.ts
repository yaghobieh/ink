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

export const markActiveBlock = (root: HTMLElement, block: HTMLElement | null): void => {
  root.querySelectorAll('.Ink-block--active').forEach((element) => {
    element.classList.remove('Ink-block--active');
  });
  block?.classList.add('Ink-block--active');
};
