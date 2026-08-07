import type { InlineToolbarFormatAction } from './InlineToolbar.types';
import {
  NUMBER_EIGHT,
  NUMBER_THIRTY_SIX,
  NUMBER_TWO_HUNDRED_FIFTY,
} from '@/constants/numbers';

export const INLINE_TOOLBAR_CLASS = 'Ink-InlineToolbar';
export const INLINE_TOOLBAR_ITEM_CLASS = 'Ink-InlineToolbar__item';
export const INLINE_TOOLBAR_DIVIDER_CLASS = 'Ink-InlineToolbar__divider';
export const INLINE_TOOLBAR_ROLE = 'toolbar';
export const INLINE_TOOLBAR_ARIA_LABEL = 'Inline formatting toolbar';

export const INLINE_TOOLBAR_GAP_PX = NUMBER_EIGHT;
export const INLINE_TOOLBAR_EDGE_PADDING_PX = NUMBER_EIGHT;
export const INLINE_TOOLBAR_ESTIMATED_WIDTH_PX = NUMBER_TWO_HUNDRED_FIFTY;
export const INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX = NUMBER_THIRTY_SIX;

export const INLINE_TOOLBAR_EVENT_POINTER_DOWN = 'pointerdown';
export const INLINE_TOOLBAR_EVENT_KEY_DOWN = 'keydown';
export const INLINE_TOOLBAR_KEY_ESCAPE = 'Escape';

export const INLINE_TOOLBAR_TITLE_BOLD = 'Bold';
export const INLINE_TOOLBAR_TITLE_ITALIC = 'Italic';
export const INLINE_TOOLBAR_TITLE_UNDERLINE = 'Underline';
export const INLINE_TOOLBAR_TITLE_CODE = 'Code';
export const INLINE_TOOLBAR_TITLE_LINK = 'Link';
export const INLINE_TOOLBAR_TITLE_CLEAR = 'Clear formatting';

export const INLINE_TOOLBAR_ACTION_BOLD = 'bold' as const satisfies InlineToolbarFormatAction;
export const INLINE_TOOLBAR_ACTION_ITALIC = 'italic' as const satisfies InlineToolbarFormatAction;
export const INLINE_TOOLBAR_ACTION_UNDERLINE =
  'underline' as const satisfies InlineToolbarFormatAction;
export const INLINE_TOOLBAR_ACTION_CODE = 'code' as const satisfies InlineToolbarFormatAction;
export const INLINE_TOOLBAR_ACTION_CLEAR =
  'clearFormat' as const satisfies InlineToolbarFormatAction;

export const INLINE_TOOLBAR_LINK_ID = 'link';
