import type { ToolbarOption } from '../../../types';

export const execCommand = (command: string, value?: string): boolean =>
  document.execCommand(command, false, value);

export const queryCommandState = (command: string): boolean =>
  document.queryCommandState(command);

export const queryCommandValue = (command: string): string =>
  document.queryCommandValue(command);

export const insertLink = (url: string): boolean => {
  if (!url) return false;
  const formattedUrl =
    url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')
      ? url
      : `https://${url}`;
  return execCommand('createLink', formattedUrl);
};

export const setTextColor = (color: string): boolean => execCommand('foreColor', color);

export const setHighlightColor = (color: string): boolean => execCommand('hiliteColor', color);

export const insertHTML = (html: string): boolean => execCommand('insertHTML', html);

export const insertImage = (src: string, alt = ''): boolean => {
  const safeAlt = alt.replace(/"/g, '&quot;');
  return insertHTML(`<img src="${src}" alt="${safeAlt}" style="max-width:100%;height:auto;" />`);
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const getActiveFormats = (): Set<string> => {
  const formats = new Set<string>();
  if (queryCommandState('bold')) formats.add('bold');
  if (queryCommandState('italic')) formats.add('italic');
  if (queryCommandState('underline')) formats.add('underline');
  if (queryCommandState('strikeThrough')) formats.add('strikethrough');
  if (queryCommandState('insertUnorderedList')) formats.add('bulletList');
  if (queryCommandState('insertOrderedList')) formats.add('orderedList');
  return formats;
};

export const applyFormat = (format: ToolbarOption): boolean => {
  switch (format) {
    case 'bold':
      return execCommand('bold');
    case 'italic':
      return execCommand('italic');
    case 'underline':
      return execCommand('underline');
    case 'strikethrough':
      return execCommand('strikeThrough');
    case 'heading1':
      return execCommand('formatBlock', 'h1');
    case 'heading2':
      return execCommand('formatBlock', 'h2');
    case 'heading3':
      return execCommand('formatBlock', 'h3');
    case 'bulletList':
      return execCommand('insertUnorderedList');
    case 'orderedList':
      return execCommand('insertOrderedList');
    default:
      return false;
  }
};
