import type { CSSProperties } from 'react';
import type { InkCollaborationConfig } from './collab.types';
import type { InkEditorProps } from './ink.types';

export interface InkDocument {
  id: string;
  title: string;
  content: string;
  isDirty?: boolean;
  createdAt?: number;
  updatedAt?: number;
  tags?: string[];
  icon?: string;
  folderId?: string;
  readOnly?: boolean;
}

export interface InkFolder {
  id: string;
  name: string;
  parentId?: string | null;
}

export type InkSplitMode = 'none' | 'vertical' | 'horizontal';

export interface InkTabsProps {
  documents: InkDocument[];
  activeDocumentId: string;
  onTabSelect: (id: string) => void;
  onTabClose?: (id: string) => void;
  onTabAdd?: () => void;
  onTabRename?: (id: string, newTitle: string) => void;
  className?: string;
}

export interface InkWorkspaceProps {
  documents: InkDocument[];
  activeDocumentId: string;
  onActiveDocumentChange: (id: string) => void;
  onDocumentChange?: (id: string, content: string) => void;
  onDocumentCreate?: (title?: string, folderId?: string) => void;
  onDocumentDelete?: (id: string) => void;
  onDocumentRename?: (id: string, newTitle: string) => void;
  onDocumentSave?: (id: string) => void;
  folders?: InkFolder[];
  onFolderCreate?: (name: string, parentId?: string) => void;
  onFolderDelete?: (id: string) => void;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  splitMode?: InkSplitMode;
  onSplitModeChange?: (mode: InkSplitMode) => void;
  secondaryDocumentId?: string | null;
  onSecondaryDocumentChange?: (id: string | null) => void;
  collaboration?: InkCollaborationConfig;
  editorProps?: Partial<InkEditorProps>;
  className?: string;
  style?: CSSProperties;
}
