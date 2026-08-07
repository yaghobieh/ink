import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const RedoIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <path d="M15 14l5-5-5-5" />
      <path d="M20 9H9.5a5.5 5.5 0 1 0 0 11H11" />
    </svg>
  </span>
);
