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

export const sanitizePastedHtml = (html: string): string => {
  if (!html.trim()) return '';
  const template = document.createElement('template');
  template.innerHTML = html;
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
