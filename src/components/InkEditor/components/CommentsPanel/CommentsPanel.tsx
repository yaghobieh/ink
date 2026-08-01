import { useState, type FC, type FormEvent } from 'react';
import type { InkCommentThread } from '../../../../types';

export interface CommentsPanelProps {
  comments: InkCommentThread[];
  author: string;
  onAddReply: (threadId: string, body: string) => void;
  onResolve: (threadId: string) => void;
  onClose?: () => void;
}

export const CommentsPanel: FC<CommentsPanelProps> = (props) => {
  const { comments, author, onAddReply, onResolve, onClose } = props;
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const handleReply = (event: FormEvent, threadId: string) => {
    event.preventDefault();
    const body = drafts[threadId]?.trim();
    if (!body) return;
    onAddReply(threadId, body);
    setDrafts((prev) => ({ ...prev, [threadId]: '' }));
  };

  return (
    <aside className="Ink-Comments" aria-label="Comments archive">
      <div className="Ink-Comments__header">
        <strong>Comments archive</strong>
        {onClose ? (
          <button type="button" className="Ink-Editor__button" onClick={onClose} title="Close">
            ×
          </button>
        ) : null}
      </div>
      <div className="Ink-Comments__list">
        {comments.length === 0 ? (
          <p className="Ink-Comments__empty">Select text and add a comment to start a thread.</p>
        ) : (
          comments.map((thread) => (
            <article
              key={thread.id}
              className={`Ink-Comments__thread${thread.resolved ? ' Ink-Comments__thread--resolved' : ''}`}
            >
              <header className="Ink-Comments__meta">
                <span>{thread.author}</span>
                <time>{new Date(thread.timestamp).toLocaleString()}</time>
              </header>
              <p className="Ink-Comments__body">{thread.body}</p>
              {thread.replies.map((reply) => (
                <div key={reply.id} className="Ink-Comments__reply">
                  <header className="Ink-Comments__meta">
                    <span>{reply.author}</span>
                    <time>{new Date(reply.timestamp).toLocaleString()}</time>
                  </header>
                  <p className="Ink-Comments__body">{reply.body}</p>
                </div>
              ))}
              {!thread.resolved ? (
                <form className="Ink-Comments__form" onSubmit={(event) => handleReply(event, thread.id)}>
                  <input
                    value={drafts[thread.id] ?? ''}
                    onChange={(event) =>
                      setDrafts((prev) => ({ ...prev, [thread.id]: event.target.value }))
                    }
                    placeholder={`Reply as ${author}…`}
                    aria-label={`Reply to ${thread.author}`}
                  />
                  <button type="submit" className="Ink-Editor__button Ink-Editor__button--active">
                    Reply
                  </button>
                  <button
                    type="button"
                    className="Ink-Editor__button"
                    onClick={() => onResolve(thread.id)}
                  >
                    Resolve
                  </button>
                </form>
              ) : (
                <p className="Ink-Comments__resolved">Resolved</p>
              )}
            </article>
          ))
        )}
      </div>
    </aside>
  );
};
