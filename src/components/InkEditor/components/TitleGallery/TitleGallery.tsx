import { useEffect, useRef, useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import {
  COLOR_MODE_LIGHT,
  INK_CLASS_STYLE_MENU,
  INK_CLASS_STYLE_MENU_FORCED,
  INK_CLASS_STYLE_MENU_PORTAL,
  INK_CLASS_TITLE,
  INK_CLASS_TITLE_CELL,
  INK_CLASS_TITLE_GALLERY,
  INK_CLASS_TITLE_GRID,
  INK_TITLES_TITLE,
  KEY_ESCAPE,
  NUMBER_ZERO,
} from '../../../../constants';
import { TITLE_PREVIEW_TEXT, TITLE_STYLE_IDS } from '../../../../plugins/titles';
import { getToolbarDropdownMenuPosition } from '../ToolbarDropdown/ToolbarDropdown.utils';
import { ToolbarButton } from '../ToolbarButton';
import type { TitleGalleryProps } from './TitleGallery.types';

export const TitleGallery: FC<TitleGalleryProps> = (props) => {
  const { icon, disabled = false, hint, onHint, pluginColor, onSelect } = props;
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: NUMBER_ZERO, left: NUMBER_ZERO });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const next = getToolbarDropdownMenuPosition(triggerRef.current);
      setMenuPosition({ top: next.top, left: next.left });
    };
    place();
    const onPointer = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === KEY_ESCAPE) setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  return (
    <div className={INK_CLASS_TITLE_GALLERY} ref={rootRef}>
      <div ref={triggerRef}>
        <ToolbarButton
          icon={icon}
          title={INK_TITLES_TITLE}
          hint={hint}
          onHint={onHint}
          pluginColor={pluginColor}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((current) => !current);
          }}
        />
      </div>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              className={`${INK_CLASS_STYLE_MENU} ${INK_CLASS_STYLE_MENU_PORTAL} ${INK_CLASS_STYLE_MENU_FORCED}`}
              data-color-mode={COLOR_MODE_LIGHT}
              role="listbox"
              aria-label={INK_TITLES_TITLE}
              style={{ top: menuPosition.top, left: menuPosition.left }}
            >
              <div className={INK_CLASS_TITLE_GRID}>
                {TITLE_STYLE_IDS.map((styleId) => (
                  <button
                    key={styleId}
                    type="button"
                    className={INK_CLASS_TITLE_CELL}
                    aria-label={styleId}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      onSelect(styleId);
                      setOpen(false);
                    }}
                  >
                    <span className={`${INK_CLASS_TITLE} ${INK_CLASS_TITLE}--${styleId}`}>
                      {TITLE_PREVIEW_TEXT}
                    </span>
                  </button>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
