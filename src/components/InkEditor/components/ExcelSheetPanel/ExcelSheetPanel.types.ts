import type { ReactNode } from 'react';

export type ExcelSheetPanelProps = {
  icon: ReactNode;
  disabled?: boolean;
  hint?: string;
  onHint?: (hint: string) => void;
  pluginColor?: string;
  onInsert: (html: string) => void;
};
