export interface InkCommentReply {
  id: string;
  author: string;
  body: string;
  timestamp: number;
}

export interface InkCommentThread {
  id: string;
  author: string;
  body: string;
  timestamp: number;
  highlightId: string;
  resolved?: boolean;
  replies: InkCommentReply[];
}

export type InkCommentsChangeHandler = (comments: InkCommentThread[]) => void;
