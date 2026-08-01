import { describe, expect, it } from 'vitest';
import { applyTypoAutoFix } from './typo.utils';

describe('applyTypoAutoFix', () => {
  it('fixes common typos outside HTML tags', () => {
    const result = applyTypoAutoFix('<p>teh quick fox</p>');
    expect(result.html).toBe('<p>the quick fox</p>');
    expect(result.fixedCount).toBe(1);
  });

  it('preserves casing', () => {
    const result = applyTypoAutoFix('<p>Teh End</p>');
    expect(result.html).toBe('<p>The End</p>');
  });

  it('does not rewrite attributes', () => {
    const result = applyTypoAutoFix('<a href="/teh">link</a>');
    expect(result.html).toBe('<a href="/teh">link</a>');
  });
});
