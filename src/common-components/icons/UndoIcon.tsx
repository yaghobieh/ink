import type { FC } from 'react';
import { ICON_CLASS, ICON_VIEWBOX } from './Icon.const';

export const UndoIcon: FC = () => (
  <span className={ICON_CLASS} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 1 1 0 11H13" />
    </svg>
  </span>
);
