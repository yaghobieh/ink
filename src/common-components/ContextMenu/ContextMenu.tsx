import { useEffect, useRef, type FC, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  CONTEXT_MENU_CLASS,
  CONTEXT_MENU_EDGE_PADDING_PX,
  CONTEXT_MENU_ESTIMATED_HEIGHT_PX,
  CONTEXT_MENU_ESTIMATED_WIDTH_PX,
  CONTEXT_MENU_EVENT_KEY_DOWN,
  CONTEXT_MENU_EVENT_POINTER_DOWN,
  CONTEXT_MENU_ITEM_CLASS,
  CONTEXT_MENU_ITEM_ROLE,
  CONTEXT_MENU_KEY_ESCAPE,
  CONTEXT_MENU_ROLE,
} from './ContextMenu.const';
import type { ContextMenuProps } from './ContextMenu.types';
import { clampContextMenuPosition } from './ContextMenu.utils';
import { cn } from '@utils';

export const ContextMenu: FC<ContextMenuProps> = (props) => {
  const { open, x, y, items, onClose } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        onClose();
        return;
      }
      if (rootRef.current?.contains(target)) return;
      onClose();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === CONTEXT_MENU_KEY_ESCAPE) onClose();
    };
    window.addEventListener(CONTEXT_MENU_EVENT_POINTER_DOWN, handlePointer);
    window.addEventListener(CONTEXT_MENU_EVENT_KEY_DOWN, handleKey);
    return () => {
      window.removeEventListener(CONTEXT_MENU_EVENT_POINTER_DOWN, handlePointer);
      window.removeEventListener(CONTEXT_MENU_EVENT_KEY_DOWN, handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const position = clampContextMenuPosition({
    x,
    y,
    menuWidth: CONTEXT_MENU_ESTIMATED_WIDTH_PX,
    menuHeight: CONTEXT_MENU_ESTIMATED_HEIGHT_PX,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    edgePadding: CONTEXT_MENU_EDGE_PADDING_PX,
  });

  const stop = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      ref={rootRef}
      className={CONTEXT_MENU_CLASS}
      role={CONTEXT_MENU_ROLE}
      style={{ left: position.x, top: position.y }}
      onPointerDown={stop}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role={CONTEXT_MENU_ITEM_ROLE}
          className={cn(CONTEXT_MENU_ITEM_CLASS)}
          disabled={item.disabled}
          onClick={() => {
            item.onSelect();
            onClose();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>,
    document.body,
  );
};
