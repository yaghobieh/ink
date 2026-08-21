import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const BulletListIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <circle cx="5" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9 6h11M9 12h11M9 18h11" />
    </svg>
  </span>
);
