import React from 'react';
import type { InkCollaborator } from '../../../../types/collab.types';

export interface PresenceStackProps {
  collaborators: InkCollaborator[];
  maxAvatars?: number;
  onFollow?: (collaborator: InkCollaborator) => void;
  className?: string;
}

export const PresenceStack: React.FC<PresenceStackProps> = ({
  collaborators,
  maxAvatars = 4,
  onFollow,
  className = '',
}) => {
  if (!collaborators || collaborators.length === 0) {
    return null;
  }

  const visibleCollaborators = collaborators.slice(0, maxAvatars);
  const hiddenCount = Math.max(0, collaborators.length - maxAvatars);

  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || '?').toUpperCase();
  };

  return (
    <div
      className={`ink-presence-stack ${className}`.trim()}
      role="region"
      aria-label="Active collaborators"
    >
      <div className="ink-presence-avatars">
        {visibleCollaborators.map((c) => (
          <button
            key={c.id}
            type="button"
            className="ink-presence-avatar-btn"
            style={{ backgroundColor: c.color }}
            title={`${c.name} (${c.role || 'editor'})${c.status === 'idle' ? ' - Idle' : ''}`}
            onClick={() => onFollow?.(c)}
            aria-label={`Collaborator ${c.name}`}
          >
            {c.avatarUrl ? (
              <img src={c.avatarUrl} alt={c.name} className="ink-presence-avatar-img" />
            ) : (
              <span className="ink-presence-initials">{getInitials(c.name)}</span>
            )}
            <span
              className={`ink-presence-status-dot ${c.status === 'idle' ? 'ink-presence-idle' : 'ink-presence-active'}`}
            />
          </button>
        ))}

        {hiddenCount > 0 && (
          <div
            className="ink-presence-avatar-overflow"
            title={`${hiddenCount} more collaborator${hiddenCount > 1 ? 's' : ''}`}
            aria-label={`${hiddenCount} more collaborator${hiddenCount > 1 ? 's' : ''}`}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    </div>
  );
};
