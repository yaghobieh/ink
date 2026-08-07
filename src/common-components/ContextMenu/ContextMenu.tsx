import { useEffect, type FC, type MouseEvent } from 'react';
import {
  CONTEXT_MENU_CLASS,
  CONTEXT_MENU_ITEM_CLASS,
  CONTEXT_MENU_ITEM_ROLE,
  CONTEXT_MENU_ROLE,
} from './ContextMenu.const';
import type { ContextMenuProps } from './ContextMenu.types';
import { cn } from '@utils';

export const ContextMenu: FC<ContextMenuProps> = (props) => {
  const { open, x, y, items, onClose } = props;

  useEffect(() => {
    if (!open) return;
    const handlePointer = () => onClose();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('pointerdown', handlePointer);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const stop = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className={CONTEXT_MENU_CLASS}
      role={CONTEXT_MENU_ROLE}
      style={{ left: x, top: y }}
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
    </div>
  );
};
