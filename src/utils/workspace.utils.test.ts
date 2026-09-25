import { describe, expect, it } from 'vitest';
import {
  createDefaultDocument,
  filterDocuments,
  sortDocuments,
} from './workspace.utils';
import type { InkDocument } from '../types/workspace.types';

describe('workspace.utils', () => {
  it('creates default document with timestamps', () => {
    const doc = createDefaultDocument('My Doc', '<p>Hello</p>');
    expect(doc.id).toMatch(/^doc-/);
    expect(doc.title).toBe('My Doc');
    expect(doc.content).toBe('<p>Hello</p>');
    expect(doc.isDirty).toBe(false);
    expect(typeof doc.createdAt).toBe('number');
  });

  it('filters documents by query in title and tags', () => {
    const docs: InkDocument[] = [
      { id: '1', title: 'Architecture Plan', content: '', tags: ['design'] },
      { id: '2', title: 'Sprint Retrospective', content: '', tags: ['team'] },
      { id: '3', title: 'Release Notes 1.1.9', content: '', tags: ['forge', 'release'] },
    ];

    expect(filterDocuments(docs, 'plan').length).toBe(1);
    expect(filterDocuments(docs, 'team').length).toBe(1);
    expect(filterDocuments(docs, '1.1.9').length).toBe(1);
    expect(filterDocuments(docs, 'non-existent').length).toBe(0);
    expect(filterDocuments(docs, '').length).toBe(3);
  });

  it('sorts documents by title and updatedAt', () => {
    const docs: InkDocument[] = [
      { id: '1', title: 'Zebra', content: '', updatedAt: 100 },
      { id: '2', title: 'Apple', content: '', updatedAt: 300 },
      { id: '3', title: 'Banana', content: '', updatedAt: 200 },
    ];

    const sortedByTitle = sortDocuments(docs, 'title');
    expect(sortedByTitle.map((d) => d.title)).toEqual(['Apple', 'Banana', 'Zebra']);

    const sortedByTime = sortDocuments(docs, 'updatedAt');
    expect(sortedByTime.map((d) => d.title)).toEqual(['Apple', 'Banana', 'Zebra']);
  });
});
