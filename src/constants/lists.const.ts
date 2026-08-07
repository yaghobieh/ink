import type { DropdownOption } from '../types';

export const LIST_VALUE_BULLET = 'bullet';
export const LIST_VALUE_DASH = 'dash';
export const LIST_VALUE_NUMBERS = 'numbers';
export const LIST_VALUE_LETTERS = 'letters';

export const LIST_LABEL_BULLET = 'Bullet (•)';
export const LIST_LABEL_DASH = 'Dash (–)';
export const LIST_LABEL_NUMBERS = 'Numbers (1. 2. 3.)';
export const LIST_LABEL_LETTERS = 'Letters (a. b. c.)';

export const LIST_DROPDOWN_TITLE = 'List';

export const LIST_STYLE_DISC = 'disc';
export const LIST_STYLE_DASH = "'– '";
export const LIST_STYLE_DECIMAL = 'decimal';
export const LIST_STYLE_LOWER_ALPHA = 'lower-alpha';

export const LIST_CLASS_DASH = 'Ink-list--dash';
export const LIST_CLASS_ALPHA = 'Ink-list--alpha';

export const LIST_TAG_UL = 'UL';
export const LIST_TAG_OL = 'OL';
export const LIST_TAG_LI = 'LI';

export const LIST_MARKDOWN_DASH = '-';
export const LIST_MARKDOWN_STAR = '*';
export const LIST_MARKDOWN_SPACE = ' ';

export const INK_LIST_OPTIONS: DropdownOption[] = [
  { value: LIST_VALUE_BULLET, label: LIST_LABEL_BULLET },
  { value: LIST_VALUE_DASH, label: LIST_LABEL_DASH },
  { value: LIST_VALUE_NUMBERS, label: LIST_LABEL_NUMBERS },
  { value: LIST_VALUE_LETTERS, label: LIST_LABEL_LETTERS },
];
