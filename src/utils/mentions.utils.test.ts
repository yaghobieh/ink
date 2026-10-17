import { describe, expect, it } from 'vitest';
import { buildMentionHtml, extractMentionQuery, filterMentionPeople } from './mentions.utils';

describe('mentions.utils', () => {
  it('reads the query after @', () => {
    expect(extractMentionQuery('Hello @jo')).toBe('jo');
    expect(extractMentionQuery('Hello')).toBeNull();
  });

  it('filters people by the query', () => {
    const people = [
      { id: '1', label: 'John' },
      { id: '2', label: 'Ada' },
    ];
    expect(filterMentionPeople(people, 'jo').map((person) => person.label)).toEqual(['John']);
  });

  it('builds a mention chip', () => {
    expect(buildMentionHtml('u1', 'Ada')).toContain('data-mention-id="u1"');
    expect(buildMentionHtml('u1', 'Ada')).toContain('@Ada');
  });
});
