import React from 'react';
import type { InkWorkspaceProps } from '@/types';
import { InkTabs } from '../InkTabs';
import { InkEditor } from '../InkEditor';
import { PresenceStack } from '../InkEditor/components/PresenceStack';
import { useInkWorkspace } from './hooks/useInkWorkspace';
import {
  SidebarToggleIcon,
  SingleViewIcon,
  SplitVerticalIcon,
  SplitHorizontalIcon,
  SaveDocIcon,
  NewFolderIcon,
  FileDocumentIcon,
  RenamePencilIcon,
  CloseCrossIcon,
} from './components/WorkspaceIcons';
import {
  INK_SPLIT_MODE_NONE,
  INK_SPLIT_MODE_VERTICAL,
  INK_SPLIT_MODE_HORIZONTAL,
  INK_WORKSPACE_TITLE,
  INK_WORKSPACE_DOCS_SUFFIX,
  INK_WORKSPACE_SEARCH_PLACEHOLDER,
  INK_WORKSPACE_NEW_DOC_BUTTON,
  INK_WORKSPACE_CLOSE_FOLDER_BUTTON,
  INK_WORKSPACE_NEW_FOLDER,
  INK_WORKSPACE_SPLIT_VIEW_LABEL,
  INK_WORKSPACE_SAVE_TITLE,
  INK_WORKSPACE_RENAME_TITLE,
  INK_WORKSPACE_DELETE_TITLE,
  INK_WORKSPACE_UNTITLED_FALLBACK,
  INK_WORKSPACE_HIDE_EXPLORER_TITLE,
  INK_WORKSPACE_SHOW_EXPLORER_TITLE,
  INK_WORKSPACE_SINGLE_VIEW_TITLE,
  INK_WORKSPACE_SPLIT_SIDE_TITLE,
  INK_WORKSPACE_SPLIT_STACKED_TITLE,
  NUMBER_ZERO,
  NUMBER_ONE,
  EMPTY_STRING,
} from '@const';
import { cn } from '@utils';
import { Button } from '@common-components';

export const InkWorkspace: React.FC<InkWorkspaceProps> = (props: InkWorkspaceProps) => {
  const {
    documents,
    activeDocumentId,
    onActiveDocumentChange,
    onDocumentChange,
    onDocumentDelete,
    onDocumentRename,
    onDocumentSave,
    folders = [],
    onFolderCreate,
    onFolderDelete,
    collaboration,
    editorProps = {},
    className = EMPTY_STRING,
    style,
  } = props;

  const {
    sidebarOpen,
    setSidebarOpen,
    splitMode,
    setSplitMode,
    setSecondaryDocId,
    searchQuery,
    setSearchQuery,
    editingDocId,
    editTitle,
    setEditTitle,
    activeDocument,
    secondaryDocument,
    filteredDocs,
    handleCreateDocument,
    handleStartRename,
    handleSaveRename,
    handleCancelRename,
  } = useInkWorkspace(props);

  return (
    <div
      className={cn('ink-workspace-root', className)}
      style={style}
      data-split-mode={splitMode}
    >
      <header className="ink-workspace-header">
        <div className="ink-workspace-header-left">
          <Button
            type="button"
            className="ink-workspace-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? INK_WORKSPACE_HIDE_EXPLORER_TITLE : INK_WORKSPACE_SHOW_EXPLORER_TITLE}
            aria-label={sidebarOpen ? INK_WORKSPACE_HIDE_EXPLORER_TITLE : INK_WORKSPACE_SHOW_EXPLORER_TITLE}
          >
            <SidebarToggleIcon />
          </Button>
          <span className="ink-workspace-title">{INK_WORKSPACE_TITLE}</span>
          <span className="ink-workspace-count">
            ({documents.length} {INK_WORKSPACE_DOCS_SUFFIX})
          </span>
        </div>

        <div className="ink-workspace-header-right">
          <div className="ink-workspace-split-controls" role="group" aria-label={INK_WORKSPACE_SPLIT_VIEW_LABEL}>
            <Button
              type="button"
              className={cn('ink-workspace-icon-btn', splitMode === INK_SPLIT_MODE_NONE && 'ink-active')}
              onClick={() => setSplitMode(INK_SPLIT_MODE_NONE)}
              title={INK_WORKSPACE_SINGLE_VIEW_TITLE}
            >
              <SingleViewIcon />
            </Button>
            <Button
              type="button"
              className={cn('ink-workspace-icon-btn', splitMode === INK_SPLIT_MODE_VERTICAL && 'ink-active')}
              onClick={() => setSplitMode(INK_SPLIT_MODE_VERTICAL)}
              title={INK_WORKSPACE_SPLIT_SIDE_TITLE}
            >
              <SplitVerticalIcon />
            </Button>
            <Button
              type="button"
              className={cn('ink-workspace-icon-btn', splitMode === INK_SPLIT_MODE_HORIZONTAL && 'ink-active')}
              onClick={() => setSplitMode(INK_SPLIT_MODE_HORIZONTAL)}
              title={INK_WORKSPACE_SPLIT_STACKED_TITLE}
            >
              <SplitHorizontalIcon />
            </Button>
          </div>

          {onDocumentSave && activeDocument && (
            <Button
              type="button"
              className="ink-workspace-icon-btn"
              onClick={() => onDocumentSave(activeDocument.id)}
              title={INK_WORKSPACE_SAVE_TITLE}
              aria-label={INK_WORKSPACE_SAVE_TITLE}
            >
              <SaveDocIcon />
            </Button>
          )}

          {collaboration?.collaborators && (
            <PresenceStack
              collaborators={collaboration.collaborators}
              maxAvatars={collaboration.maxAvatars}
            />
          )}
        </div>
      </header>

      <div className="ink-workspace-body">
        {sidebarOpen && (
          <aside className="ink-workspace-sidebar" aria-label={INK_WORKSPACE_TITLE}>
            <div className="ink-workspace-sidebar-toolbar">
              <input
                type="text"
                className="ink-workspace-search-input"
                placeholder={INK_WORKSPACE_SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <Button
                type="button"
                className="ink-workspace-new-doc-btn"
                onClick={handleCreateDocument}
                title={INK_WORKSPACE_NEW_DOC_BUTTON}
                aria-label={INK_WORKSPACE_NEW_DOC_BUTTON}
              >
                {INK_WORKSPACE_NEW_DOC_BUTTON}
              </Button>
              {onFolderCreate && (
                <Button
                  type="button"
                  className="ink-workspace-icon-btn"
                  onClick={() => onFolderCreate(INK_WORKSPACE_NEW_FOLDER)}
                  title={INK_WORKSPACE_NEW_FOLDER}
                  aria-label={INK_WORKSPACE_NEW_FOLDER}
                >
                  <NewFolderIcon />
                </Button>
              )}
            </div>

            {folders.length > NUMBER_ZERO && (
              <div className="ink-workspace-folders-section">
                {folders.map((folder) => (
                  <div key={folder.id} className="ink-workspace-folder-item">
                    <span className="ink-doc-icon">📁</span>
                    <span className="ink-doc-title">{folder.name}</span>
                    {onFolderDelete && (
                      <Button
                        type="button"
                        className="ink-doc-action-btn ink-delete"
                        onClick={() => onFolderDelete(folder.id)}
                        title={INK_WORKSPACE_CLOSE_FOLDER_BUTTON}
                        aria-label={INK_WORKSPACE_CLOSE_FOLDER_BUTTON}
                      >
                        {INK_WORKSPACE_CLOSE_FOLDER_BUTTON}
                      </Button>
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
                    className={cn('ink-workspace-doc-item', isActive && 'ink-doc-active')}
                    onClick={() => onActiveDocumentChange(doc.id)}
                  >
                    <span className="ink-doc-icon">
                      {doc.icon || <FileDocumentIcon />}
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        className="ink-doc-title-input"
                        value={editTitle}
                        autoFocus
                        onChange={(event) => setEditTitle(event.target.value)}
                        onBlur={() => handleSaveRename(doc.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') handleSaveRename(doc.id);
                          if (event.key === 'Escape') handleCancelRename();
                        }}
                        onClick={(event) => event.stopPropagation()}
                      />
                    ) : (
                      <span
                        className="ink-doc-title"
                        onDoubleClick={(event) => handleStartRename(doc.id, doc.title, event)}
                      >
                        {doc.title || INK_WORKSPACE_UNTITLED_FALLBACK}
                      </span>
                    )}

                    {doc.isDirty && <span className="ink-doc-dirty-dot" />}

                    <div className="ink-doc-actions">
                      <Button
                        type="button"
                        className="ink-doc-action-btn"
                        onClick={(event) => handleStartRename(doc.id, doc.title, event)}
                        title={INK_WORKSPACE_RENAME_TITLE}
                        aria-label={INK_WORKSPACE_RENAME_TITLE}
                      >
                        <RenamePencilIcon />
                      </Button>
                      {documents.length > NUMBER_ONE && onDocumentDelete && (
                        <Button
                          type="button"
                          className="ink-doc-action-btn ink-delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            onDocumentDelete(doc.id);
                          }}
                          title={INK_WORKSPACE_DELETE_TITLE}
                          aria-label={INK_WORKSPACE_DELETE_TITLE}
                        >
                          <CloseCrossIcon />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        <main className={cn('ink-workspace-main-area', `ink-split-${splitMode}`)}>
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

          {splitMode !== INK_SPLIT_MODE_NONE && (
            <section className="ink-workspace-pane ink-secondary-pane">
              <div className="ink-secondary-pane-header">
                <span className="ink-secondary-pane-label">{INK_WORKSPACE_SPLIT_VIEW_LABEL}</span>
                <select
                  className="ink-secondary-pane-select"
                  value={secondaryDocument?.id || EMPTY_STRING}
                  onChange={(event) => setSecondaryDocId(event.target.value)}
                  aria-label={INK_WORKSPACE_SPLIT_VIEW_LABEL}
                >
                  {documents.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.title}
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
