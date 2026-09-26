import { useState, useMemo, useCallback } from 'react';
import type {
  InkDocument,
  InkWorkspaceProps,
  InkSplitMode,
} from '@/types';
import {
  EMPTY_STRING,
  INK_SPLIT_MODE_NONE,
  INK_WORKSPACE_UNTITLED_DOC,
  NUMBER_ZERO,
} from '@const';

export interface UseInkWorkspaceReturn {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  splitMode: InkSplitMode;
  setSplitMode: (mode: InkSplitMode) => void;
  secondaryDocId: string | null;
  setSecondaryDocId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  editingDocId: string | null;
  editTitle: string;
  setEditTitle: (title: string) => void;
  activeDocument: InkDocument | undefined;
  secondaryDocument: InkDocument | null;
  filteredDocs: InkDocument[];
  handleCreateDocument: () => void;
  handleStartRename: (id: string, currentTitle: string, event: React.MouseEvent) => void;
  handleSaveRename: (id: string) => void;
  handleCancelRename: () => void;
}

/**
 * Custom hook to manage state, split view modes, document filtering,
 * and explorer interactions for the InkWorkspace component.
 *
 * @param props - InkWorkspaceProps containing documents, active ID, and lifecycle callbacks
 * @returns UseInkWorkspaceReturn with state values and interaction handlers
 */
export const useInkWorkspace = (props: InkWorkspaceProps): UseInkWorkspaceReturn => {
  const {
    documents,
    activeDocumentId,
    onDocumentCreate,
    onDocumentRename,
    sidebarOpen: controlledSidebarOpen,
    onSidebarOpenChange,
    splitMode: controlledSplitMode,
    onSplitModeChange,
    secondaryDocumentId: controlledSecondaryId,
    onSecondaryDocumentChange,
  } = props;

  const [internalSidebarOpen, setInternalSidebarOpen] = useState(true);
  const [internalSplitMode, setInternalSplitMode] = useState<InkSplitMode>(INK_SPLIT_MODE_NONE);
  const [internalSecondaryId, setInternalSecondaryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(EMPTY_STRING);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState(EMPTY_STRING);

  const sidebarOpen = controlledSidebarOpen !== undefined ? controlledSidebarOpen : internalSidebarOpen;
  const setSidebarOpen = useCallback((open: boolean) => {
    setInternalSidebarOpen(open);
    onSidebarOpenChange?.(open);
  }, [onSidebarOpenChange]);

  const splitMode = controlledSplitMode !== undefined ? controlledSplitMode : internalSplitMode;
  const setSplitMode = useCallback((mode: InkSplitMode) => {
    setInternalSplitMode(mode);
    onSplitModeChange?.(mode);
  }, [onSplitModeChange]);

  const secondaryDocId = controlledSecondaryId !== undefined ? controlledSecondaryId : internalSecondaryId;
  const setSecondaryDocId = useCallback((id: string | null) => {
    setInternalSecondaryId(id);
    onSecondaryDocumentChange?.(id);
  }, [onSecondaryDocumentChange]);

  const activeDocument = useMemo(
    () => documents.find((doc) => doc.id === activeDocumentId) || documents[NUMBER_ZERO],
    [documents, activeDocumentId]
  );

  const secondaryDocument = useMemo(() => {
    if (!secondaryDocId) {
      return documents.find((doc) => doc.id !== activeDocumentId) || null;
    }
    return documents.find((doc) => doc.id === secondaryDocId) || null;
  }, [documents, secondaryDocId, activeDocumentId]);

  const filteredDocs = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return documents;
    const queryLower = trimmed.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(queryLower) ||
        doc.tags?.some((tag) => tag.toLowerCase().includes(queryLower))
    );
  }, [documents, searchQuery]);

  const handleCreateDocument = useCallback(() => {
    if (onDocumentCreate) {
      onDocumentCreate(INK_WORKSPACE_UNTITLED_DOC);
    }
  }, [onDocumentCreate]);

  const handleStartRename = useCallback((id: string, currentTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingDocId(id);
    setEditTitle(currentTitle);
  }, []);

  const handleSaveRename = useCallback((id: string) => {
    if (editingDocId === id && editTitle.trim()) {
      onDocumentRename?.(id, editTitle.trim());
    }
    setEditingDocId(null);
  }, [editingDocId, editTitle, onDocumentRename]);

  const handleCancelRename = useCallback(() => {
    setEditingDocId(null);
  }, []);

  return {
    sidebarOpen,
    setSidebarOpen,
    splitMode,
    setSplitMode,
    secondaryDocId,
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
  };
};
