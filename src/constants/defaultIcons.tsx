import type { ReactNode } from 'react';
import { RedoIcon, UndoIcon } from '@common-components';
import type { InkIconKey } from '../types';

export const INK_DEFAULT_ICONS: Record<InkIconKey, ReactNode> = {
  bold: 'B',
  italic: 'I',
  underline: 'U',
  strikethrough: 'S',
  bulletList: '•',
  orderedList: '1.',
  link: '🔗',
  image: '🖼',
  table: '▦',
  signature: '✍',
  findReplace: '⌕',
  horizontalRule: '―',
  undo: <UndoIcon />,
  redo: <RedoIcon />,
  trackChanges: '±',
  comments: '💬',
  ai: '✦',
  clearFormat: '⌫',
  alignLeft: '⫷',
  alignCenter: '☰',
  alignRight: '⫸',
  alignJustify: '≡',
  indent: '→',
  outdent: '←',
  blockquote: '“',
  code: '</>',
};
