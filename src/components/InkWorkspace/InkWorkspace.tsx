import React, { useState, useMemo } from 'react';
import type {
  InkWorkspaceProps,
  InkSplitMode,
} from '../../types/workspace.types';
import { InkTabs } from '../InkTabs';
import { InkEditor } from '../InkEditor';
import { PresenceStack } from '../InkEditor/components/PresenceStack';

export const InkWorkspace: React.FC<InkWorkspaceProps> = ({
  documents,
  activeDocumentId,
  onActiveDocumentChange,
  onDocumentChange,
  onDocumentCreate,
  onDocumentDelete,
  onDocumentRename,
  onDocumentSave,
  folders = [],
  onFolderCreate,
  onFolderDelete,
  sidebarOpen: controlledSidebarOpen,
  onSidebarOpenChange,
  splitMode: controlledSplitMode,
  onSplitModeChange,
  secondaryDocumentId: controlledSecondaryId,
  onSecondaryDocumentChange,
  collaboration,
  editorProps = {},
  className = '',
  style,
}) => {
  // Local state fallbacks if uncontrolled
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(true);
  const [internalSplitMode, setInternalSplitMode] = useState<InkSplitMode>('none');
  const [internalSecondaryId, setInternalSecondaryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const sidebarOpen = controlledSidebarOpen !== undefined ? controlledSidebarOpen : internalSidebarOpen;
  const setSidebarOpen = (open: boolean) => {
    setInternalSidebarOpen(open);
    onSidebarOpenChange?.(open);
  };

  const splitMode = controlledSplitMode !== undefined ? controlledSplitMode : internalSplitMode;
  const setSplitMode = (mode: InkSplitMode) => {
    setInternalSplitMode(mode);
    onSplitModeChange?.(mode);
  };

  const secondaryDocId = controlledSecondaryId !== undefined ? controlledSecondaryId : internalSecondaryId;
  const setSecondaryDocId = (id: string | null) => {
    setInternalSecondaryId(id);
    onSecondaryDocumentChange?.(id);
  };

  // Find active and secondary documents
  const activeDocument = useMemo(
    () => documents.find((d) => d.id === activeDocumentId) || documents[0],
    [documents, activeDocumentId]
  );

  const secondaryDocument = useMemo(() => {
    if (!secondaryDocId) {
      return documents.find((d) => d.id !== activeDocumentId) || null;
    }
    return documents.find((d) => d.id === secondaryDocId) || null;
  }, [documents, secondaryDocId, activeDocumentId]);

  // Filtered documents by search
  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    const q = searchQuery.toLowerCase();
    return documents.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [documents, searchQuery]);

  const handleCreateDocument = () => {
    if (onDocumentCreate) {
      onDocumentCreate('Untitled Document');
    }
  };

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingDocId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    if (editingDocId === id && editTitle.trim()) {
      onDocumentRename?.(id, editTitle.trim());
    }
    setEditingDocId(null);
  };

  return (
    <div
      className={`ink-workspace-root ${className}`.trim()}
      style={style}
      data-split-mode={splitMode}
    >
      {/* Top Workspace Bar */}
      <header className="ink-workspace-header">
        <div className="ink-workspace-header-left">
          <button
            type="button"
            className="ink-workspace-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Hide explorer' : 'Show explorer'}
            aria-label="Toggle document explorer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
          <span className="ink-workspace-title">Workspace</span>
          <span className="ink-workspace-count">({documents.length} docs)</span>
        </div>

        <div className="ink-workspace-header-right">
          {/* Split Mode Toggles */}
          <div className="ink-workspace-split-controls" role="group" aria-label="Split view">
            <button
              type="button"
              className={`ink-workspace-icon-btn ${splitMode === 'none' ? 'ink-active' : ''}`}
              onClick={() => setSplitMode('none')}
              title="Single view"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
            </button>
            <button
              type="button"
              className={`ink-workspace-icon-btn ${splitMode === 'vertical' ? 'ink-active' : ''}`}
              onClick={() => setSplitMode('vertical')}
              title="Split side-by-side"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="3" x2="12" y2="21" />
              </svg>
            </button>
            <button
              type="button"
              className={`ink-workspace-icon-btn ${splitMode === 'horizontal' ? 'ink-active' : ''}`}
              onClick={() => setSplitMode('horizontal')}
              title="Split stacked"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </button>
          </div>

          {/* Document Save Button */}
          {onDocumentSave && activeDocument && (
            <button
              type="button"
              className="ink-workspace-icon-btn"
              onClick={() => onDocumentSave(activeDocument.id)}
              title="Save document"
              aria-label="Save document"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </button>
          )}

          {/* Presence Avatar Stack */}
          {collaboration?.collaborators && (
            <PresenceStack
              collaborators={collaboration.collaborators}
              maxAvatars={collaboration.maxAvatars || 4}
            />
          )}
        </div>
      </header>

      {/* Main Workspace Body: Sidebar + Editor area */}
      <div className="ink-workspace-body">
        {/* Collapsible Document Sidebar */}
        {sidebarOpen && (
          <aside className="ink-workspace-sidebar" aria-label="Document Explorer">
            <div className="ink-workspace-sidebar-toolbar">
              <input
                type="text"
                className="ink-workspace-search-input"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="ink-workspace-new-doc-btn"
                onClick={handleCreateDocument}
                title="New Document"
                aria-label="New Document"
              >
                +
              </button>
              {onFolderCreate && (
                <button
                  type="button"
                  className="ink-workspace-icon-btn"
                  onClick={() => onFolderCreate('New Folder')}
                  title="New Folder"
                  aria-label="New Folder"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </button>
              )}
            </div>

            {folders.length > 0 && (
              <div className="ink-workspace-folders-section">
                {folders.map((f) => (
                  <div key={f.id} className="ink-workspace-folder-item">
                    <span className="ink-doc-icon">📁</span>
                    <span className="ink-doc-title">{f.name}</span>
                    {onFolderDelete && (
                      <button
                        type="button"
                        className="ink-doc-action-btn ink-delete"
                        onClick={() => onFolderDelete(f.id)}
                        title="Delete folder"
                        aria-label="Delete folder"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="ink-workspace-doc-list" role="tree">
              {filteredDocs.map((doc) => {
                const isActive = doc.id === activeDocumentId;
                const isEditing = editingDocId === doc.id;

                return (
                  <div
                    key={doc.id}
                    role="treeitem"
                    aria-selected={isActive}
                    className={`ink-workspace-doc-item ${isActive ? 'ink-doc-active' : ''}`}
                    onClick={() => onActiveDocumentChange(doc.id)}
                  >
                    <span className="ink-doc-icon">
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
                        className="ink-doc-title-input"
                        value={editTitle}
                        autoFocus
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => handleSaveRename(doc.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(doc.id);
                          if (e.key === 'Escape') setEditingDocId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="ink-doc-title" onDoubleClick={(e) => handleStartRename(doc.id, doc.title, e)}>
                        {doc.title || 'Untitled'}
                      </span>
                    )}

                    {doc.isDirty && <span className="ink-doc-dirty-dot" title="Unsaved" />}

                    <div className="ink-doc-actions">
                      <button
                        type="button"
                        className="ink-doc-action-btn"
                        onClick={(e) => handleStartRename(doc.id, doc.title, e)}
                        title="Rename"
                        aria-label="Rename document"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      {documents.length > 1 && onDocumentDelete && (
                        <button
                          type="button"
                          className="ink-doc-action-btn ink-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDocumentDelete(doc.id);
                          }}
                          title="Delete"
                          aria-label="Delete document"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* Central Panes */}
        <main className={`ink-workspace-main-area ink-split-${splitMode}`}>
          {/* Primary Editor Pane */}
          <section className="ink-workspace-pane ink-primary-pane">
            <InkTabs
              documents={documents}
              activeDocumentId={activeDocumentId}
              onTabSelect={onActiveDocumentChange}
              onTabClose={onDocumentDelete}
              onTabAdd={handleCreateDocument}
              onTabRename={onDocumentRename}
            />
            {activeDocument && (
              <div className="ink-workspace-editor-wrapper">
                <InkEditor
                  key={activeDocument.id}
                  value={activeDocument.content}
                  onChange={(val) => onDocumentChange?.(activeDocument.id, val)}
                  readOnly={activeDocument.readOnly}
                  collaboration={collaboration}
                  {...editorProps}
                />
              </div>
            )}
          </section>

          {/* Secondary Split Pane if active */}
          {splitMode !== 'none' && (
            <section className="ink-workspace-pane ink-secondary-pane">
              <div className="ink-secondary-pane-header">
                <span className="ink-secondary-pane-label">Split View:</span>
                <select
                  className="ink-secondary-pane-select"
                  value={secondaryDocument?.id || ''}
                  onChange={(e) => setSecondaryDocId(e.target.value)}
                  aria-label="Select document for split view"
                >
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>

              {secondaryDocument && (
                <div className="ink-workspace-editor-wrapper">
                  <InkEditor
                    key={`sec-${secondaryDocument.id}`}
                    value={secondaryDocument.content}
                    onChange={(val) => onDocumentChange?.(secondaryDocument.id, val)}
                    readOnly={secondaryDocument.readOnly}
                    {...editorProps}
                  />
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
