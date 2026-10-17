import { DEFAULT_MEMORY_KEY } from '../constants/generals.const';
import { NUMBER_TWENTY } from '../constants/numbers';
import { isLocalStorageAvailable } from './storage.utils';
import { createInkId } from './id.utils';

export const VERSION_STORAGE_PREFIX = 'ink-versions:';
export const VERSION_HISTORY_LIMIT = NUMBER_TWENTY;

export interface InkDocumentVersion {
  id: string;
  name: string;
  html: string;
  savedAt: number;
}

const storageKey = (memoryKey?: string): string =>
  `${VERSION_STORAGE_PREFIX}${memoryKey || DEFAULT_MEMORY_KEY}`;

export const listVersions = (memoryKey?: string): InkDocumentVersion[] => {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(storageKey(memoryKey));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as InkDocumentVersion[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeVersions = (memoryKey: string | undefined, versions: InkDocumentVersion[]): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(storageKey(memoryKey), JSON.stringify(versions));
  } catch {
    return;
  }
};

export const saveVersion = (
  memoryKey: string | undefined,
  html: string,
  name?: string,
): InkDocumentVersion => {
  const version: InkDocumentVersion = {
    id: createInkId('ver'),
    name: name?.trim() || new Date().toLocaleString(),
    html,
    savedAt: Date.now(),
  };
  const next = [version, ...listVersions(memoryKey)].slice(0, VERSION_HISTORY_LIMIT);
  writeVersions(memoryKey, next);
  return version;
};
