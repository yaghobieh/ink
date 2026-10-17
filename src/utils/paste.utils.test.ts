import { describe, expect, it } from 'vitest';
import { cleanOfficeHtml, sanitizePastedHtml } from './paste.utils';

describe('office paste', () => {
  it('keeps a heading, link, and table and drops mso styles', () => {
    const html = sanitizePastedHtml(
      '<h1 style="mso-style-name:heading1">Title</h1><p class="MsoNormal" style="mso-fareast-font-family:Calibri">See <a href="https://inkforgejs.com">Ink</a></p><table><tr><td>A</td></tr></table>',
    );
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('href="https://inkforgejs.com"');
    expect(html).toContain('<td>A</td>');
    expect(html).not.toContain('mso-');
  });

  it('turns Word list paragraphs into a list', () => {
    const html = cleanOfficeHtml(
      '<p class="MsoListParagraph" style="mso-list:l0 level1">One</p><p class="MsoListParagraph" style="mso-list:l0 level1">Two</p>',
    );
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>One</li>');
    expect(html).toContain('<li>Two</li>');
    expect(html).not.toContain('MsoListParagraph');
  });

  it('unwraps a Google Docs internal span', () => {
    const html = cleanOfficeHtml('<b id="docs-internal-guid-1" style="font-weight:normal"><span>Hello</span></b>');
    expect(html).toContain('Hello');
    expect(html).not.toContain('docs-internal');
  });
});
