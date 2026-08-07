import {
  EMPTY_STRING,
  NUMBER_ZERO,
  TOOLBAR_OPTION_DIVIDER,
  TOOLBAR_STORAGE_KEY_HIDDEN,
  TOOLBAR_STORAGE_KEY_ITEMS,
  TOOLBAR_STORAGE_VALUE_FALSE,
  TOOLBAR_STORAGE_VALUE_TRUE,
} from '../constants';
import type { ToolbarOption } from '../types';
import { isLocalStorageAvailable } from './storage.utils';

export const isSessionStorageAvailable = (): boolean =>
  typeof sessionStorage !== 'undefined';

export const buildToolbarStorageKey = (baseKey: string, memoryKey?: string): string =>
  memoryKey ? `${baseKey}:${memoryKey}` : baseKey;

const getStorage = (persistLocal: boolean): Storage | null => {
  if (persistLocal) {
    return isLocalStorageAvailable() ? localStorage : null;
  }
  return isSessionStorageAvailable() ? sessionStorage : null;
};

export const readToolbarHidden = (
  persistLocal: boolean,
  memoryKey?: string,
): boolean | null => {
  const storage = getStorage(persistLocal);
  if (!storage) return null;
  try {
    const raw = storage.getItem(buildToolbarStorageKey(TOOLBAR_STORAGE_KEY_HIDDEN, memoryKey));
    if (raw === null) return null;
    return raw === TOOLBAR_STORAGE_VALUE_TRUE;
  } catch {
    return null;
  }
};

export const writeToolbarHidden = (
  hidden: boolean,
  persistLocal: boolean,
  memoryKey?: string,
): void => {
  const storage = getStorage(persistLocal);
  if (!storage) return;
  try {
    storage.setItem(
      buildToolbarStorageKey(TOOLBAR_STORAGE_KEY_HIDDEN, memoryKey),
      hidden ? TOOLBAR_STORAGE_VALUE_TRUE : TOOLBAR_STORAGE_VALUE_FALSE,
    );
  } catch {
    return;
  }
};

const isToolbarOption = (value: unknown): value is ToolbarOption =>
  typeof value === 'string' && value.length > NUMBER_ZERO;

export const parseToolbarItems = (raw: string): ToolbarOption[] | null => {
  if (!raw || raw === EMPTY_STRING) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const items = parsed.filter(isToolbarOption);
    return items.length > NUMBER_ZERO ? items : null;
  } catch {
    return null;
  }
};

export const readToolbarItems = (
  persistLocal: boolean,
  memoryKey?: string,
): ToolbarOption[] | null => {
  const storage = getStorage(persistLocal);
  if (!storage) return null;
  try {
    const raw = storage.getItem(buildToolbarStorageKey(TOOLBAR_STORAGE_KEY_ITEMS, memoryKey));
    if (raw === null) return null;
    return parseToolbarItems(raw);
  } catch {
    return null;
  }
};

export const writeToolbarItems = (
  items: ToolbarOption[],
  persistLocal: boolean,
  memoryKey?: string,
): void => {
  const storage = getStorage(persistLocal);
  if (!storage) return;
  try {
    storage.setItem(
      buildToolbarStorageKey(TOOLBAR_STORAGE_KEY_ITEMS, memoryKey),
      JSON.stringify(items),
    );
  } catch {
    return;
  }
};

export const normalizeToolbarItems = (items: ToolbarOption[]): ToolbarOption[] => {
  const next: ToolbarOption[] = [];
  for (const item of items) {
    if (item === TOOLBAR_OPTION_DIVIDER) {
      if (next.length === NUMBER_ZERO) continue;
      if (next[next.length - 1] === TOOLBAR_OPTION_DIVIDER) continue;
      next.push(item);
      continue;
    }
    next.push(item);
  }
  while (next.length > NUMBER_ZERO && next[next.length - 1] === TOOLBAR_OPTION_DIVIDER) {
    next.pop();
  }
  return next;
};

export const buildVisibleToolbarItems = (
  catalog: ToolbarOption[],
  enabled: Set<ToolbarOption>,
): ToolbarOption[] =>
  normalizeToolbarItems(
    catalog.filter((item) => item === TOOLBAR_OPTION_DIVIDER || enabled.has(item)),
  );

export const listCustomizableToolbarOptions = (catalog: ToolbarOption[]): ToolbarOption[] => {
  const seen = new Set<ToolbarOption>();
  const options: ToolbarOption[] = [];
  for (const item of catalog) {
    if (item === TOOLBAR_OPTION_DIVIDER) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    options.push(item);
  }
  return options;
};
