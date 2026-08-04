import {
  DEFAULT_MEMORY_KEY,
  EMPTY_STRING,
  LOCAL_STORAGE_PREFIX,
} from '@/constants/generals.const';
import { isLocalStorageAvailable } from './storage.utils';

export const buildInkMemoryKey = (memoryKey?: string): string =>
  `${LOCAL_STORAGE_PREFIX}${memoryKey || DEFAULT_MEMORY_KEY}`;

export const readInkMemory = (memoryKey?: string): string => {
  if (!isLocalStorageAvailable()) return EMPTY_STRING;
  try {
    return localStorage.getItem(buildInkMemoryKey(memoryKey)) ?? EMPTY_STRING;
  } catch {
    return EMPTY_STRING;
  }
};

export const writeInkMemory = (html: string, memoryKey?: string): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(buildInkMemoryKey(memoryKey), html);
  } catch {
    return;
  }
};

export const clearInkMemory = (memoryKey?: string): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(buildInkMemoryKey(memoryKey));
  } catch {
    return;
  }
};
