import type { ReactNode } from 'react';

export type TitleGalleryProps = {
  icon: ReactNode;
  disabled?: boolean;
  hint?: string;
  onHint?: (hint: string) => void;
  pluginColor?: string;
  onSelect: (styleId: string) => void;
};
