import type { ReactNode } from 'react';
import type { InkThemeId } from '../../../../plugins/theme';

export type ThemePickerProps = {
  icon: ReactNode;
  disabled?: boolean;
  hint?: string;
  onHint?: (hint: string) => void;
  pluginColor?: string;
  value: InkThemeId;
  onChange: (id: InkThemeId) => void;
};
