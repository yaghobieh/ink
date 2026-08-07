import { NUMBER_ZERO } from '@/constants/numbers';
import type {
  ClampContextMenuPositionInput,
  ContextMenuPosition,
} from './ContextMenu.types';

export const clampContextMenuPosition = (
  input: ClampContextMenuPositionInput,
): ContextMenuPosition => {
  const { x, y, menuWidth, menuHeight, viewport, edgePadding } = input;
  const maxX = Math.max(edgePadding, viewport.width - menuWidth - edgePadding);
  const maxY = Math.max(edgePadding, viewport.height - menuHeight - edgePadding);
  const nextX = Math.min(Math.max(x, edgePadding), maxX);
  const nextY = Math.min(Math.max(y, edgePadding), maxY);

  return {
    x: Number.isFinite(nextX) ? nextX : NUMBER_ZERO,
    y: Number.isFinite(nextY) ? nextY : NUMBER_ZERO,
  };
};
