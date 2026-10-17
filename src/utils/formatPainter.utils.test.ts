import { describe, expect, it } from 'vitest';
import { changeCase } from './formatPainter.utils';

describe('changeCase', () => {
  it('changes upper, lower, and title case', () => {
    expect(changeCase('Hello Ink', 'upper')).toBe('HELLO INK');
    expect(changeCase('Hello Ink', 'lower')).toBe('hello ink');
    expect(changeCase('hello ink', 'title')).toBe('Hello Ink');
  });
});
