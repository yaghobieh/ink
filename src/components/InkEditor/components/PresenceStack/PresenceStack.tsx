import React from 'react';
import type { InkCollaborator } from '@/types';
import type { PresenceStackProps } from './PresenceStack.types';
import {
  INK_PRESENCE_DEFAULT_MAX_AVATARS,
  PLUS_SIGN,
  IDLE_LABEL_SUFFIX,
  COLLAB_ARIA_REGION,
  COLLAB_ARIA_LABEL_PREFIX,
} from './PresenceStack.const';
import {
  NUMBER_ZERO,
  NUMBER_ONE,
  EMPTY_STRING,
  INK_STATUS_IDLE,
  INK_ROLE_EDITOR,
} from '@const';
import { cn, getCollaboratorInitials } from '@utils';
import { Button } from '@common-components';

const renderAvatarContent = (collaborator: InkCollaborator): React.ReactNode => {
  if (collaborator.avatarUrl) {
    return (
      <img
        src={collaborator.avatarUrl}
        alt={collaborator.name}
        className="ink-presence-avatar-img"
      />
    );
  } else {
    return (
      <span className="ink-presence-initials">
        {getCollaboratorInitials(collaborator.name)}
      </span>
    );
  }
};

export const PresenceStack: React.FC<PresenceStackProps> = (props: PresenceStackProps) => {
  const {
    collaborators,
    maxAvatars = INK_PRESENCE_DEFAULT_MAX_AVATARS,
    onFollow,
    className = EMPTY_STRING,
  } = props;

  if (!collaborators || collaborators.length === NUMBER_ZERO) {
    return null;
  }

  const visibleCollaborators = collaborators.slice(NUMBER_ZERO, maxAvatars);
  const hiddenCount = Math.max(NUMBER_ZERO, collaborators.length - maxAvatars);

  return (
    <div
      className={cn('ink-presence-stack', className)}
      role="region"
      aria-label={COLLAB_ARIA_REGION}
    >
      <div className="ink-presence-avatars">
        {visibleCollaborators.map((collaborator) => {
          const isIdle = collaborator.status === INK_STATUS_IDLE;
          const roleLabel = collaborator.role || INK_ROLE_EDITOR;
          const statusSuffix = isIdle ? IDLE_LABEL_SUFFIX : EMPTY_STRING;
          const buttonTitle = `${collaborator.name} (${roleLabel})${statusSuffix}`;

          return (
            <Button
              key={collaborator.id}
              type="button"
              className="ink-presence-avatar-btn"
              style={{ backgroundColor: collaborator.color }}
              title={buttonTitle}
              onClick={() => onFollow?.(collaborator)}
              aria-label={`${COLLAB_ARIA_LABEL_PREFIX}${collaborator.name}`}
            >
              {renderAvatarContent(collaborator)}
              <span
                className={cn(
                  'ink-presence-status-dot',
                  isIdle ? 'ink-presence-idle' : 'ink-presence-active'
                )}
              />
            </Button>
          );
        })}

        {hiddenCount > NUMBER_ZERO && (
          <div
            className="ink-presence-avatar-overflow"
            title={`${hiddenCount} more collaborator${hiddenCount > NUMBER_ONE ? 's' : EMPTY_STRING}`}
            aria-label={`${hiddenCount} more collaborator${hiddenCount > NUMBER_ONE ? 's' : EMPTY_STRING}`}
          >
            {PLUS_SIGN}
            {hiddenCount}
          </div>
        )}
      </div>
    </div>
  );
};
