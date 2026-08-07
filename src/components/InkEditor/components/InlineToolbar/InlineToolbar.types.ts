import type { ReactNode } from 'react';
import type { ToolbarOption } from '../../../../types';

export type InlineToolbarFormatAction = Extract<
  ToolbarOption,
  'bold' | 'italic' | 'underline' | 'code' | 'clearFormat'
>;

export type InlineToolbarIcons = Record<
  InlineToolbarFormatAction | 'link',
  ReactNode
>;

export interface InlineToolbarPosition {
  top: number;
  left: number;
}

export interface InlineToolbarProps {
  open: boolean;
  top: number;
  left: number;
  icons: InlineToolbarIcons;
  activeFormats?: Set<string>;
  disabled?: boolean;
  onFormat: (action: InlineToolbarFormatAction) => void;
  onLink: () => void;
  onClose: () => void;
}

export interface InlineToolbarViewportBounds {
  width: number;
  height: number;
}

export interface ClampInlineToolbarPositionInput {
  selectionRect: DOMRect | Pick<DOMRect, 'top' | 'left' | 'width' | 'height' | 'bottom'>;
  toolbarWidth: number;
  toolbarHeight: number;
  viewport: InlineToolbarViewportBounds;
  gap: number;
  edgePadding: number;
}
