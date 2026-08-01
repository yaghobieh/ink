import { INK_SLASH_COMMANDS, INK_SLASH_MENU_MAX_ITEMS } from '../constants';
import type { SlashCommandItem } from '../types';

export const filterSlashCommands = (query: string): SlashCommandItem[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return INK_SLASH_COMMANDS.slice(0, INK_SLASH_MENU_MAX_ITEMS);
  return INK_SLASH_COMMANDS.filter((item) => {
    if (item.label.toLowerCase().includes(normalized)) return true;
    return item.keywords.some((keyword) => keyword.includes(normalized));
  }).slice(0, INK_SLASH_MENU_MAX_ITEMS);
};

export const extractSlashQuery = (text: string): string | null => {
  const match = text.match(/(?:^|\s)\/([^\s]*)$/);
  if (!match) return null;
  return match[1] ?? '';
};
