import type { FC } from 'react';
import {
  GRIP_DOT_COLS,
  GRIP_DOT_RADIUS,
  GRIP_DOT_ROWS,
  ICON_CLASS,
  ICON_CLASS_GRIP,
  ICON_VIEWBOX,
} from './Icon.const';
import { cn } from '@utils';

export const GripIcon: FC = () => (
  <span className={cn(ICON_CLASS, ICON_CLASS_GRIP)} aria-hidden="true">
    <svg viewBox={ICON_VIEWBOX}>
      {GRIP_DOT_ROWS.flatMap((cy) =>
        GRIP_DOT_COLS.map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={GRIP_DOT_RADIUS} />
        )),
      )}
    </svg>
  </span>
);
