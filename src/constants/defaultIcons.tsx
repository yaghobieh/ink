import type { ReactNode } from 'react';
import { RedoIcon, UndoIcon, BulletListIcon, OrderedListIcon, ChecklistIcon, ImageToolIcon, LinkToolIcon, TableToolIcon, QuoteIcon } from '@common-components';
import type { InkIconKey } from '../types';
import {
  INK_CLASS_GLYPH,
  INK_CLASS_GLYPH_BOLD,
  INK_CLASS_GLYPH_ITALIC,
  INK_CLASS_GLYPH_STRIKE,
  INK_CLASS_GLYPH_UNDERLINE,
} from './defaults.const';
import {
  INK_GLYPH_BOLD,
  INK_GLYPH_ITALIC,
  INK_GLYPH_STRIKE,
  INK_GLYPH_UNDERLINE,
} from './generals.const';

export const INK_DEFAULT_ICONS: Record<InkIconKey, ReactNode> = {
  bold: <span className={`${INK_CLASS_GLYPH} ${INK_CLASS_GLYPH_BOLD}`}>{INK_GLYPH_BOLD}</span>,
  italic: <span className={`${INK_CLASS_GLYPH} ${INK_CLASS_GLYPH_ITALIC}`}>{INK_GLYPH_ITALIC}</span>,
  underline: (
    <span className={`${INK_CLASS_GLYPH} ${INK_CLASS_GLYPH_UNDERLINE}`}>{INK_GLYPH_UNDERLINE}</span>
  ),
  strikethrough: (
    <span className={`${INK_CLASS_GLYPH} ${INK_CLASS_GLYPH_STRIKE}`}>{INK_GLYPH_STRIKE}</span>
  ),
  bulletList: <BulletListIcon />,
  orderedList: <OrderedListIcon />,
  checklist: <ChecklistIcon />,
  link: <LinkToolIcon />,
  image: <ImageToolIcon />,
  table: <TableToolIcon />,
  signature: '✍',
  findReplace: '⌕',
  horizontalRule: '―',
  undo: <UndoIcon />,
  redo: <RedoIcon />,
  trackChanges: '±',
  comments: '💬',
  ai: '✦',
  clearFormat: '⌫',
  directionLtr: 'LTR',
  directionRtl: 'RTL',
  superscript: 'x²',
  subscript: 'x₂',
  alignLeft: '⫷',
  alignCenter: '☰',
  alignRight: '⫸',
  alignJustify: '≡',
  indent: '→',
  outdent: '←',
  blockquote: <QuoteIcon />,
  code: '</>',
  htmlSource: '</>',
  titles: 'Aa',
  excel: '⊞',
  graph: '▦',
  outline: '☰',
  fullscreen: '⛶',
  theme: '◐',
};
