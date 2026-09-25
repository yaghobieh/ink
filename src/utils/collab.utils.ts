import type {
  InkCollaborator,
  InkCollaboratorRole,
} from '../types/collab.types';

const COLLAB_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

export const getCollaboratorInitials = (name: string): string => {
  const clean = name.trim();
  if (!clean) return '?';
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

export const filterActiveCollaborators = (
  collaborators: InkCollaborator[]
): InkCollaborator[] => {
  return (collaborators || []).filter(
    (c) => c.status !== 'offline'
  );
};

export const createDefaultCollaborator = (
  name: string,
  role: InkCollaboratorRole = 'editor'
): InkCollaborator => {
  const colorIndex = Math.abs(
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % COLLAB_COLORS.length;

  return {
    id: `collab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    color: COLLAB_COLORS[colorIndex],
    role,
    status: 'active',
    lastActive: Date.now(),
  };
};
