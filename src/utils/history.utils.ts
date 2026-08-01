import { INK_HISTORY_MAX } from '../constants';

export class InkHistoryStack {
  private past: string[] = [];
  private future: string[] = [];
  private current = '';

  constructor(initial = '') {
    this.current = initial;
  }

  push(html: string): void {
    if (html === this.current) return;
    this.past.push(this.current);
    if (this.past.length > INK_HISTORY_MAX) {
      this.past.shift();
    }
    this.current = html;
    this.future = [];
  }

  undo(): string | null {
    const previous = this.past.pop();
    if (previous === undefined) return null;
    this.future.push(this.current);
    this.current = previous;
    return this.current;
  }

  redo(): string | null {
    const next = this.future.pop();
    if (next === undefined) return null;
    this.past.push(this.current);
    this.current = next;
    return this.current;
  }

  canUndo(): boolean {
    return this.past.length > 0;
  }

  canRedo(): boolean {
    return this.future.length > 0;
  }

  getCurrent(): string {
    return this.current;
  }
}
