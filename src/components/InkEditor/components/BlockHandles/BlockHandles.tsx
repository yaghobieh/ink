import type { FC } from 'react';
import { GripIcon } from '@common-components';
import {
  BLOCK_HANDLES_BTN_CLASS,
  BLOCK_HANDLES_CLASS,
  BLOCK_HANDLES_DOWN_LABEL,
  BLOCK_HANDLES_GRIP_CLASS,
  BLOCK_HANDLES_PLUS_CLASS,
  BLOCK_HANDLES_PLUS_LABEL,
  BLOCK_HANDLES_TITLE_DOWN,
  BLOCK_HANDLES_TITLE_GRIP,
  BLOCK_HANDLES_TITLE_PLUS,
  BLOCK_HANDLES_TITLE_UP,
  BLOCK_HANDLES_UP_LABEL,
} from './BlockHandles.const';
import type { BlockHandlesProps } from './BlockHandles.types';

export const BlockHandles: FC<BlockHandlesProps> = (props) => {
  const { visible, top, onMoveUp, onMoveDown, onDragStart } = props;
  if (!visible) return null;
  return (
    <div className={BLOCK_HANDLES_CLASS} style={{ top }} aria-hidden={!visible}>
      <button
        type="button"
        className={BLOCK_HANDLES_PLUS_CLASS}
        title={BLOCK_HANDLES_TITLE_PLUS}
        tabIndex={-1}
      >
        {BLOCK_HANDLES_PLUS_LABEL}
      </button>
      <button
        type="button"
        className={BLOCK_HANDLES_GRIP_CLASS}
        title={BLOCK_HANDLES_TITLE_GRIP}
        tabIndex={-1}
        draggable
        onDragStart={onDragStart}
      >
        <GripIcon />
      </button>
      <button
        type="button"
        className={BLOCK_HANDLES_BTN_CLASS}
        title={BLOCK_HANDLES_TITLE_UP}
        onClick={onMoveUp}
      >
        {BLOCK_HANDLES_UP_LABEL}
      </button>
      <button
        type="button"
        className={BLOCK_HANDLES_BTN_CLASS}
        title={BLOCK_HANDLES_TITLE_DOWN}
        onClick={onMoveDown}
      >
        {BLOCK_HANDLES_DOWN_LABEL}
      </button>
    </div>
  );
};
