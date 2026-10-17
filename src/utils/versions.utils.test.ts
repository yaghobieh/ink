import { beforeEach, describe, expect, it } from 'vitest';
import { listVersions, saveVersion } from './versions.utils';

describe('versions.utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and lists a named snapshot', () => {
    saveVersion('doc', '<p>Hello</p>', 'Draft 1');
    const versions = listVersions('doc');
    expect(versions).toHaveLength(1);
    expect(versions[0]?.name).toBe('Draft 1');
    expect(versions[0]?.html).toBe('<p>Hello</p>');
  });

  it('keeps the newest snapshot first', () => {
    saveVersion('doc', '<p>One</p>', 'One');
    saveVersion('doc', '<p>Two</p>', 'Two');
    expect(listVersions('doc').map((version) => version.name)).toEqual(['Two', 'One']);
  });
});
