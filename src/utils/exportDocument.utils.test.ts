import { describe, expect, it } from 'vitest';
import { buildDocx, buildPrintDocument, crc32, htmlToDocxParagraphs } from './exportDocument.utils';

describe('exportDocument.utils', () => {
  it('computes the standard crc32 of 123456789', () => {
    expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
  });

  it('builds a docx zip that contains the paragraph text', () => {
    const bytes = buildDocx('<h1>Contract</h1><p>Signed</p>');
    const text = new TextDecoder().decode(bytes);
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
    expect(text).toContain('word/document.xml');
    expect(text).toContain('Contract');
    expect(text).toContain('Signed');
    expect(htmlToDocxParagraphs('<p>Hello</p>')).toEqual(['Hello']);
  });

  it('wraps html for print', () => {
    const page = buildPrintDocument('<p>Hello</p>');
    expect(page).toContain('<p>Hello</p>');
    expect(page).toContain('<title>Ink document</title>');
  });
});
