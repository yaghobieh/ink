import { describe, expect, it } from 'vitest';
import {
  CONTEXT_MENU_EDGE_PADDING_PX,
  CONTEXT_MENU_ESTIMATED_HEIGHT_PX,
  CONTEXT_MENU_ESTIMATED_WIDTH_PX,
} from './ContextMenu.const';
import { clampContextMenuPosition } from './ContextMenu.utils';

describe('clampContextMenuPosition', () => {
  it('keeps an in-bounds position', () => {
    const position = clampContextMenuPosition({
      x: 120,
      y: 80,
      menuWidth: CONTEXT_MENU_ESTIMATED_WIDTH_PX,
      menuHeight: CONTEXT_MENU_ESTIMATED_HEIGHT_PX,
      viewport: { width: 1000, height: 800 },
      edgePadding: CONTEXT_MENU_EDGE_PADDING_PX,
    });

    expect(position.x).toBe(120);
    expect(position.y).toBe(80);
  });

  it('clamps near the top-left edge', () => {
    const position = clampContextMenuPosition({
      x: 0,
      y: 0,
      menuWidth: CONTEXT_MENU_ESTIMATED_WIDTH_PX,
      menuHeight: CONTEXT_MENU_ESTIMATED_HEIGHT_PX,
      viewport: { width: 1000, height: 800 },
      edgePadding: CONTEXT_MENU_EDGE_PADDING_PX,
    });

    expect(position.x).toBe(CONTEXT_MENU_EDGE_PADDING_PX);
    expect(position.y).toBe(CONTEXT_MENU_EDGE_PADDING_PX);
  });

  it('clamps near the bottom-right edge', () => {
    const position = clampContextMenuPosition({
      x: 980,
      y: 780,
      menuWidth: CONTEXT_MENU_ESTIMATED_WIDTH_PX,
      menuHeight: CONTEXT_MENU_ESTIMATED_HEIGHT_PX,
      viewport: { width: 320, height: 600 },
      edgePadding: CONTEXT_MENU_EDGE_PADDING_PX,
    });

    expect(position.x).toBe(
      320 - CONTEXT_MENU_ESTIMATED_WIDTH_PX - CONTEXT_MENU_EDGE_PADDING_PX,
    );
    expect(position.y).toBe(
      600 - CONTEXT_MENU_ESTIMATED_HEIGHT_PX - CONTEXT_MENU_EDGE_PADDING_PX,
    );
  });
});
