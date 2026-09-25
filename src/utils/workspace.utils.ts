import type { InkDocument } from '../types/workspace.types';

export const createDefaultDocument = (
  title = 'Untitled Document',
  content = '<p>Start typing...</p>'
): InkDocument => {
  const now = Date.now();
  return {
    id: `doc-${now}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    content,
    isDirty: false,
    createdAt: now,
    updatedAt: now,
    tags: [],
  };
};

export const filterDocuments = (
  documents: InkDocument[],
  query: string
): InkDocument[] => {
  if (!query.trim()) return documents;
  const q = query.toLowerCase();
  return documents.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.tags?.some((t) => t.toLowerCase().includes(q))
  );
};

export const sortDocuments = (
  documents: InkDocument[],
  sortBy: 'title' | 'updatedAt' = 'updatedAt'
): InkDocument[] => {
  return [...documents].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return (b.updatedAt || 0) - (a.updatedAt || 0);
  });
};
