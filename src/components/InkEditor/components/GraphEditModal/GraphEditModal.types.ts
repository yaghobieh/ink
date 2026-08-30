import type { GraphColors, GraphPoint } from '../../../../plugins/graph';

export type GraphEditMode = 'values' | 'colors';

export type GraphEditModalProps = {
  open: boolean;
  mode: GraphEditMode;
  points: GraphPoint[];
  colors: GraphColors;
  onClose: () => void;
  onApply: (points: GraphPoint[], colors: GraphColors) => void;
};
