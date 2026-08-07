import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'src/styles/ink.scss');
const dest = resolve(root, 'dist/styles.css');

const result = sass.compile(src, {
  style: 'compressed',
  loadPaths: [resolve(root, 'src/styles')],
});

mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(dest, result.css);
