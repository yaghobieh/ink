import {
  INK_ATTR_GRAPH,
  INK_ATTR_GRAPH_COLORS,
  INK_ATTR_GRAPH_POINTS,
  INK_CLASS_GRAPH_BLOCK,
  INK_CLASS_GRAPH_WRAP,
  INK_GRAPH_HEIGHT,
  INK_GRAPH_PAD,
  INK_GRAPH_WIDTH,
  NUMBER_ONE,
  NUMBER_ZERO,
} from '../../constants';
import { EMPTY_STRING } from '../../constants/generals.const';
import {
  GRAPH_BAR_GAP_PX,
  GRAPH_COLORS,
  GRAPH_CORNER,
  GRAPH_DOT_RADIUS,
  GRAPH_LABEL_OFFSET,
  GRAPH_LABEL_SIZE,
  GRAPH_PIE_RADIUS,
  GRAPH_STROKE_PX,
} from './graph.const';
import type { GraphColors, GraphKind, GraphPoint } from './graph.types';

const maxValue = (points: GraphPoint[]): number =>
  Math.max(...points.map((point) => point.value), NUMBER_ONE);

const colorAt = (colors: GraphColors, index: number): string =>
  colors[index % colors.length] ?? GRAPH_COLORS[index % GRAPH_COLORS.length] ?? GRAPH_COLORS[NUMBER_ZERO];

const resolveColors = (colors?: GraphColors): GraphColors =>
  colors && colors.length > NUMBER_ZERO ? colors : GRAPH_COLORS;

export const buildBarSvg = (points: GraphPoint[], colors: GraphColors = GRAPH_COLORS): string => {
  const palette = resolveColors(colors);
  const innerW = INK_GRAPH_WIDTH - INK_GRAPH_PAD * 2;
  const innerH = INK_GRAPH_HEIGHT - INK_GRAPH_PAD * 2;
  const peak = maxValue(points);
  const barW = (innerW - GRAPH_BAR_GAP_PX * (points.length - NUMBER_ONE)) / points.length;
  const bars = points
    .map((point, index) => {
      const height = (point.value / peak) * innerH;
      const x = INK_GRAPH_PAD + index * (barW + GRAPH_BAR_GAP_PX);
      const y = INK_GRAPH_PAD + innerH - height;
      const fill = colorAt(palette, index);
      return `<rect x="${x}" y="${y}" width="${barW}" height="${height}" fill="${fill}" rx="${GRAPH_CORNER}"/><text x="${x + barW / 2}" y="${INK_GRAPH_HEIGHT - GRAPH_LABEL_OFFSET}" text-anchor="middle" font-size="${GRAPH_LABEL_SIZE}" fill="#5C5E56">${point.label}</text>`;
    })
    .join(EMPTY_STRING);
  return `<svg class="${INK_CLASS_GRAPH_WRAP}" viewBox="0 0 ${INK_GRAPH_WIDTH} ${INK_GRAPH_HEIGHT}" width="${INK_GRAPH_WIDTH}" height="${INK_GRAPH_HEIGHT}">${bars}</svg>`;
};

export const buildLineSvg = (points: GraphPoint[], colors: GraphColors = GRAPH_COLORS): string => {
  const palette = resolveColors(colors);
  const stroke = colorAt(palette, NUMBER_ZERO);
  const innerW = INK_GRAPH_WIDTH - INK_GRAPH_PAD * 2;
  const innerH = INK_GRAPH_HEIGHT - INK_GRAPH_PAD * 2;
  const peak = maxValue(points);
  const step = points.length > NUMBER_ONE ? innerW / (points.length - NUMBER_ONE) : innerW;
  const coords = points.map((point, index) => {
    const x = INK_GRAPH_PAD + index * step;
    const y = INK_GRAPH_PAD + innerH - (point.value / peak) * innerH;
    return { x, y, label: point.label };
  });
  const path = coords.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  const dots = coords
    .map(
      (point, index) =>
        `<circle cx="${point.x}" cy="${point.y}" r="${GRAPH_DOT_RADIUS}" fill="${colorAt(palette, index)}"/><text x="${point.x}" y="${INK_GRAPH_HEIGHT - GRAPH_LABEL_OFFSET}" text-anchor="middle" font-size="${GRAPH_LABEL_SIZE}" fill="#5C5E56">${point.label}</text>`,
    )
    .join(EMPTY_STRING);
  return `<svg class="${INK_CLASS_GRAPH_WRAP}" viewBox="0 0 ${INK_GRAPH_WIDTH} ${INK_GRAPH_HEIGHT}" width="${INK_GRAPH_WIDTH}" height="${INK_GRAPH_HEIGHT}"><path d="${path}" fill="none" stroke="${stroke}" stroke-width="${GRAPH_STROKE_PX}"/>${dots}</svg>`;
};

export const buildPieSvg = (points: GraphPoint[], colors: GraphColors = GRAPH_COLORS): string => {
  const palette = resolveColors(colors);
  const total = points.reduce((sum, point) => sum + point.value, NUMBER_ZERO) || NUMBER_ONE;
  const cx = INK_GRAPH_WIDTH / 2;
  const cy = INK_GRAPH_HEIGHT / 2;
  const radius = GRAPH_PIE_RADIUS;
  let angle = -Math.PI / 2;
  const slices = points
    .map((point, index) => {
      const sweep = (point.value / total) * Math.PI * 2;
      const start = angle;
      angle += sweep;
      const x1 = cx + radius * Math.cos(start);
      const y1 = cy + radius * Math.sin(start);
      const x2 = cx + radius * Math.cos(angle);
      const y2 = cy + radius * Math.sin(angle);
      const large = sweep > Math.PI ? NUMBER_ONE : NUMBER_ZERO;
      return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z" fill="${colorAt(palette, index)}"/>`;
    })
    .join(EMPTY_STRING);
  return `<svg class="${INK_CLASS_GRAPH_WRAP}" viewBox="0 0 ${INK_GRAPH_WIDTH} ${INK_GRAPH_HEIGHT}" width="${INK_GRAPH_WIDTH}" height="${INK_GRAPH_HEIGHT}">${slices}</svg>`;
};

const encodeJson = (value: unknown): string => encodeURIComponent(JSON.stringify(value));

export const parseGraphPoints = (value: string | null): GraphPoint[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is GraphPoint =>
        Boolean(item) &&
        typeof item === 'object' &&
        typeof (item as GraphPoint).label === 'string' &&
        typeof (item as GraphPoint).value === 'number',
    );
  } catch {
    return [];
  }
};

export const parseGraphColors = (value: string | null): GraphColors => {
  if (!value) return [...GRAPH_COLORS];
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as unknown;
    if (!Array.isArray(parsed)) return [...GRAPH_COLORS];
    const colors = parsed.filter((item): item is string => typeof item === 'string' && item.length > NUMBER_ZERO);
    return colors.length > NUMBER_ZERO ? colors : [...GRAPH_COLORS];
  } catch {
    return [...GRAPH_COLORS];
  }
};

export const parseGraphValuesText = (text: string): GraphPoint[] =>
  text
    .split(',')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > NUMBER_ZERO)
    .map((chunk) => {
      const [label, raw] = chunk.split(':');
      return { label: (label ?? EMPTY_STRING).trim() || '•', value: Number(raw) || NUMBER_ONE };
    });

export const buildGraphHtml = (
  kind: GraphKind,
  points: GraphPoint[],
  colors: GraphColors = GRAPH_COLORS,
): string => {
  const palette = resolveColors(colors);
  const svg =
    kind === 'line'
      ? buildLineSvg(points, palette)
      : kind === 'pie'
        ? buildPieSvg(points, palette)
        : buildBarSvg(points, palette);
  return `<p class="${INK_CLASS_GRAPH_BLOCK}" ${INK_ATTR_GRAPH}="${kind}" ${INK_ATTR_GRAPH_POINTS}="${encodeJson(points)}" ${INK_ATTR_GRAPH_COLORS}="${encodeJson(palette)}">${svg}</p><p><br></p>`;
};

export const replaceGraphBlock = (
  block: HTMLElement,
  kind: GraphKind,
  points: GraphPoint[],
  colors?: GraphColors,
): void => {
  const nextColors = colors ?? parseGraphColors(block.getAttribute(INK_ATTR_GRAPH_COLORS));
  const next = document.createElement('div');
  next.innerHTML = buildGraphHtml(kind, points, nextColors);
  const replacement = next.firstElementChild;
  if (replacement) {
    block.replaceWith(replacement);
  }
};

export const getGraphBlock = (node: EventTarget | null): HTMLElement | null => {
  if (!(node instanceof Node)) return null;
  const el = node instanceof HTMLElement ? node : node.parentElement;
  return el?.closest(`[${INK_ATTR_GRAPH}]`) ?? null;
};
