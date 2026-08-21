import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const ChecklistIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <path d="M5.5 7l1.2 1.2L9.5 5.5" />
      <path d="M13 7h7M4 14h16M4 19h16" />
    </svg>
  </span>
);
