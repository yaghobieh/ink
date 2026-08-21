import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const OrderedListIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <path d="M4 6h2M4 12h2M4 18h2" />
      <path d="M9 6h11M9 12h11M9 18h11" />
    </svg>
  </span>
);
