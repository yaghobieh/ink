import React, { useState } from 'react';
import type { InkTabsProps } from '../../types/workspace.types';

export const InkTabs: React.FC<InkTabsProps> = ({
  documents,
  activeDocumentId,
  onTabSelect,
  onTabClose,
  onTabAdd,
  onTabRename,
  className = '',
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onTabRename) return;
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleFinishRename = (id: string) => {
    if (editingId === id && editTitle.trim()) {
      onTabRename?.(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFinishRename(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div
      className={`ink-tabs-container ${className}`.trim()}
      role="tablist"
      aria-label="Document tabs"
    >
      <div className="ink-tabs-scroll-area">
        {documents.map((doc) => {
          const isActive = doc.id === activeDocumentId;
          const isEditing = editingId === doc.id;

          return (
            <div
              key={doc.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`ink-tab-item ${isActive ? 'ink-tab-active' : ''} ${doc.isDirty ? 'ink-tab-dirty' : ''}`}
              onClick={() => onTabSelect(doc.id)}
              onDoubleClick={(e) => handleStartRename(doc.id, doc.title, e)}
              title={doc.title}
            >
              <span className="ink-tab-icon" aria-hidden="true">
                {doc.icon || (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                )}
              </span>

              {isEditing ? (
                <input
                  type="text"
                  className="ink-tab-title-input"
                  value={editTitle}
                  autoFocus
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleFinishRename(doc.id)}
                  onKeyDown={(e) => handleKeyDown(doc.id, e)}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span className="ink-tab-title">{doc.title || 'Untitled'}</span>
              )}

              {doc.isDirty && (
                <span
                  className="ink-tab-dirty-indicator"
                  title="Unsaved changes"
                  aria-label="Unsaved changes"
                />
              )}

              {onTabClose && documents.length > 1 && (
                <button
                  type="button"
                  className="ink-tab-close-btn"
                  aria-label={`Close ${doc.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(doc.id);
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {onTabAdd && (
        <button
          type="button"
          className="ink-tab-add-btn"
          aria-label="New document"
          title="New document"
          onClick={onTabAdd}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      )}
    </div>
  );
};
