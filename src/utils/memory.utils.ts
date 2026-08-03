import { EMPTY_STRING, LOCAL_STORAGE_PREFIX } from '../constants/generals.const';

export const buildInkMemoryKey = (memoryKey?: string): string =>
  `${LOCAL_STORAGE_PREFIX}${memoryKey || 'default'}`;

export const readInkMemory = (memoryKey?: string): string => {
  if (typeof localStorage === 'undefined') return EMPTY_STRING;
  return localStorage.getItem(buildInkMemoryKey(memoryKey)) ?? EMPTY_STRING;
};

export const writeInkMemory = (html: string, memoryKey?: string): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(buildInkMemoryKey(memoryKey), html);
};

export const clearInkMemory = (memoryKey?: string): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(buildInkMemoryKey(memoryKey));
};
