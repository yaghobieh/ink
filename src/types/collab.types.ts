export interface InkCollaboratorCursorSelection {
  start: number;
  end: number;
  text?: string;
}

export interface InkCollaboratorCursor {
  blockId?: string;
  line?: number;
  col?: number;
  offset?: number;
  selection?: InkCollaboratorCursorSelection;
}

export type InkCollaboratorRole = 'editor' | 'commenter' | 'viewer';
export type InkCollaboratorStatus = 'active' | 'idle' | 'offline';

export interface InkCollaborator {
  id: string;
  name: string;
  color: string;
  avatarUrl?: string;
  cursor?: InkCollaboratorCursor;
  status?: InkCollaboratorStatus;
  lastActive?: number;
  role?: InkCollaboratorRole;
}

export interface InkCollaborationConfig {
  enabled?: boolean;
  roomId?: string;
  user?: InkCollaborator;
  collaborators?: InkCollaborator[];
  onCollaboratorsChange?: (collaborators: InkCollaborator[]) => void;
  onBroadcastCursor?: (cursor: InkCollaboratorCursor) => void;
  showPresenceStack?: boolean;
  showRemoteCursors?: boolean;
  maxAvatars?: number;
  serverUrl?: string;
}

export interface UseInkCollaborationOptions {
  roomId?: string;
  user?: InkCollaborator;
  initialCollaborators?: InkCollaborator[];
  serverUrl?: string;
  simulateDemo?: boolean;
}

export interface UseInkCollaborationReturn {
  collaborators: InkCollaborator[];
  isConnected: boolean;
  broadcastCursor: (cursor: InkCollaboratorCursor) => void;
  broadcastSelection: (start: number, end: number, text?: string) => void;
  addCollaborator: (collaborator: InkCollaborator) => void;
  removeCollaborator: (id: string) => void;
  updateCollaboratorStatus: (id: string, status: InkCollaboratorStatus) => void;
  setCollaborators: (collaborators: InkCollaborator[] | ((prev: InkCollaborator[]) => InkCollaborator[])) => void;
}

