export const MENTION_CLASS = 'Ink-mention';
export const MENTION_QUERY_LIMIT = 40;

const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export const extractMentionQuery = (text: string): string | null => {
  const slice = text.slice(-MENTION_QUERY_LIMIT);
  const match = slice.match(/(?:^|\s)@([^\s@]*)$/);
  if (!match) return null;
  return match[1] ?? '';
};

export const buildMentionHtml = (id: string, label: string): string =>
  `<span class="${MENTION_CLASS}" data-mention-id="${escapeAttr(id)}" contenteditable="false">@${escapeAttr(label)}</span>&nbsp;`;

export const filterMentionPeople = (
  people: Array<{ id: string; label: string }>,
  query: string,
): Array<{ id: string; label: string }> => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return people;
  return people.filter((person) => person.label.toLowerCase().includes(normalized));
};

export const deleteMentionQuery = (query: string): boolean => {
  const selection = window.getSelection();
  if (!selection || !selection.isCollapsed || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node || node.nodeType !== Node.TEXT_NODE) return false;
  const token = `@${query}`;
  const offset = selection.anchorOffset;
  const text = node.textContent ?? '';
  if (text.slice(offset - token.length, offset) !== token) return false;
  const range = selection.getRangeAt(0);
  range.setStart(node, offset - token.length);
  range.deleteContents();
  return true;
};
