import { EMPTY_STRING, LOCAL_STORAGE_PREFIX } from '@/constants/generals.const';
import { isLocalStorageAvailable } from './storage.utils';

export const buildInkMemoryKey = (memoryKey?: string): string =>
  `${LOCAL_STORAGE_PREFIX}${memoryKey || 'default'}`;

export const readInkMemory = (memoryKey?: string): string => {
  if (!isLocalStorageAvailable()) return EMPTY_STRING;
  return localStorage.getItem(buildInkMemoryKey(memoryKey)) ?? EMPTY_STRING;
};

export const writeInkMemory = (html: string, memoryKey?: string): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(buildInkMemoryKey(memoryKey), html);
};

export const clearInkMemory = (memoryKey?: string): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(buildInkMemoryKey(memoryKey));
};
