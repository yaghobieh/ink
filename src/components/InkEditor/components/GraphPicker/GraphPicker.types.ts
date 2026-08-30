import type { ReactNode } from 'react';

export type GraphPickerProps = {
  icon: ReactNode;
  disabled?: boolean;
  hint?: string;
  onHint?: (hint: string) => void;
  pluginColor?: string;
  onInsert: (html: string) => void;
};
