const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const inlineToMarkdown = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  if (!(node instanceof HTMLElement)) return '';
  const tag = node.tagName.toLowerCase();
  const inner = Array.from(node.childNodes).map((child) => inlineToMarkdown(child)).join('');
  if (tag === 'strong' || tag === 'b') return `**${inner}**`;
  if (tag === 'em' || tag === 'i') return `*${inner}*`;
  if (tag === 'code') return `\`${inner}\``;
  if (tag === 'a') return `[${inner}](${node.getAttribute('href') ?? ''})`;
  if (tag === 'br') return '  \n';
  return inner;
};

const listToMarkdown = (list: HTMLElement): string => {
  const ordered = list.tagName.toLowerCase() === 'ol';
  return Array.from(list.children)
    .map((item, index) => {
      const marker = ordered ? `${index + 1}. ` : '- ';
      return `${marker}${inlineToMarkdown(item).trim()}`;
    })
    .join('\n');
};

const tableToMarkdown = (table: HTMLElement): string => {
  const rows = Array.from(table.querySelectorAll('tr')).map((row) =>
    Array.from(row.children).map((cell) => inlineToMarkdown(cell).trim().replace(/\|/g, '\\|')),
  );
  if (rows.length === 0) return '';
  const width = Math.max(...rows.map((row) => row.length));
  const normalized = rows.map((row) => {
    const next = [...row];
    while (next.length < width) next.push('');
    return `| ${next.join(' | ')} |`;
  });
  const divider = `| ${Array.from({ length: width }, () => '---').join(' | ')} |`;
  return [normalized[0], divider, ...normalized.slice(1)].join('\n');
};

const blockToMarkdown = (node: Node): string => {
  if (!(node instanceof HTMLElement)) return (node.textContent ?? '').trim();
  const tag = node.tagName.toLowerCase();
  if (/^h[1-6]$/.test(tag)) {
    const level = Number(tag.slice(1));
    return `${'#'.repeat(level)} ${inlineToMarkdown(node).trim()}`;
  }
  if (tag === 'ul' || tag === 'ol') return listToMarkdown(node);
  if (tag === 'pre') return `\`\`\`\n${node.textContent ?? ''}\n\`\`\``;
  if (tag === 'blockquote') return `> ${inlineToMarkdown(node).trim()}`;
  if (tag === 'hr') return '---';
  if (tag === 'table') return tableToMarkdown(node);
  return inlineToMarkdown(node).trim();
};

export const htmlToMarkdown = (html: string): string => {
  const root = document.createElement('div');
  root.innerHTML = html;
  return Array.from(root.childNodes)
    .map((node) => blockToMarkdown(node))
    .filter((block) => block.trim().length > 0)
    .join('\n\n');
};

const inlineMarkdownToHtml = (value: string): string => {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
};

export const markdownToHtml = (markdown: string): string => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index] ?? '';
    if (line.startsWith('```')) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !(lines[index] ?? '').startsWith('```')) {
        code.push(escapeHtml(lines[index] ?? ''));
        index += 1;
      }
      blocks.push(`<pre><code>${code.join('\n')}</code></pre>`);
      index += 1;
      continue;
    }
    if (!line.trim()) {
      index += 1;
      continue;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (index < lines.length && /^[-*] /.test(lines[index] ?? '')) {
        items.push(`<li>${inlineMarkdownToHtml((lines[index] ?? '').slice(2))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index] ?? '')) {
        items.push(
          `<li>${inlineMarkdownToHtml((lines[index] ?? '').replace(/^\d+\. /, ''))}</li>`,
        );
        index += 1;
      }
      blocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }
    if (line.trim() === '---') {
      blocks.push('<hr />');
    } else if (line.startsWith('### ')) {
      blocks.push(`<h3>${inlineMarkdownToHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      blocks.push(`<h2>${inlineMarkdownToHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      blocks.push(`<h1>${inlineMarkdownToHtml(line.slice(2))}</h1>`);
    } else if (line.startsWith('> ')) {
      blocks.push(`<blockquote><p>${inlineMarkdownToHtml(line.slice(2))}</p></blockquote>`);
    } else {
      blocks.push(`<p>${inlineMarkdownToHtml(line)}</p>`);
    }
    index += 1;
  }
  return blocks.join('');
};

export const MARKDOWN_EXPORT_FILENAME = 'document.md';
export const MARKDOWN_ACCEPT = '.md,text/markdown,text/plain';
export const MARKDOWN_MIME = 'text/markdown';

export const downloadTextFile = (filename: string, contents: string, mime: string): void => {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
