const CRC32_POLYNOMIAL = 0xedb88320;
const ZIP_LOCAL_HEADER = 0x04034b50;
const ZIP_CENTRAL_HEADER = 0x02014b50;
const ZIP_END_HEADER = 0x06054b50;
const ZIP_VERSION = 20;

const crcTable = new Uint32Array(256);
for (let index = 0; index < crcTable.length; index += 1) {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? CRC32_POLYNOMIAL ^ (value >>> 1) : value >>> 1;
  }
  crcTable[index] = value >>> 0;
}

export const crc32 = (data: Uint8Array): number => {
  let crc = 0xffffffff;
  data.forEach((byte) => {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  });
  return (crc ^ 0xffffffff) >>> 0;
};

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

const writeUint16 = (view: DataView, offset: number, value: number): void => {
  view.setUint16(offset, value, true);
};

const writeUint32 = (view: DataView, offset: number, value: number): void => {
  view.setUint32(offset, value, true);
};

export const createStoredZip = (entries: ZipEntry[]): Uint8Array => {
  const encoder = new TextEncoder();
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  entries.forEach((entry) => {
    const name = encoder.encode(entry.name);
    const checksum = crc32(entry.data);
    const local = new Uint8Array(30 + name.length + entry.data.length);
    const localView = new DataView(local.buffer);
    writeUint32(localView, 0, ZIP_LOCAL_HEADER);
    writeUint16(localView, 4, ZIP_VERSION);
    writeUint16(localView, 8, 0);
    writeUint32(localView, 14, checksum);
    writeUint32(localView, 18, entry.data.length);
    writeUint32(localView, 22, entry.data.length);
    writeUint16(localView, 26, name.length);
    local.set(name, 30);
    local.set(entry.data, 30 + name.length);
    locals.push(local);

    const central = new Uint8Array(46 + name.length);
    const centralView = new DataView(central.buffer);
    writeUint32(centralView, 0, ZIP_CENTRAL_HEADER);
    writeUint16(centralView, 4, ZIP_VERSION);
    writeUint16(centralView, 6, ZIP_VERSION);
    writeUint32(centralView, 16, checksum);
    writeUint32(centralView, 20, entry.data.length);
    writeUint32(centralView, 24, entry.data.length);
    writeUint16(centralView, 28, name.length);
    writeUint32(centralView, 42, offset);
    central.set(name, 46);
    centrals.push(central);
    offset += local.length;
  });
  const centralSize = centrals.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  writeUint32(endView, 0, ZIP_END_HEADER);
  writeUint16(endView, 8, entries.length);
  writeUint16(endView, 10, entries.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, offset);
  const total = offset + centralSize + end.length;
  const output = new Uint8Array(total);
  let cursor = 0;
  [...locals, ...centrals, end].forEach((part) => {
    output.set(part, cursor);
    cursor += part.length;
  });
  return output;
};

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const htmlToDocxParagraphs = (html: string): string[] => {
  const root = document.createElement('div');
  root.innerHTML = html;
  const blocks = Array.from(root.childNodes)
    .map((node) => (node.textContent ?? '').replace(/\s+/g, ' ').trim())
    .filter((text) => text.length > 0);
  return blocks.length > 0 ? blocks : [''];
};

const docxDocumentXml = (paragraphs: string[]): string => {
  const body = paragraphs
    .map((paragraph) => `<w:p><w:r><w:t xml:space="preserve">${escapeXml(paragraph)}</w:t></w:r></w:p>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr/></w:body></w:document>`;
};

export const DOCX_FILENAME = 'document.docx';
export const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export const PRINT_TITLE = 'Ink document';

export const buildDocx = (html: string): Uint8Array => {
  const encoder = new TextEncoder();
  const files: ZipEntry[] = [
    {
      name: '[Content_Types].xml',
      data: encoder.encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
      ),
    },
    {
      name: '_rels/.rels',
      data: encoder.encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
      ),
    },
    {
      name: 'word/document.xml',
      data: encoder.encode(docxDocumentXml(htmlToDocxParagraphs(html))),
    },
  ];
  return createStoredZip(files);
};

export const buildPrintDocument = (html: string, title = PRINT_TITLE): string =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeXml(title)}</title></head><body>${html}</body></html>`;

export const downloadBytes = (filename: string, bytes: Uint8Array, mime: string): void => {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const printHtmlDocument = (html: string): void => {
  const frame = document.createElement('iframe');
  frame.setAttribute('aria-hidden', 'true');
  frame.style.position = 'fixed';
  frame.style.width = '0';
  frame.style.height = '0';
  frame.style.border = '0';
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  if (!doc || !frame.contentWindow) {
    frame.remove();
    return;
  }
  doc.open();
  doc.write(buildPrintDocument(html));
  doc.close();
  frame.contentWindow.focus();
  frame.contentWindow.print();
  window.setTimeout(() => frame.remove(), 1000);
};
