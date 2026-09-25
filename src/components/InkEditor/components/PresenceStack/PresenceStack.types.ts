import type { InkCollaborator } from '@/types';

export interface PresenceStackProps {
  collaborators: InkCollaborator[];
  maxAvatars?: number;
  onFollow?: (collaborator: InkCollaborator) => void;
  className?: string;
}
