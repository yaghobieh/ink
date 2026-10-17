import type { FC } from 'react';
import type { InkDocumentVersion } from '../../../../utils/versions.utils';

export interface VersionHistoryProps {
  versions: InkDocumentVersion[];
  onSave: () => void;
  onRestore: (version: InkDocumentVersion) => void;
  onCompare: (version: InkDocumentVersion) => void;
  onClose: () => void;
}

export const VersionHistory: FC<VersionHistoryProps> = (props) => {
  const { versions, onSave, onRestore, onCompare, onClose } = props;
  return (
    <aside className="Ink-Versions" aria-label="Version history">
      <div className="Ink-Versions__header">
        <strong>Versions</strong>
        <button type="button" className="Ink-Editor__button Ink-Editor__button--active" onClick={onSave}>
          Save snapshot
        </button>
        <button type="button" className="Ink-Editor__button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="Ink-Versions__list">
        {versions.length === 0 ? (
          <p className="Ink-Versions__empty">No snapshots yet.</p>
        ) : (
          versions.map((version) => (
            <article key={version.id} className="Ink-Versions__item">
              <strong>{version.name}</strong>
              <time>{new Date(version.savedAt).toLocaleString()}</time>
              <div className="Ink-Versions__actions">
                <button type="button" className="Ink-Editor__button" onClick={() => onRestore(version)}>
                  Restore
                </button>
                <button type="button" className="Ink-Editor__button" onClick={() => onCompare(version)}>
                  Compare
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </aside>
  );
};
