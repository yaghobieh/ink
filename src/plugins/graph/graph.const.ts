import type { GraphKind, GraphPoint } from './graph.types';

export const GRAPH_KIND_DEFAULT: GraphKind = 'bar';
export const GRAPH_KINDS: GraphKind[] = [GRAPH_KIND_DEFAULT, 'line', 'pie'];

export const GRAPH_SAMPLE: GraphPoint[] = [
  { label: 'A', value: 40 },
  { label: 'B', value: 70 },
  { label: 'C', value: 55 },
  { label: 'D', value: 90 },
];

export const GRAPH_KIND_LABELS: Record<GraphKind, string> = {
  bar: 'Bar',
  line: 'Line',
  pie: 'Pie',
};

export const GRAPH_BAR_GAP_PX = 8;
export const GRAPH_STROKE_PX = 2;
export const GRAPH_DOT_RADIUS = 3;
export const GRAPH_LABEL_SIZE = 10;
export const GRAPH_LABEL_OFFSET = 6;
export const GRAPH_PIE_RADIUS = 60;
export const GRAPH_CORNER = 2;
export const GRAPH_COLORS = ['#0E8A6E', '#22A585', '#0B6E58', '#5C5E56'];
