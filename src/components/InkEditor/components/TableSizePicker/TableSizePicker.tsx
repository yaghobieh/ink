import { useEffect, useRef, useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import {
  COLOR_MODE_LIGHT,
  INK_CLASS_STYLE_MENU,
  INK_CLASS_STYLE_MENU_FORCED,
  INK_CLASS_STYLE_MENU_PORTAL,
  INK_CLASS_TABLE_PICKER,
  INK_CLASS_TABLE_PICKER_CELL,
  INK_CLASS_TABLE_PICKER_CELL_ON,
  INK_CLASS_TABLE_PICKER_GRID,
  INK_CLASS_TABLE_PICKER_LABEL,
  INK_TABLE_INSERT_TITLE,
  INK_TABLE_PICKER_MAX,
  KEY_ESCAPE,
  NUMBER_ONE,
  SPACE_STRING,
} from '../../../../constants';
import { getToolbarDropdownMenuPosition } from '../ToolbarDropdown/ToolbarDropdown.utils';
import { ToolbarButton } from '../ToolbarButton';
import {
  TABLE_PICKER_EMPTY_POSITION,
  TABLE_PICKER_INITIAL_HOVER,
  TABLE_PICKER_TIMES_MARK,
} from './TableSizePicker.const';
import type { TableSizePickerProps } from './TableSizePicker.types';

export const TableSizePicker: FC<TableSizePickerProps> = (props) => {
  const { icon, disabled = false, onSelect } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(TABLE_PICKER_INITIAL_HOVER);
  const [menuPosition, setMenuPosition] = useState(TABLE_PICKER_EMPTY_POSITION);
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

  const cells = Array.from({ length: INK_TABLE_PICKER_MAX * INK_TABLE_PICKER_MAX }, (_, index) => {
    const rows = Math.floor(index / INK_TABLE_PICKER_MAX) + NUMBER_ONE;
    const cols = (index % INK_TABLE_PICKER_MAX) + NUMBER_ONE;
    const isOn = rows <= hover.rows && cols <= hover.cols;
    return { rows, cols, isOn, key: `${rows}-${cols}` };
  });

  return (
    <div className={INK_CLASS_TABLE_PICKER} ref={rootRef}>
      <div ref={triggerRef}>
        <ToolbarButton
          icon={icon}
          title={INK_TABLE_INSERT_TITLE}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setHover(TABLE_PICKER_INITIAL_HOVER);
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
              role="grid"
              aria-label={INK_TABLE_INSERT_TITLE}
              style={{ top: menuPosition.top, left: menuPosition.left }}
            >
              <div
                className={INK_CLASS_TABLE_PICKER_GRID}
                style={{ gridTemplateColumns: `repeat(${INK_TABLE_PICKER_MAX}, 1fr)` }}
              >
                {cells.map((cell) => (
                  <button
                    key={cell.key}
                    type="button"
                    className={`${INK_CLASS_TABLE_PICKER_CELL}${cell.isOn ? `${SPACE_STRING}${INK_CLASS_TABLE_PICKER_CELL_ON}` : ''}`}
                    aria-label={`${cell.rows}${TABLE_PICKER_TIMES_MARK}${cell.cols}`}
                    onMouseEnter={() => setHover({ rows: cell.rows, cols: cell.cols })}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      onSelect(cell.rows, cell.cols);
                      setOpen(false);
                    }}
                  />
                ))}
              </div>
              <div className={INK_CLASS_TABLE_PICKER_LABEL}>
                {hover.rows}
                {TABLE_PICKER_TIMES_MARK}
                {hover.cols}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
