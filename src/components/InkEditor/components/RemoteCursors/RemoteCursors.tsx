import React from 'react';
import type { RemoteCursorsProps } from './RemoteCursors.types';
import {
  REMOTE_CURSOR_LINE_HEIGHT_PX,
  REMOTE_CURSOR_TOP_OFFSET_PX,
  REMOTE_CURSOR_MIN_TOP_PX,
  REMOTE_CURSOR_CHAR_WIDTH_PX,
  REMOTE_CURSOR_LEFT_OFFSET_PX,
  REMOTE_CURSOR_MIN_LEFT_PX,
} from './RemoteCursors.const';
import { NUMBER_ONE, NUMBER_ZERO, EMPTY_STRING } from '@const';
import { cn } from '@utils';

export const RemoteCursors: React.FC<RemoteCursorsProps> = ({
  collaborators,
  className = EMPTY_STRING,
}: RemoteCursorsProps) => {
  const activeCollaborators = (collaborators || []).filter(
    (collaborator) =>
      collaborator.cursor &&
      (collaborator.cursor.offset !== undefined || collaborator.cursor.line !== undefined)
  );

  if (activeCollaborators.length === NUMBER_ZERO) {
    return null;
  }

  return (
    <div
      className={cn('ink-remote-cursors-layer', className)}
      aria-hidden="true"
    >
      {activeCollaborators.map((collaborator) => {
        const line = collaborator.cursor?.line ?? NUMBER_ONE;
        const col = collaborator.cursor?.col ?? NUMBER_ZERO;
        const top = Math.max(
          REMOTE_CURSOR_MIN_TOP_PX,
          (line - NUMBER_ONE) * REMOTE_CURSOR_LINE_HEIGHT_PX + REMOTE_CURSOR_TOP_OFFSET_PX
        );
        const left = Math.max(
          REMOTE_CURSOR_MIN_LEFT_PX,
          col * REMOTE_CURSOR_CHAR_WIDTH_PX + REMOTE_CURSOR_LEFT_OFFSET_PX
        );

        return (
          <div
            key={collaborator.id}
            className="ink-remote-cursor-item"
            style={{
              top: `${top}px`,
              left: `${left}px`,
            }}
          >
            <div
              className="ink-remote-cursor-caret"
              style={{ backgroundColor: collaborator.color }}
            />
            <div
              className="ink-remote-cursor-tag"
              style={{ backgroundColor: collaborator.color }}
            >
              {collaborator.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
