import { NUMBER_TWO, NUMBER_ZERO } from '@/constants/numbers';
import type {
  ClampInlineToolbarPositionInput,
  InlineToolbarPosition,
} from './InlineToolbar.types';

export const clampInlineToolbarPosition = (
  input: ClampInlineToolbarPositionInput,
): InlineToolbarPosition => {
  const { selectionRect, toolbarWidth, toolbarHeight, viewport, gap, edgePadding } = input;
  const preferredTop = selectionRect.top - toolbarHeight - gap;
  const centeredLeft =
    selectionRect.left + selectionRect.width / NUMBER_TWO - toolbarWidth / NUMBER_TWO;

  const maxTop = Math.max(edgePadding, viewport.height - toolbarHeight - edgePadding);
  const maxLeft = Math.max(edgePadding, viewport.width - toolbarWidth - edgePadding);

  const top =
    preferredTop >= edgePadding
      ? Math.min(preferredTop, maxTop)
      : Math.min(selectionRect.bottom + gap, maxTop);

  const left = Math.min(Math.max(centeredLeft, edgePadding), maxLeft);

  return {
    top: Number.isFinite(top) ? top : NUMBER_ZERO,
    left: Number.isFinite(left) ? left : NUMBER_ZERO,
  };
};

export const selectionIsInsideElement = (
  selection: Selection | null,
  root: HTMLElement | null,
): boolean => {
  if (!selection || !root || selection.rangeCount === NUMBER_ZERO) return false;
  const anchor = selection.anchorNode;
  if (!anchor) return false;
  return root.contains(anchor);
};
