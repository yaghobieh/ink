import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('brand assets test', () => {
  const assetsDir = path.resolve(__dirname, '../../assets');

  it('contains valid ink logo file with PNG header', () => {
    const logoPath = path.join(assetsDir, 'ink-logo.png');
    expect(fs.existsSync(logoPath)).toBe(true);

    const stat = fs.statSync(logoPath);
    expect(stat.size).toBeGreaterThan(1000);

    const buffer = fs.readFileSync(logoPath);
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    expect(buffer[0]).toBe(0x89);
    expect(buffer[1]).toBe(0x50);
    expect(buffer[2]).toBe(0x4e);
    expect(buffer[3]).toBe(0x47);
  });

  it('contains valid ink hero banner asset', () => {
    const heroPath = path.join(assetsDir, 'ink-hero.png');
    expect(fs.existsSync(heroPath)).toBe(true);

    const stat = fs.statSync(heroPath);
    expect(stat.size).toBeGreaterThan(1000);

    const buffer = fs.readFileSync(heroPath);
    expect(buffer[0]).toBe(0x89);
    expect(buffer[1]).toBe(0x50);
    expect(buffer[2]).toBe(0x4e);
    expect(buffer[3]).toBe(0x47);
  });
});
