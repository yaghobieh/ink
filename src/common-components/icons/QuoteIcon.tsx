import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const QuoteIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <path d="M8 17c-2 0-3.5-1.6-3.5-4 0-3 2.2-6.4 6-8l.8 1.2C9 7.4 8 9.2 8 11.2c.8 0 2 .5 2 2.2 0 2-1.2 3.6-2 3.6zm9 0c-2 0-3.5-1.6-3.5-4 0-3 2.2-6.4 6-8l.8 1.2c-2.3 1.2-3.3 3-3.3 5 0 .8.6 2.2 2 2.2 0 2-1.2 3.6-2 3.6z" />
    </svg>
  </span>
);
