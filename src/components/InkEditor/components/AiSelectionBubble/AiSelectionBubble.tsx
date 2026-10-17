import type { FC } from 'react';
import {
  AI_SELECTION_ACTIONS,
  AI_SELECTION_APPLY_LABEL,
  AI_SELECTION_BUBBLE_ARIA_LABEL,
  AI_SELECTION_BUBBLE_CLASS,
  AI_SELECTION_BUSY_LABEL,
  AI_SELECTION_DISMISS_LABEL,
} from './AiSelectionBubble.const';
import type { AiSelectionBubbleProps } from './AiSelectionBubble.types';

export const AiSelectionBubble: FC<AiSelectionBubbleProps> = (props) => {
  const { open, top, left, busy, preview, onAction, onApply, onDismiss } = props;
  if (!open) return null;

  return (
    <div
      className={AI_SELECTION_BUBBLE_CLASS}
      style={{ top, left }}
      role="toolbar"
      aria-label={AI_SELECTION_BUBBLE_ARIA_LABEL}
    >
      {AI_SELECTION_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          className="Ink-Editor__button"
          disabled={busy}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onAction(action.id)}
        >
          {action.label}
        </button>
      ))}
      {busy ? <span className="Ink-AiSelection__status">{AI_SELECTION_BUSY_LABEL}</span> : null}
      {preview ? (
        <>
          <button
            type="button"
            className="Ink-Editor__button Ink-Editor__button--active"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onApply}
          >
            {AI_SELECTION_APPLY_LABEL}
          </button>
          <button
            type="button"
            className="Ink-Editor__button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onDismiss}
          >
            {AI_SELECTION_DISMISS_LABEL}
          </button>
        </>
      ) : null}
    </div>
  );
};
