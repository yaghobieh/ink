import {
  INK_DEFAULT_TABLE_COLS,
  INK_DEFAULT_TABLE_ROWS,
  INK_TABLE_MAX_COLS,
  INK_TABLE_MAX_ROWS,
  INK_TABLE_MIN_COLS,
  INK_TABLE_MIN_ROWS,
} from '../constants';
import { EMPTY_STRING } from '../constants/generals.const';
import {
  TABLE_CELL_SELECTOR,
  TABLE_CELL_TAG_TD,
  TABLE_CELL_TAG_TH,
  TABLE_CLASS_NAME,
  TABLE_ROW_TAG,
  TABLE_SECTION_THEAD,
  TABLE_TAG,
} from '../constants/table.const';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const createCell = (tagName: string): HTMLTableCellElement => {
  const cell = document.createElement(tagName) as HTMLTableCellElement;
  cell.contentEditable = 'true';
  cell.innerHTML = '<br>';
  return cell;
};

const getCellIndex = (cell: HTMLTableCellElement): number => {
  const row = cell.parentElement as HTMLTableRowElement | null;
  if (!row) return 0;
  return Array.from(row.cells).indexOf(cell);
};

export const buildTableHtml = (
  rows = INK_DEFAULT_TABLE_ROWS,
  cols = INK_DEFAULT_TABLE_COLS,
): string => {
  const safeRows = clamp(rows, INK_TABLE_MIN_ROWS, INK_TABLE_MAX_ROWS);
  const safeCols = clamp(cols, INK_TABLE_MIN_COLS, INK_TABLE_MAX_COLS);
  const headerCells = Array.from({ length: safeCols }, (_, index) =>
    `<th contenteditable="true">Header ${index + 1}</th>`,
  ).join(EMPTY_STRING);
  const bodyRows = Array.from({ length: Math.max(0, safeRows - 1) }, () => {
    const cells = Array.from(
      { length: safeCols },
      () => '<td contenteditable="true"><br></td>',
    ).join(EMPTY_STRING);
    return `<tr>${cells}</tr>`;
  }).join(EMPTY_STRING);
  return `<table class="${TABLE_CLASS_NAME}"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><p><br></p>`;
};

export const getTableCellFromSelection = (): HTMLTableCellElement | null => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  let node: Node | null = selection.anchorNode;
  if (node && node.nodeType === Node.TEXT_NODE) {
    node = node.parentElement;
  }
  if (!(node instanceof Element)) return null;
  return node.closest(TABLE_CELL_SELECTOR) as HTMLTableCellElement | null;
};

export const insertTableRow = (
  cell: HTMLTableCellElement,
  position: 'before' | 'after',
): boolean => {
  const row = cell.closest(TABLE_ROW_TAG) as HTMLTableRowElement | null;
  const table = cell.closest(TABLE_TAG) as HTMLTableElement | null;
  if (!row || !table) return false;
  const colCount = row.cells.length;
  if (table.rows.length >= INK_TABLE_MAX_ROWS) return false;
  const inHead = Boolean(row.closest(TABLE_SECTION_THEAD));
  const tagName = inHead ? TABLE_CELL_TAG_TH : TABLE_CELL_TAG_TD;
  const nextRow = document.createElement(TABLE_ROW_TAG) as HTMLTableRowElement;
  for (let index = 0; index < colCount; index += 1) {
    nextRow.appendChild(createCell(tagName));
  }
  if (position === 'before') {
    row.parentElement?.insertBefore(nextRow, row);
  } else {
    row.parentElement?.insertBefore(nextRow, row.nextSibling);
  }
  return true;
};

export const insertTableColumn = (
  cell: HTMLTableCellElement,
  position: 'before' | 'after',
): boolean => {
  const table = cell.closest(TABLE_TAG) as HTMLTableElement | null;
  if (!table) return false;
  const columnIndex = getCellIndex(cell);
  if (columnIndex < 0) return false;
  const sampleRow = table.rows[0];
  if (!sampleRow) return false;
  if (sampleRow.cells.length >= INK_TABLE_MAX_COLS) return false;
  const insertAt = position === 'before' ? columnIndex : columnIndex + 1;
  Array.from(table.rows).forEach((row) => {
    const reference = row.cells[insertAt] ?? null;
    const tagName = row.closest(TABLE_SECTION_THEAD)
      ? TABLE_CELL_TAG_TH
      : TABLE_CELL_TAG_TD;
    const nextCell = createCell(tagName);
    if (reference) {
      row.insertBefore(nextCell, reference);
    } else {
      row.appendChild(nextCell);
    }
  });
  return true;
};

export const deleteTableRow = (cell: HTMLTableCellElement): boolean => {
  const row = cell.closest(TABLE_ROW_TAG) as HTMLTableRowElement | null;
  const table = cell.closest(TABLE_TAG) as HTMLTableElement | null;
  if (!row || !table) return false;
  if (table.rows.length <= INK_TABLE_MIN_ROWS) return false;
  row.remove();
  return true;
};

export const deleteTableColumn = (cell: HTMLTableCellElement): boolean => {
  const table = cell.closest(TABLE_TAG) as HTMLTableElement | null;
  if (!table) return false;
  const columnIndex = getCellIndex(cell);
  if (columnIndex < 0) return false;
  const sampleRow = table.rows[0];
  if (!sampleRow || sampleRow.cells.length <= INK_TABLE_MIN_COLS) return false;
  Array.from(table.rows).forEach((row) => {
    const target = row.cells[columnIndex];
    if (target) target.remove();
  });
  return true;
};
