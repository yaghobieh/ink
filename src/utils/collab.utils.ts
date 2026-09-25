import type {
  InkCollaborator,
  InkCollaboratorRole,
} from '@/types';
import {
  COLLAB_THEME_COLORS,
  DEFAULT_INITIAL,
  ID_PREFIX_COLLAB,
  INK_ROLE_EDITOR,
  INK_STATUS_OFFLINE,
  NUMBER_ZERO,
  NUMBER_TWO,
  NUMBER_SEVEN,
  NUMBER_THIRTY_SIX,
} from '@const';

export const getCollaboratorInitials = (name: string): string => {
  const clean = name.trim();
  if (!clean) return DEFAULT_INITIAL;
  const parts = clean.split(/\s+/);
  if (parts.length >= NUMBER_TWO) {
    return (parts[NUMBER_ZERO][NUMBER_ZERO] + parts[1][NUMBER_ZERO]).toUpperCase();
  }
  return parts[NUMBER_ZERO][NUMBER_ZERO].toUpperCase();
};

export const filterActiveCollaborators = (
  collaborators: InkCollaborator[]
): InkCollaborator[] => {
  return (collaborators || []).filter(
    (collaborator) => collaborator.status !== INK_STATUS_OFFLINE
  );
};

export const createDefaultCollaborator = (
  name: string,
  role: InkCollaboratorRole = INK_ROLE_EDITOR
): InkCollaborator => {
  const colorIndex = Math.abs(
    name.split('').reduce((accumulator, char) => accumulator + char.charCodeAt(NUMBER_ZERO), NUMBER_ZERO)
  ) % COLLAB_THEME_COLORS.length;

  return {
    id: `${ID_PREFIX_COLLAB}-${Date.now()}-${Math.random().toString(NUMBER_THIRTY_SIX).slice(NUMBER_TWO, NUMBER_SEVEN)}`,
    name,
    color: COLLAB_THEME_COLORS[colorIndex],
    role,
    status: 'active',
    lastActive: Date.now(),
  };
};
