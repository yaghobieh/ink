import type { DropdownOption } from '../types';

export const FONT_VALUE_SYSTEM = 'System UI';
export const FONT_VALUE_GEORGIA = 'Georgia';
export const FONT_VALUE_TIMES = 'Times New Roman';
export const FONT_VALUE_ARIAL = 'Arial';
export const FONT_VALUE_COURIER = 'Courier New';
export const FONT_VALUE_VERDANA = 'Verdana';

export const FONT_FAMILY_SYSTEM =
  'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
export const FONT_FAMILY_GEORGIA = 'Georgia, serif';
export const FONT_FAMILY_TIMES = '"Times New Roman", Times, serif';
export const FONT_FAMILY_ARIAL = 'Arial, Helvetica, sans-serif';
export const FONT_FAMILY_COURIER = '"Courier New", Courier, monospace';
export const FONT_FAMILY_VERDANA = 'Verdana, Geneva, sans-serif';

export const FONT_LABEL_SYSTEM = 'System UI';
export const FONT_LABEL_GEORGIA = 'Georgia';
export const FONT_LABEL_TIMES = 'Times New Roman';
export const FONT_LABEL_ARIAL = 'Arial';
export const FONT_LABEL_COURIER = 'Courier New';
export const FONT_LABEL_VERDANA = 'Verdana';

export const FONT_FAMILY_BY_VALUE: Record<string, string> = {
  [FONT_VALUE_SYSTEM]: FONT_FAMILY_SYSTEM,
  [FONT_VALUE_GEORGIA]: FONT_FAMILY_GEORGIA,
  [FONT_VALUE_TIMES]: FONT_FAMILY_TIMES,
  [FONT_VALUE_ARIAL]: FONT_FAMILY_ARIAL,
  [FONT_VALUE_COURIER]: FONT_FAMILY_COURIER,
  [FONT_VALUE_VERDANA]: FONT_FAMILY_VERDANA,
};

export const INK_FONT_OPTIONS: DropdownOption[] = [
  { value: FONT_VALUE_SYSTEM, label: FONT_LABEL_SYSTEM },
  { value: FONT_VALUE_GEORGIA, label: FONT_LABEL_GEORGIA },
  { value: FONT_VALUE_TIMES, label: FONT_LABEL_TIMES },
  { value: FONT_VALUE_ARIAL, label: FONT_LABEL_ARIAL },
  { value: FONT_VALUE_COURIER, label: FONT_LABEL_COURIER },
  { value: FONT_VALUE_VERDANA, label: FONT_LABEL_VERDANA },
];

export const FONT_DROPDOWN_TITLE = 'Font';
export const FONT_COMMAND_NAME = 'fontName';
export const FONT_STYLE_PROPERTY = 'font-family';
