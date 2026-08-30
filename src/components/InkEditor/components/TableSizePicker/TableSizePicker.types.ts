import type { ReactNode } from 'react';

export type TableSizePickerProps = {
  icon: ReactNode;
  disabled?: boolean;
  onSelect: (rows: number, cols: number) => void;
};

export type TableSizePickerPosition = {
  top: number;
  left: number;
};
