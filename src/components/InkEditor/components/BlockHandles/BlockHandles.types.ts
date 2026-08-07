import type { DragEvent } from 'react';

export interface BlockHandlesProps {
  visible: boolean;
  top: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart?: (event: DragEvent<HTMLButtonElement>) => void;
}
