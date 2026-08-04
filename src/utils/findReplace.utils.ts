import { EMPTY_STRING } from '@/constants/generals.const';
import { NUMBER_ONE, NUMBER_ZERO } from '@/constants/numbers';

const replaceInTextNode = (
  node: Text,
  find: string,
  replace: string,
  replaceAll: boolean,
): boolean => {
  const value = node.nodeValue ?? EMPTY_STRING;
  const index = value.indexOf(find);
  if (index < NUMBER_ZERO) return false;
  if (replaceAll) {
    node.nodeValue = value.split(find).join(replace);
    return true;
  }
  node.nodeValue = value.slice(NUMBER_ZERO, index) + replace + value.slice(index + find.length);
  return true;
};

const walkTextNodes = (
  root: Node,
  visit: (node: Text) => boolean,
): boolean => {
  const children = Array.from(root.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const stop = visit(child as Text);
      if (stop) return true;
      continue;
    }
    if (child.nodeType === Node.ELEMENT_NODE) {
      const stop = walkTextNodes(child, visit);
      if (stop) return true;
    }
  }
  return false;
};

export const replaceInHtml = (
  html: string,
  find: string,
  replace: string,
  replaceAll: boolean,
): string => {
  if (!find || typeof document === 'undefined') return html;
  const root = document.createElement('div');
  root.innerHTML = html;
  let replaced = false;
  walkTextNodes(root, (node) => {
    const didReplace = replaceInTextNode(node, find, replace, replaceAll);
    if (!didReplace) return false;
    replaced = true;
    return !replaceAll;
  });
  return replaced ? root.innerHTML : html;
};

export const countOccurrences = (html: string, find: string): number => {
  if (!find || typeof document === 'undefined') return NUMBER_ZERO;
  const root = document.createElement('div');
  root.innerHTML = html;
  let total = NUMBER_ZERO;
  walkTextNodes(root, (node) => {
    const value = node.nodeValue ?? EMPTY_STRING;
    total += value.split(find).length - NUMBER_ONE;
    return false;
  });
  return total;
};
