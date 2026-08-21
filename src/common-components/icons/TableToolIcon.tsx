import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const TableToolIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <rect x="4" y="5" width="16" height="14" rx="1.2" />
      <path d="M4 10h16M4 15h16M10 5v14M16 5v14" />
    </svg>
  </span>
);
