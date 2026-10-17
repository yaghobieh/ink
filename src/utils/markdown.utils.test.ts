import { describe, expect, it } from 'vitest';
import { htmlToMarkdown, markdownToHtml } from './markdown.utils';

describe('markdown.utils', () => {
  it('exports headings, lists, quotes, and code', () => {
    const markdown = htmlToMarkdown(
      '<h1>Title</h1><p>Hello <strong>Ink</strong></p><ul><li>One</li></ul><blockquote><p>Note</p></blockquote><pre><code>const a = 1;</code></pre>',
    );
    expect(markdown).toContain('# Title');
    expect(markdown).toContain('**Ink**');
    expect(markdown).toContain('- One');
    expect(markdown).toContain('> Note');
    expect(markdown).toContain('```');
    expect(markdown).toContain('const a = 1;');
  });

  it('imports markdown back into editor html', () => {
    const html = markdownToHtml('# Title\n\n- One\n- Two\n\n> Note\n\n```\nconst a = 1;\n```');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<ul><li>One</li><li>Two</li></ul>');
    expect(html).toContain('<blockquote><p>Note</p></blockquote>');
    expect(html).toContain('<pre><code>const a = 1;</code></pre>');
  });

  it('round-trips a numbered list', () => {
    const html = markdownToHtml('1. First\n2. Second');
    expect(htmlToMarkdown(html)).toContain('1. First');
    expect(htmlToMarkdown(html)).toContain('2. Second');
  });
});
