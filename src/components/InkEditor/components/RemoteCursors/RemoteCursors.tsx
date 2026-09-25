import React from 'react';
import type { InkCollaborator } from '../../../../types/collab.types';

export interface RemoteCursorsProps {
  collaborators: InkCollaborator[];
  className?: string;
}

export const RemoteCursors: React.FC<RemoteCursorsProps> = ({
  collaborators,
  className = '',
}) => {
  const activeCollaborators = (collaborators || []).filter(
    (c) => c.cursor && (c.cursor.offset !== undefined || c.cursor.line !== undefined)
  );

  if (activeCollaborators.length === 0) {
    return null;
  }

  return (
    <div
      className={`ink-remote-cursors-layer ${className}`.trim()}
      aria-hidden="true"
    >
      {activeCollaborators.map((c) => {
        const line = c.cursor?.line ?? 1;
        const col = c.cursor?.col ?? 0;
        // Approximate visual coordinates based on line height (28px) and char width (8.5px) or relative block placement
        const top = Math.max(12, (line - 1) * 28 + 14);
        const left = Math.max(16, col * 8.5 + 24);

        return (
          <div
            key={c.id}
            className="ink-remote-cursor-item"
            style={{
              top: `${top}px`,
              left: `${left}px`,
            }}
          >
            <div
              className="ink-remote-cursor-caret"
              style={{ backgroundColor: c.color }}
            />
            <div
              className="ink-remote-cursor-tag"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
