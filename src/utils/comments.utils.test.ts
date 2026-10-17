import { describe, expect, it } from 'vitest';
import { scrollToComment, setCommentResolvedMark } from './comments.utils';

describe('comment navigation', () => {
  it('scrolls to a highlight and marks it resolved', () => {
    document.body.innerHTML = '<div id="root"><mark data-ink-comment="hl1">Note</mark></div>';
    const root = document.getElementById('root') as HTMLElement;
    expect(scrollToComment(root, 'hl1')).toBe(true);
    expect(setCommentResolvedMark(root, 'hl1', true)).toBe(true);
    expect(root.querySelector('mark')?.classList.contains('Ink-comment-mark--resolved')).toBe(true);
    expect(scrollToComment(root, 'missing')).toBe(false);
  });
});
