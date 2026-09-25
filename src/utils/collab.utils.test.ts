import { describe, expect, it } from 'vitest';
import {
  getCollaboratorInitials,
  filterActiveCollaborators,
  createDefaultCollaborator,
} from './collab.utils';
import type { InkCollaborator } from '../types/collab.types';

describe('collab.utils', () => {
  it('extracts initials correctly', () => {
    expect(getCollaboratorInitials('John Doe')).toBe('JD');
    expect(getCollaboratorInitials('Sarah')).toBe('S');
    expect(getCollaboratorInitials('   ')).toBe('?');
  });

  it('filters active collaborators', () => {
    const list: InkCollaborator[] = [
      { id: '1', name: 'Alice', color: '#111', status: 'active' },
      { id: '2', name: 'Bob', color: '#222', status: 'idle' },
      { id: '3', name: 'Charlie', color: '#333', status: 'offline' },
    ];
    const filtered = filterActiveCollaborators(list);
    expect(filtered.length).toBe(2);
    expect(filtered.map((c) => c.name)).toEqual(['Alice', 'Bob']);
  });

  it('creates default collaborator with valid properties', () => {
    const collab = createDefaultCollaborator('Jane Dev', 'editor');
    expect(collab.id).toMatch(/^collab-/);
    expect(collab.name).toBe('Jane Dev');
    expect(collab.role).toBe('editor');
    expect(collab.status).toBe('active');
    expect(typeof collab.color).toBe('string');
  });
});
