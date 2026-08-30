import {
  INK_EXCEL_SHEET_COLS,
  INK_EXCEL_SHEET_MAX_COLS,
  INK_EXCEL_SHEET_MAX_ROWS,
  INK_EXCEL_SHEET_ROWS,
  NUMBER_ONE,
  NUMBER_ZERO,
  TABLE_CLASS_NAME,
} from '../../constants';
import { EMPTY_STRING, NEWLINE_STRING } from '../../constants/generals.const';

export type ExcelGrid = string[][];

export const createEmptyExcelGrid = (
  rows = INK_EXCEL_SHEET_ROWS,
  cols = INK_EXCEL_SHEET_COLS,
): ExcelGrid =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => EMPTY_STRING));

export const parseCsvText = (text: string): ExcelGrid => {
  const lines = text.split(/\r?\n/).filter((line) => line.length > NUMBER_ZERO);
  if (lines.length === NUMBER_ZERO) return createEmptyExcelGrid();
  return lines.map((line) => line.split(','));
};

export const excelGridToTableHtml = (grid: ExcelGrid): string => {
  const rows = grid.length > NUMBER_ZERO ? grid : createEmptyExcelGrid();
  const colCount = Math.max(...rows.map((row) => row.length), INK_EXCEL_SHEET_COLS);
  const header = rows[NUMBER_ZERO] ?? [];
  const headerCells = Array.from({ length: colCount }, (_, index) => {
    const value = header[index] ?? EMPTY_STRING;
    return `<th contenteditable="true">${value}</th>`;
  }).join(EMPTY_STRING);
  const body = rows
    .slice(NUMBER_ONE)
    .map((row) => {
      const cells = Array.from({ length: colCount }, (_, index) => {
        const value = row[index] ?? EMPTY_STRING;
        return `<td contenteditable="true">${value || '<br>'}</td>`;
      }).join(EMPTY_STRING);
      return `<tr>${cells}</tr>`;
    })
    .join(EMPTY_STRING);
  return `<table class="${TABLE_CLASS_NAME}"><thead><tr>${headerCells}</tr></thead><tbody>${body}</tbody></table><p><br></p>`;
};

export const setExcelCell = (grid: ExcelGrid, row: number, col: number, value: string): ExcelGrid =>
  grid.map((current, rowIndex) =>
    rowIndex === row
      ? current.map((cell, colIndex) => (colIndex === col ? value : cell))
      : current,
  );

export const addExcelRow = (grid: ExcelGrid): ExcelGrid => {
  if (grid.length >= INK_EXCEL_SHEET_MAX_ROWS) return grid;
  const cols = grid[NUMBER_ZERO]?.length ?? INK_EXCEL_SHEET_COLS;
  return [...grid, Array.from({ length: cols }, () => EMPTY_STRING)];
};

export const addExcelCol = (grid: ExcelGrid): ExcelGrid => {
  const cols = grid[NUMBER_ZERO]?.length ?? INK_EXCEL_SHEET_COLS;
  if (cols >= INK_EXCEL_SHEET_MAX_COLS) return grid;
  return grid.map((row) => [...row, EMPTY_STRING]);
};

export const removeExcelRow = (grid: ExcelGrid): ExcelGrid => {
  if (grid.length <= NUMBER_ONE) return grid;
  return grid.slice(NUMBER_ZERO, -NUMBER_ONE);
};

export const removeExcelCol = (grid: ExcelGrid): ExcelGrid => {
  const cols = grid[NUMBER_ZERO]?.length ?? NUMBER_ZERO;
  if (cols <= NUMBER_ONE) return grid;
  return grid.map((row) => row.slice(NUMBER_ZERO, -NUMBER_ONE));
};

export const clearExcelGrid = (grid: ExcelGrid): ExcelGrid =>
  grid.map((row) => row.map(() => EMPTY_STRING));

export const CSV_ACCEPT = '.csv,text/csv';
export const CSV_NEWLINE = NEWLINE_STRING;
