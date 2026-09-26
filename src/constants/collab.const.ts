import {
  NUMBER_FOUR,
  NUMBER_FOURTEEN,
  NUMBER_TWO,
  NUMBER_FIVE,
  NUMBER_EIGHT,
  NUMBER_SIX,
  NUMBER_TWENTY_EIGHT,
} from './numbers';
import type { InkCollaborator, InkCollaboratorRole, InkCollaboratorStatus } from '../types/collab.types';

export const INK_DEFAULT_ROOM_ID = 'default-room';
export const INK_PRESENCE_DEFAULT_MAX_AVATARS = NUMBER_FOUR;
export const PLUS_SIGN = '+';
export const ID_PREFIX_COLLAB = 'collab';
export const INK_STATUS_ACTIVE: InkCollaboratorStatus = 'active';
export const INK_STATUS_IDLE: InkCollaboratorStatus = 'idle';
export const INK_STATUS_OFFLINE: InkCollaboratorStatus = 'offline';
export const INK_ROLE_EDITOR: InkCollaboratorRole = 'editor';
export const INK_ROLE_COMMENTER: InkCollaboratorRole = 'commenter';
export const INK_ROLE_VIEWER: InkCollaboratorRole = 'viewer';
export const DEFAULT_INITIAL = '?';
export const IDLE_LABEL_SUFFIX = ' - Idle';

/**
 * Palette for collaborator cursors and presence avatars.
 * Supports theme token overrides through CSS custom properties with hex fallbacks.
 */
export const COLLAB_THEME_COLORS = [
  'var(--ink-collab-1, #3B82F6)', // Blue
  'var(--ink-collab-2, #10B981)', // Emerald
  'var(--ink-collab-3, #8B5CF6)', // Purple
  'var(--ink-collab-4, #F59E0B)', // Amber
  'var(--ink-collab-5, #EC4899)', // Pink
  'var(--ink-collab-6, #06B6D4)', // Cyan
  'var(--ink-collab-7, #F97316)', // Orange
];

export const DEFAULT_DEMO_COLLABORATORS: InkCollaborator[] = [
  {
    id: 'collab-1',
    name: 'Sarah Connor',
    color: '#3B82F6',
    status: INK_STATUS_ACTIVE,
    role: INK_ROLE_EDITOR,
    cursor: { line: NUMBER_TWO, col: NUMBER_FOURTEEN, offset: 42 },
  },
  {
    id: 'collab-2',
    name: 'Albert Specialist',
    color: '#10B981',
    status: INK_STATUS_ACTIVE,
    role: INK_ROLE_EDITOR,
    cursor: { line: NUMBER_FIVE, col: NUMBER_TWENTY_EIGHT, offset: 110 },
  },
  {
    id: 'collab-3',
    name: 'Elena Rostova',
    color: '#8B5CF6',
    status: INK_STATUS_IDLE,
    role: INK_ROLE_COMMENTER,
    cursor: { line: NUMBER_EIGHT, col: NUMBER_SIX, offset: 180 },
  },
];
