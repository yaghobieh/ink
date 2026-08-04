import { describe, expect, it } from 'vitest';
import { replaceInHtml } from './findReplace.utils';
import { buildInkMemoryKey } from './memory.utils';
import { isLocalStorageAvailable } from './storage.utils';

describe('replaceInHtml', () => {
  it('replaces text nodes only', () => {
    const html = '<p class="find-me">find me</p>';
    const next = replaceInHtml(html, 'find', 'seek', true);
    expect(next).toContain('class="find-me"');
    expect(next).toContain('seek me');
  });

  it('replaces first match only when replaceAll is false', () => {
    const html = '<p>one one</p>';
    const next = replaceInHtml(html, 'one', 'two', false);
    expect(next).toBe('<p>two one</p>');
  });
});

describe('memory utils', () => {
  it('builds prefixed keys', () => {
    expect(buildInkMemoryKey('editor-a')).toBe('ink-memory:editor-a');
    expect(buildInkMemoryKey()).toBe('ink-memory:default');
  });

  it('detects localStorage availability', () => {
    expect(typeof isLocalStorageAvailable()).toBe('boolean');
  });
});
