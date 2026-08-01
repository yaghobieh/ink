import type { FC } from 'react';

export interface BlockHandlesProps {
  visible: boolean;
  top: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const BlockHandles: FC<BlockHandlesProps> = (props) => {
  const { visible, top, onMoveUp, onMoveDown } = props;
  if (!visible) return null;
  return (
    <div className="Ink-BlockHandles" style={{ top }} aria-hidden={!visible}>
      <button type="button" className="Ink-BlockHandles__grip" title="Block" tabIndex={-1}>
        ⋮⋮
      </button>
      <button type="button" className="Ink-BlockHandles__btn" title="Move block up" onClick={onMoveUp}>
        ↑
      </button>
      <button type="button" className="Ink-BlockHandles__btn" title="Move block down" onClick={onMoveDown}>
        ↓
      </button>
    </div>
  );
};
