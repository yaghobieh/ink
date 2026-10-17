import {
  INK_PASTE_ALLOWED_ATTRS,
  INK_PASTE_ALLOWED_TAGS,
} from '../constants';

const ALLOWED_TAG_SET = new Set<string>(INK_PASTE_ALLOWED_TAGS);
const ALLOWED_ATTR_SET = new Set<string>(INK_PASTE_ALLOWED_ATTRS);

const sanitizeNode = (node: Node, parent: ParentNode): void => {
  if (node.nodeType === Node.TEXT_NODE) {
    parent.appendChild(node.cloneNode(true));
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();

  if (tag === 'script' || tag === 'style' || tag === 'iframe' || tag === 'object') {
    return;
  }

  if (!ALLOWED_TAG_SET.has(tag)) {
    Array.from(element.childNodes).forEach((child) => sanitizeNode(child, parent));
    return;
  }

  const clean = document.createElement(tag);
  Array.from(element.attributes).forEach((attr) => {
    const name = attr.name.toLowerCase();
    if (!ALLOWED_ATTR_SET.has(name)) return;
    if (name.startsWith('on')) return;
    if ((name === 'href' || name === 'src') && attr.value.trim().toLowerCase().startsWith('javascript:')) {
      return;
    }
    clean.setAttribute(attr.name, attr.value);
  });

  Array.from(element.childNodes).forEach((child) => sanitizeNode(child, clean));
  parent.appendChild(clean);
};

const OFFICE_HTML_PATTERN = /mso-|urn:schemas-microsoft-com|docs-internal-guid/i;
const OFFICE_LIST_CLASS = /MsoListParagraph/i;
const OFFICE_LIST_STYLE = /mso-list/i;

const unwrapElement = (element: Element): void => {
  const parent = element.parentNode;
  if (!parent) return;
  while (element.firstChild) parent.insertBefore(element.firstChild, element);
  element.remove();
};

export const isOfficeHtml = (html: string): boolean => OFFICE_HTML_PATTERN.test(html);

export const cleanOfficeHtml = (html: string): string => {
  if (!html.trim() || !isOfficeHtml(html)) return html;
  const root = document.createElement('div');
  root.innerHTML = html;
  root.querySelectorAll('style, meta, link, script').forEach((node) => node.remove());

  let list: HTMLUListElement | null = null;
  Array.from(root.querySelectorAll('p')).forEach((paragraph) => {
    const style = paragraph.getAttribute('style') ?? '';
    const className = paragraph.getAttribute('class') ?? '';
    const isItem = OFFICE_LIST_CLASS.test(className) || OFFICE_LIST_STYLE.test(style);
    if (!isItem) {
      list = null;
      return;
    }
    const item = document.createElement('li');
    item.innerHTML = paragraph.innerHTML;
    if (!list) {
      list = document.createElement('ul');
      paragraph.replaceWith(list);
    } else {
      paragraph.remove();
    }
    list.appendChild(item);
  });

  Array.from(root.querySelectorAll('*')).forEach((element) => {
    const tag = element.tagName.toLowerCase();
    if (tag.includes(':')) {
      unwrapElement(element);
      return;
    }
    Array.from(element.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value;
      if (name === 'style' && /mso-|docs-/i.test(value)) element.removeAttribute(attr.name);
      if (name === 'class' && /mso|apple-|docs-/i.test(value)) element.removeAttribute(attr.name);
      if (name === 'id' && /docs-internal/i.test(value)) element.removeAttribute(attr.name);
    });
    if (tag === 'span' && element.attributes.length === 0) unwrapElement(element);
  });

  return root.innerHTML;
};

export const sanitizePastedHtml = (html: string): string => {
  const source = isOfficeHtml(html) ? cleanOfficeHtml(html) : html;
  if (!source.trim()) return '';
  const template = document.createElement('template');
  template.innerHTML = source;
  const output = document.createElement('div');
  Array.from(template.content.childNodes).forEach((child) => sanitizeNode(child, output));
  return output.innerHTML;
};

export const extractClipboardHtml = (data: DataTransfer | null): string => {
  if (!data) return '';
  return data.getData('text/html') || '';
};

export const extractClipboardText = (data: DataTransfer | null): string => {
  if (!data) return '';
  return data.getData('text/plain') || '';
};
