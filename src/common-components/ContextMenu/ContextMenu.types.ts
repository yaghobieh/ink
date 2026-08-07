import type { ReactNode } from 'react';

export type ContextMenuItem = {
  id: string;
  label: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
};

export type ContextMenuProps = {
  open: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface ContextMenuViewportBounds {
  width: number;
  height: number;
}

export interface ClampContextMenuPositionInput {
  x: number;
  y: number;
  menuWidth: number;
  menuHeight: number;
  viewport: ContextMenuViewportBounds;
  edgePadding: number;
}
