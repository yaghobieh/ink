import type { ToolbarDropdownMenuPosition } from './ToolbarDropdown.types';
import {
  INK_STYLE_MENU_EDGE_PX,
  INK_STYLE_MENU_ESTIMATED_HEIGHT_PX,
  INK_STYLE_MENU_GAP_PX,
  INK_STYLE_MENU_MIN_WIDTH_PX,
  NUMBER_ZERO,
} from '../../../../constants';

export const getToolbarDropdownMenuPosition = (
  trigger: HTMLElement | null,
  estimatedHeight = INK_STYLE_MENU_ESTIMATED_HEIGHT_PX,
): ToolbarDropdownMenuPosition => {
  if (!trigger) {
    return { top: NUMBER_ZERO, left: NUMBER_ZERO, minWidth: INK_STYLE_MENU_MIN_WIDTH_PX };
  }
  const rect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const minWidth = Math.max(rect.width, INK_STYLE_MENU_MIN_WIDTH_PX);
  const maxLeft = Math.max(INK_STYLE_MENU_EDGE_PX, viewportWidth - minWidth - INK_STYLE_MENU_EDGE_PX);
  const left = Math.min(Math.max(rect.left, INK_STYLE_MENU_EDGE_PX), maxLeft);
  const menuHeight = estimatedHeight > NUMBER_ZERO ? estimatedHeight : INK_STYLE_MENU_ESTIMATED_HEIGHT_PX;
  const below = rect.bottom + INK_STYLE_MENU_GAP_PX;
  const above = rect.top - menuHeight - INK_STYLE_MENU_GAP_PX;
  const top =
    below + menuHeight > viewportHeight - INK_STYLE_MENU_EDGE_PX
      ? Math.max(INK_STYLE_MENU_EDGE_PX, above)
      : below;
  return { top, left, minWidth };
};
