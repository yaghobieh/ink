import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  InkCollaborator,
  InkCollaboratorCursor,
  InkCollaboratorStatus,
  UseInkCollaborationOptions,
  UseInkCollaborationReturn,
} from '@/types';
import {
  INK_DEFAULT_ROOM_ID,
  DEFAULT_DEMO_COLLABORATORS,
  NUMBER_ZERO,
} from '@const';

export type { UseInkCollaborationOptions, UseInkCollaborationReturn };

export const useInkCollaboration = ({
  roomId = INK_DEFAULT_ROOM_ID,
  user,
  initialCollaborators = [],
  serverUrl,
  simulateDemo = false,
}: UseInkCollaborationOptions = {}): UseInkCollaborationReturn => {
  const [collaborators, setCollaborators] = useState<InkCollaborator[]>(() => {
    if (initialCollaborators.length > NUMBER_ZERO) return initialCollaborators;
    if (simulateDemo) return DEFAULT_DEMO_COLLABORATORS;
    return [];
  });

  const [isConnected, setIsConnected] = useState<boolean>(true);
  const socketRef = useRef<WebSocket | null>(null);

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
              const idx = prev.findIndex((collaborator) => collaborator.id === data.collaborator.id);
              if (idx >= NUMBER_ZERO) {
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
    setCollaborators((prev) => prev.filter((collaborator) => collaborator.id !== id));
  }, []);

  const updateCollaboratorStatus = useCallback(
    (id: string, status: InkCollaboratorStatus) => {
      setCollaborators((prev) =>
        prev.map((collaborator) => (collaborator.id === id ? { ...collaborator, status } : collaborator))
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
