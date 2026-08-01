import type { FC } from 'react';
import type { InkTrackChange } from '../../../../types';

export interface TrackChangesBarProps {
  changes: InkTrackChange[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export const TrackChangesBar: FC<TrackChangesBarProps> = (props) => {
  const { changes, onAccept, onReject, onAcceptAll, onRejectAll } = props;
  const pending = changes.filter((change) => !change.accepted && !change.rejected);
  if (pending.length === 0) return null;
  return (
    <div className="Ink-TrackBar" role="region" aria-label="Track changes">
      <span className="Ink-TrackBar__label">{pending.length} pending change{pending.length === 1 ? '' : 's'}</span>
      <div className="Ink-TrackBar__actions">
        <button type="button" className="Ink-Editor__button" onClick={onAcceptAll}>
          Accept all
        </button>
        <button type="button" className="Ink-Editor__button" onClick={onRejectAll}>
          Reject all
        </button>
      </div>
      <ul className="Ink-TrackBar__list">
        {pending.map((change) => (
          <li key={change.id}>
            <span>
              {change.type} · {change.author}
            </span>
            <button type="button" className="Ink-Editor__button Ink-Editor__button--active" onClick={() => onAccept(change.id)}>
              Accept
            </button>
            <button type="button" className="Ink-Editor__button" onClick={() => onReject(change.id)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
