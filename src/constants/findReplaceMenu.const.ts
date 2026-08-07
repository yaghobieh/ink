import type { DropdownOption } from '../types';

export const FIND_REPLACE_VALUE_FIND = 'find';
export const FIND_REPLACE_VALUE_REPLACE = 'replace';

export const FIND_REPLACE_LABEL_FIND = 'Find';
export const FIND_REPLACE_LABEL_REPLACE = 'Replace';

export const FIND_REPLACE_DROPDOWN_TITLE = 'Find and replace';

export const FIND_REPLACE_FOCUS_FIND = 'find' as const;
export const FIND_REPLACE_FOCUS_REPLACE = 'replace' as const;

export const INK_FIND_REPLACE_OPTIONS: DropdownOption[] = [
  { value: FIND_REPLACE_VALUE_FIND, label: FIND_REPLACE_LABEL_FIND },
  { value: FIND_REPLACE_VALUE_REPLACE, label: FIND_REPLACE_LABEL_REPLACE },
];
