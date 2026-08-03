import { EMPTY_STRING } from '../constants/generals.const';
import { NUMBER_ONE, NUMBER_ZERO } from '../constants/numbers';

export const replaceInHtml = (
  html: string,
  find: string,
  replace: string,
  replaceAll: boolean,
): string => {
  if (!find) return html;
  if (replaceAll) {
    return html.split(find).join(replace);
  }
  const index = html.indexOf(find);
  if (index < NUMBER_ZERO) return html;
  return (
    html.slice(NUMBER_ZERO, index) +
    replace +
    html.slice(index + find.length)
  );
};

export const countOccurrences = (html: string, find: string): number => {
  if (!find) return NUMBER_ZERO;
  return html.split(find).length - NUMBER_ONE;
};

export const emptyFindGuard = (find: string): string => find || EMPTY_STRING;
