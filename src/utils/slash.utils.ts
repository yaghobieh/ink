import {
  INK_SLASH_COMMANDS,
  INK_SLASH_MENU_MAX_ITEMS,
  SLASH_CATEGORY_BASIC,
} from '../constants';
import type { SlashCommandItem } from '../types';

export type SlashCommandGroup = {
  category: string;
  items: SlashCommandItem[];
};

const matchesSlashItem = (item: SlashCommandItem, normalized: string): boolean => {
  if (item.label.toLowerCase().includes(normalized)) return true;
  if (item.description.toLowerCase().includes(normalized)) return true;
  if (item.category.toLowerCase().includes(normalized)) return true;
  if (item.shortcut.toLowerCase().includes(normalized)) return true;
  return item.keywords.some((keyword) => keyword.includes(normalized));
};

export const filterSlashCommands = (query: string): SlashCommandItem[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return INK_SLASH_COMMANDS.slice(0, INK_SLASH_MENU_MAX_ITEMS);
  return INK_SLASH_COMMANDS.filter((item) => matchesSlashItem(item, normalized)).slice(
    0,
    INK_SLASH_MENU_MAX_ITEMS,
  );
};

export const groupSlashCommands = (items: SlashCommandItem[]): SlashCommandGroup[] => {
  const order: string[] = [];
  const grouped = new Map<string, SlashCommandItem[]>();
  items.forEach((item) => {
    const category = item.category || SLASH_CATEGORY_BASIC;
    const bucket = grouped.get(category);
    if (!bucket) {
      order.push(category);
      grouped.set(category, [item]);
      return;
    }
    bucket.push(item);
  });
  return order.map((category) => ({
    category,
    items: grouped.get(category) ?? [],
  }));
};

export const extractSlashQuery = (text: string): string | null => {
  const match = text.match(/(?:^|\s)\/([^\s]*)$/);
  if (!match) return null;
  return match[1] ?? '';
};
