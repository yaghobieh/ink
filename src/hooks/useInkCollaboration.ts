import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  InkCollaborator,
  InkCollaboratorCursor,
  InkCollaboratorStatus,
} from '../types/collab.types';

export interface UseInkCollaborationOptions {
  roomId?: string;
  user?: InkCollaborator;
  initialCollaborators?: InkCollaborator[];
  serverUrl?: string;
  simulateDemo?: boolean;
}

export interface UseInkCollaborationReturn {
  collaborators: InkCollaborator[];
  isConnected: boolean;
  broadcastCursor: (cursor: InkCollaboratorCursor) => void;
  broadcastSelection: (start: number, end: number, text?: string) => void;
  addCollaborator: (collaborator: InkCollaborator) => void;
  removeCollaborator: (id: string) => void;
  updateCollaboratorStatus: (id: string, status: InkCollaboratorStatus) => void;
  setCollaborators: React.Dispatch<React.SetStateAction<InkCollaborator[]>>;
}

const DEFAULT_DEMO_COLLABORATORS: InkCollaborator[] = [
  {
    id: 'collab-1',
    name: 'Sarah Connor',
    color: '#3B82F6',
    status: 'active',
    role: 'editor',
    cursor: { line: 2, col: 14, offset: 42 },
  },
  {
    id: 'collab-2',
    name: 'Albert Specialist',
    color: '#10B981',
    status: 'active',
    role: 'editor',
    cursor: { line: 5, col: 28, offset: 110 },
  },
  {
    id: 'collab-3',
    name: 'Elena Rostova',
    color: '#8B5CF6',
    status: 'idle',
    role: 'commenter',
    cursor: { line: 8, col: 6, offset: 180 },
  },
];

export const useInkCollaboration = ({
  roomId = 'default-room',
  user,
  initialCollaborators = [],
  serverUrl,
  simulateDemo = false,
}: UseInkCollaborationOptions = {}): UseInkCollaborationReturn => {
  const [collaborators, setCollaborators] = useState<InkCollaborator[]>(() => {
    if (initialCollaborators.length > 0) return initialCollaborators;
    if (simulateDemo) return DEFAULT_DEMO_COLLABORATORS;
    return [];
  });

  const [isConnected, setIsConnected] = useState<boolean>(true);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket connection if serverUrl provided
  useEffect(() => {
    if (!serverUrl || typeof WebSocket === 'undefined') return;

    try {
      const ws = new WebSocket(`${serverUrl}?room=${encodeURIComponent(roomId)}`);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        if (user) {
          ws.send(JSON.stringify({ type: 'join', room: roomId, user }));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'presence' && Array.isArray(data.collaborators)) {
            setCollaborators(data.collaborators);
          } else if (data.type === 'cursor' && data.collaborator) {
            setCollaborators((prev) => {
              const idx = prev.findIndex((c) => c.id === data.collaborator.id);
              if (idx >= 0) {
                const next = [...prev];
                next[idx] = { ...next[idx], ...data.collaborator };
                return next;
              }
              return [...prev, data.collaborator];
            });
          }
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => setIsConnected(false);
      ws.onerror = () => setIsConnected(false);

      return () => {
        ws.close();
        socketRef.current = null;
      };
    } catch {
      setIsConnected(false);
    }
  }, [serverUrl, roomId, user]);

  // Broadcast cursor updates
  const broadcastCursor = useCallback(
    (cursor: InkCollaboratorCursor) => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: 'cursor',
            room: roomId,
            userId: user?.id,
            cursor,
          })
        );
      }
    },
    [roomId, user]
  );

  const broadcastSelection = useCallback(
    (start: number, end: number, text?: string) => {
      broadcastCursor({
        selection: { start, end, text },
      });
    },
    [broadcastCursor]
  );

  const addCollaborator = useCallback((collaborator: InkCollaborator) => {
    setCollaborators((prev) => {
      if (prev.some((c) => c.id === collaborator.id)) {
        return prev.map((c) => (c.id === collaborator.id ? collaborator : c));
      }
      return [...prev, collaborator];
    });
  }, []);

  const removeCollaborator = useCallback((id: string) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCollaboratorStatus = useCallback(
    (id: string, status: InkCollaboratorStatus) => {
      setCollaborators((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    },
    []
  );

  return {
    collaborators,
    isConnected,
    broadcastCursor,
    broadcastSelection,
    addCollaborator,
    removeCollaborator,
    updateCollaboratorStatus,
    setCollaborators,
  };
};
