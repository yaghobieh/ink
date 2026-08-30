import { beforeEach, describe, expect, it } from 'vitest';
import {
  buildTableHtml,
  deleteTableColumn,
  deleteTableRow,
  insertTableColumn,
  insertTableRow,
  setTableColumnWidth,
  toggleTableHeaderRow,
} from './table.utils';
import { TABLE_CLASS_NAME, TABLE_COLGROUP } from '../constants/table.const';

describe('table.utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('builds a table with Ink-table class', () => {
    const html = buildTableHtml(3, 3);
    expect(html).toContain(TABLE_CLASS_NAME);
    expect(html).toContain('<th');
    expect(html).toContain('<td');
    expect(html).toContain(`<${TABLE_COLGROUP}>`);
  });

  it('toggles the header row on and off', () => {
    document.body.innerHTML = buildTableHtml(2, 2);
    const cell = document.querySelector('td') as HTMLTableCellElement;
    const table = document.querySelector('table') as HTMLTableElement;
    expect(table.tHead).not.toBeNull();
    expect(toggleTableHeaderRow(cell)).toBe(true);
    expect(table.tHead).toBeNull();
    const next = document.querySelector('td') as HTMLTableCellElement;
    expect(toggleTableHeaderRow(next)).toBe(true);
    expect(table.tHead).not.toBeNull();
  });

  it('sets a column width on the colgroup', () => {
    document.body.innerHTML = buildTableHtml(2, 2);
    const table = document.querySelector('table') as HTMLTableElement;
    setTableColumnWidth(table, 0, 120);
    const col = table.querySelector('col') as HTMLTableColElement;
    expect(col.style.width).toBe('120px');
  });

  it('inserts a row below the active cell', () => {
    document.body.innerHTML = buildTableHtml(2, 2);
    const cell = document.querySelector('td') as HTMLTableCellElement;
    const table = document.querySelector('table') as HTMLTableElement;
    const before = table.rows.length;
    expect(insertTableRow(cell, 'after')).toBe(true);
    expect(table.rows.length).toBe(before + 1);
  });

  it('inserts a column to the right', () => {
    document.body.innerHTML = buildTableHtml(2, 2);
    const cell = document.querySelector('td') as HTMLTableCellElement;
    const table = document.querySelector('table') as HTMLTableElement;
    const before = table.rows[0]?.cells.length ?? 0;
    expect(insertTableColumn(cell, 'after')).toBe(true);
    expect(table.rows[0]?.cells.length).toBe(before + 1);
  });

  it('deletes a row and column when above the minimum', () => {
    document.body.innerHTML = buildTableHtml(3, 3);
    const cell = document.querySelector('td') as HTMLTableCellElement;
    const table = document.querySelector('table') as HTMLTableElement;
    const rowsBefore = table.rows.length;
    const colsBefore = table.rows[0]?.cells.length ?? 0;
    expect(deleteTableRow(cell)).toBe(true);
    expect(table.rows.length).toBe(rowsBefore - 1);
    const nextCell = document.querySelector('td') as HTMLTableCellElement;
    expect(deleteTableColumn(nextCell)).toBe(true);
    expect(table.rows[0]?.cells.length).toBe(colsBefore - 1);
  });
});
