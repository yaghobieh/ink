export type CaseMode = 'upper' | 'lower' | 'title';

export interface PaintedFormat {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

const COMMAND_BOLD = 'bold';
const COMMAND_ITALIC = 'italic';
const COMMAND_UNDERLINE = 'underline';
const COMMAND_INSERT_TEXT = 'insertText';

export const changeCase = (value: string, mode: CaseMode): string => {
  if (mode === 'upper') return value.toUpperCase();
  if (mode === 'lower') return value.toLowerCase();
  return value.replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
};

export const readPaintedFormat = (): PaintedFormat => ({
  bold: document.queryCommandState(COMMAND_BOLD),
  italic: document.queryCommandState(COMMAND_ITALIC),
  underline: document.queryCommandState(COMMAND_UNDERLINE),
});

const syncCommand = (command: string, wanted: boolean): void => {
  if (document.queryCommandState(command) !== wanted) {
    document.execCommand(command);
  }
};

export const applyPaintedFormat = (format: PaintedFormat): void => {
  syncCommand(COMMAND_BOLD, format.bold);
  syncCommand(COMMAND_ITALIC, format.italic);
  syncCommand(COMMAND_UNDERLINE, format.underline);
};

export const applyCaseToSelection = (mode: CaseMode): boolean => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return false;
  const next = changeCase(selection.toString(), mode);
  return document.execCommand(COMMAND_INSERT_TEXT, false, next);
};
