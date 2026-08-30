import { Fragment, useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
import { createPortal } from 'react-dom';
import {
  COLOR_MODE_LIGHT,
  EXCEL_COL_LETTERS,
  INK_CLASS_EXCEL_ACTIONS,
  INK_CLASS_EXCEL_CELL,
  INK_CLASS_EXCEL_COL_HOVER,
  INK_CLASS_EXCEL_CORNER,
  INK_CLASS_EXCEL_GRID,
  INK_CLASS_EXCEL_HEAD,
  INK_CLASS_EXCEL_INSERT,
  INK_CLASS_EXCEL_PANEL,
  INK_CLASS_EXCEL_ROW_HOVER,
  INK_CLASS_EXCEL_TITLE,
  INK_CLASS_STYLE_DD,
  INK_CLASS_STYLE_MENU,
  INK_CLASS_STYLE_MENU_FORCED,
  INK_CLASS_STYLE_MENU_PORTAL,
  INK_EXCEL_ADD_COL,
  INK_EXCEL_ADD_ROW,
  INK_EXCEL_CLEAR,
  INK_EXCEL_IMPORT,
  INK_EXCEL_INSERT,
  INK_EXCEL_MENU_ESTIMATED_HEIGHT_PX,
  INK_EXCEL_REMOVE_COL,
  INK_EXCEL_REMOVE_ROW,
  INK_EXCEL_SHEET_MAX_COLS,
  INK_EXCEL_SHEET_MAX_ROWS,
  INK_EXCEL_TITLE,
  KEY_ESCAPE,
  NUMBER_ONE,
  NUMBER_ZERO,
} from '../../../../constants';
import {
  CSV_ACCEPT,
  addExcelCol,
  addExcelRow,
  clearExcelGrid,
  createEmptyExcelGrid,
  excelGridToTableHtml,
  parseCsvText,
  removeExcelCol,
  removeExcelRow,
  setExcelCell,
} from '../../../../plugins/excel';
import { getToolbarDropdownMenuPosition } from '../ToolbarDropdown/ToolbarDropdown.utils';
import { ToolbarButton } from '../ToolbarButton';
import type { ExcelSheetPanelProps } from './ExcelSheetPanel.types';

export const ExcelSheetPanel: FC<ExcelSheetPanelProps> = (props) => {
  const { icon, disabled = false, hint, onHint, pluginColor, onInsert } = props;
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(createEmptyExcelGrid);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: NUMBER_ZERO, left: NUMBER_ZERO });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const colCount = grid[NUMBER_ZERO]?.length ?? NUMBER_ONE;
  const canAddRow = grid.length < INK_EXCEL_SHEET_MAX_ROWS;
  const canAddCol = colCount < INK_EXCEL_SHEET_MAX_COLS;
  const canRemoveRow = grid.length > NUMBER_ONE;
  const canRemoveCol = colCount > NUMBER_ONE;

  useEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const measured = menuRef.current?.getBoundingClientRect().height;
      const next = getToolbarDropdownMenuPosition(
        triggerRef.current,
        measured && measured > NUMBER_ZERO ? measured : INK_EXCEL_MENU_ESTIMATED_HEIGHT_PX,
      );
      setMenuPosition({ top: next.top, left: next.left });
    };
    place();
    const frame = window.requestAnimationFrame(place);
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
      window.cancelAnimationFrame(frame);
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, grid.length, colCount]);

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[NUMBER_ZERO];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setGrid(parseCsvText(String(reader.result)));
    };
    reader.readAsText(file);
  };

  return (
    <div className={INK_CLASS_STYLE_DD} ref={rootRef}>
      <div ref={triggerRef}>
        <ToolbarButton
          icon={icon}
          title={INK_EXCEL_TITLE}
          hint={hint}
          onHint={onHint}
          pluginColor={pluginColor}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setGrid(createEmptyExcelGrid());
            setOpen((current) => !current);
          }}
        />
      </div>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              className={`${INK_CLASS_STYLE_MENU} ${INK_CLASS_STYLE_MENU_PORTAL} ${INK_CLASS_STYLE_MENU_FORCED} ${INK_CLASS_EXCEL_PANEL}`}
              data-color-mode={COLOR_MODE_LIGHT}
              role="dialog"
              aria-label={INK_EXCEL_TITLE}
              style={{ top: menuPosition.top, left: menuPosition.left }}
            >
              <div className={INK_CLASS_EXCEL_TITLE}>{INK_EXCEL_TITLE}</div>
              <div
                className={INK_CLASS_EXCEL_GRID}
                style={{
                  gridTemplateColumns: `2rem repeat(${colCount}, minmax(0, 1fr))`,
                }}
                onMouseLeave={() => {
                  setHoverCol(null);
                  setHoverRow(null);
                }}
              >
                <span className={INK_CLASS_EXCEL_CORNER} />
                {(grid[NUMBER_ZERO] ?? []).map((_, colIndex) => (
                  <span
                    key={`h-${colIndex}`}
                    className={`${INK_CLASS_EXCEL_HEAD}${hoverCol === colIndex ? ` ${INK_CLASS_EXCEL_COL_HOVER}` : ''}`}
                    onMouseEnter={() => setHoverCol(colIndex)}
                  >
                    {EXCEL_COL_LETTERS[colIndex] ?? colIndex + NUMBER_ONE}
                  </span>
                ))}
                {grid.map((row, rowIndex) => (
                  <Fragment key={`row-${rowIndex}`}>
                    <span
                      className={`${INK_CLASS_EXCEL_HEAD}${hoverRow === rowIndex ? ` ${INK_CLASS_EXCEL_ROW_HOVER}` : ''}`}
                      onMouseEnter={() => setHoverRow(rowIndex)}
                    >
                      {rowIndex + NUMBER_ONE}
                    </span>
                    {row.map((cell, colIndex) => (
                      <input
                        key={`${rowIndex}-${colIndex}`}
                        className={`${INK_CLASS_EXCEL_CELL}${hoverCol === colIndex ? ` ${INK_CLASS_EXCEL_COL_HOVER}` : ''}${hoverRow === rowIndex ? ` ${INK_CLASS_EXCEL_ROW_HOVER}` : ''}`}
                        value={cell}
                        onMouseEnter={() => {
                          setHoverCol(colIndex);
                          setHoverRow(rowIndex);
                        }}
                        onChange={(event) =>
                          setGrid(setExcelCell(grid, rowIndex, colIndex, event.target.value))
                        }
                      />
                    ))}
                  </Fragment>
                ))}
              </div>
              <div className={INK_CLASS_EXCEL_ACTIONS}>
                <button
                  type="button"
                  disabled={!canAddRow}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setGrid(addExcelRow(grid));
                  }}
                >
                  {INK_EXCEL_ADD_ROW}
                </button>
                <button
                  type="button"
                  disabled={!canAddCol}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setGrid(addExcelCol(grid));
                  }}
                >
                  {INK_EXCEL_ADD_COL}
                </button>
                <button
                  type="button"
                  disabled={!canRemoveRow}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setGrid(removeExcelRow(grid));
                  }}
                >
                  {INK_EXCEL_REMOVE_ROW}
                </button>
                <button
                  type="button"
                  disabled={!canRemoveCol}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setGrid(removeExcelCol(grid));
                  }}
                >
                  {INK_EXCEL_REMOVE_COL}
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setGrid(clearExcelGrid(grid));
                  }}
                >
                  {INK_EXCEL_CLEAR}
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    fileRef.current?.click();
                  }}
                >
                  {INK_EXCEL_IMPORT}
                </button>
                <button
                  type="button"
                  className={INK_CLASS_EXCEL_INSERT}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onInsert(excelGridToTableHtml(grid));
                    setOpen(false);
                  }}
                >
                  {INK_EXCEL_INSERT}
                </button>
              </div>
              <input ref={fileRef} type="file" accept={CSV_ACCEPT} hidden onChange={onFile} />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
