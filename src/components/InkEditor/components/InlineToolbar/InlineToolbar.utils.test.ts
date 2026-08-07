import { describe, expect, it } from 'vitest';
import {
  INLINE_TOOLBAR_EDGE_PADDING_PX,
  INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX,
  INLINE_TOOLBAR_ESTIMATED_WIDTH_PX,
  INLINE_TOOLBAR_GAP_PX,
} from './InlineToolbar.const';
import { clampInlineToolbarPosition, selectionIsInsideElement } from './InlineToolbar.utils';

describe('clampInlineToolbarPosition', () => {
  it('places the toolbar above a centered selection', () => {
    const position = clampInlineToolbarPosition({
      selectionRect: {
        top: 200,
        left: 400,
        width: 120,
        height: 20,
        bottom: 220,
      },
      toolbarWidth: INLINE_TOOLBAR_ESTIMATED_WIDTH_PX,
      toolbarHeight: INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX,
      viewport: { width: 1000, height: 800 },
      gap: INLINE_TOOLBAR_GAP_PX,
      edgePadding: INLINE_TOOLBAR_EDGE_PADDING_PX,
    });

    expect(position.top).toBe(
      200 - INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX - INLINE_TOOLBAR_GAP_PX,
    );
    expect(position.left).toBe(400 + 120 / 2 - INLINE_TOOLBAR_ESTIMATED_WIDTH_PX / 2);
  });

  it('flips below when there is no room above', () => {
    const position = clampInlineToolbarPosition({
      selectionRect: {
        top: 10,
        left: 100,
        width: 80,
        height: 18,
        bottom: 28,
      },
      toolbarWidth: INLINE_TOOLBAR_ESTIMATED_WIDTH_PX,
      toolbarHeight: INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX,
      viewport: { width: 1000, height: 800 },
      gap: INLINE_TOOLBAR_GAP_PX,
      edgePadding: INLINE_TOOLBAR_EDGE_PADDING_PX,
    });

    expect(position.top).toBe(28 + INLINE_TOOLBAR_GAP_PX);
  });

  it('clamps to the viewport edges', () => {
    const position = clampInlineToolbarPosition({
      selectionRect: {
        top: 200,
        left: 0,
        width: 40,
        height: 20,
        bottom: 220,
      },
      toolbarWidth: INLINE_TOOLBAR_ESTIMATED_WIDTH_PX,
      toolbarHeight: INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX,
      viewport: { width: 320, height: 600 },
      gap: INLINE_TOOLBAR_GAP_PX,
      edgePadding: INLINE_TOOLBAR_EDGE_PADDING_PX,
    });

    expect(position.left).toBe(INLINE_TOOLBAR_EDGE_PADDING_PX);
  });
});

describe('selectionIsInsideElement', () => {
  it('returns false for null selection or root', () => {
    expect(selectionIsInsideElement(null, null)).toBe(false);
  });
});
