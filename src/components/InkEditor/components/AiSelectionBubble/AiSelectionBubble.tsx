import type { FC, PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  AI_SELECTION_ACTIONS,
  AI_SELECTION_ACTION_ACTIVE_CLASS,
  AI_SELECTION_ACTION_CLASS,
  AI_SELECTION_APPLY_LABEL,
  AI_SELECTION_BUBBLE_ARIA_LABEL,
  AI_SELECTION_BUBBLE_CLASS,
  AI_SELECTION_BUSY_LABEL,
  AI_SELECTION_DISMISS_LABEL,
} from './AiSelectionBubble.const';
import type { AiSelectionBubbleProps } from './AiSelectionBubble.types';

const keepSelection = (event: PointerEvent<HTMLButtonElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const AiSelectionBubble: FC<AiSelectionBubbleProps> = (props) => {
  const { open, top, left, busy, preview, onAction, onApply, onDismiss } = props;
  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={AI_SELECTION_BUBBLE_CLASS}
      style={{ position: 'fixed', top, left }}
      role="toolbar"
      aria-label={AI_SELECTION_BUBBLE_ARIA_LABEL}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {AI_SELECTION_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          className={AI_SELECTION_ACTION_CLASS}
          disabled={busy}
          onPointerDown={keepSelection}
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
            className={`${AI_SELECTION_ACTION_CLASS} ${AI_SELECTION_ACTION_ACTIVE_CLASS}`}
            onPointerDown={keepSelection}
            onClick={onApply}
          >
            {AI_SELECTION_APPLY_LABEL}
          </button>
          <button
            type="button"
            className={AI_SELECTION_ACTION_CLASS}
            onPointerDown={keepSelection}
            onClick={onDismiss}
          >
            {AI_SELECTION_DISMISS_LABEL}
          </button>
        </>
      ) : null}
    </div>,
    document.body,
  );
};
