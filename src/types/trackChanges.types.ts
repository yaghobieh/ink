export type InkTrackChangeType = 'insert' | 'delete' | 'format';

export interface InkTrackChange {
  id: string;
  type: InkTrackChangeType;
  html: string;
  author: string;
  timestamp: number;
  accepted?: boolean;
  rejected?: boolean;
}

export type InkTrackChangesChangeHandler = (changes: InkTrackChange[]) => void;
