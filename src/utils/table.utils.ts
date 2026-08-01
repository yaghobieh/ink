import {
  INK_DEFAULT_TABLE_COLS,
  INK_DEFAULT_TABLE_ROWS,
  INK_TABLE_MAX_COLS,
  INK_TABLE_MAX_ROWS,
  INK_TABLE_MIN_COLS,
  INK_TABLE_MIN_ROWS,
} from '../constants';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const buildTableHtml = (
  rows = INK_DEFAULT_TABLE_ROWS,
  cols = INK_DEFAULT_TABLE_COLS,
): string => {
  const safeRows = clamp(rows, INK_TABLE_MIN_ROWS, INK_TABLE_MAX_ROWS);
  const safeCols = clamp(cols, INK_TABLE_MIN_COLS, INK_TABLE_MAX_COLS);
  const headerCells = Array.from({ length: safeCols }, (_, index) =>
    `<th contenteditable="true">Header ${index + 1}</th>`,
  ).join('');
  const bodyRows = Array.from({ length: Math.max(0, safeRows - 1) }, () => {
    const cells = Array.from({ length: safeCols }, () => '<td contenteditable="true"><br></td>').join(
      '',
    );
    return `<tr>${cells}</tr>`;
  }).join('');
  return `<table class="Ink-table"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><p><br></p>`;
};
