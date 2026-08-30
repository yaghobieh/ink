import { INK_ATTR_TITLE, INK_CLASS_TITLE, INK_TITLES_DEFAULT_TEXT } from '../../constants';
import type { TitleStyleId } from './titles.types';

const ENTITY_AMP = '&amp;';
const ENTITY_LT = '&lt;';
const ENTITY_GT = '&gt;';
const ENTITY_QUOT = '&quot;';

const escapeTitleText = (value: string): string =>
  value
    .replace(/&/g, ENTITY_AMP)
    .replace(/</g, ENTITY_LT)
    .replace(/>/g, ENTITY_GT)
    .replace(/"/g, ENTITY_QUOT);

export const buildTitleHtml = (styleId: TitleStyleId, text = INK_TITLES_DEFAULT_TEXT): string => {
  const safe = escapeTitleText(text.trim() || INK_TITLES_DEFAULT_TEXT);
  return `<p class="${INK_CLASS_TITLE} ${INK_CLASS_TITLE}--${styleId}" ${INK_ATTR_TITLE}="${styleId}">${safe}</p><p><br></p>`;
};
