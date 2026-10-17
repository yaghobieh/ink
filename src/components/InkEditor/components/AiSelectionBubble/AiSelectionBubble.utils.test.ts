import { describe, expect, it } from 'vitest';
import {
  capabilityForSelectionAction,
  htmlFromAiResponse,
  optionsForSelectionAction,
} from './AiSelectionBubble.utils';

describe('AiSelectionBubble.utils', () => {
  it('maps bubble actions onto Ink AI capabilities', () => {
    expect(capabilityForSelectionAction('improve')).toBe('rewrite');
    expect(capabilityForSelectionAction('longer')).toBe('expand');
    expect(capabilityForSelectionAction('missing')).toBeNull();
  });

  it('sends a language only for translate', () => {
    expect(optionsForSelectionAction('translate')?.language).toBe('Spanish');
    expect(optionsForSelectionAction('tone')).toBeUndefined();
  });

  it('prefers the suggested diff html', () => {
    expect(
      htmlFromAiResponse({
        html: '<p>plain</p>',
        diff: {
          id: 'd1',
          originalHtml: '<p>old</p>',
          suggestedHtml: '<p>next</p>',
          summary: 'rewrite',
        },
      }),
    ).toBe('<p>next</p>');
  });

  it('wraps a review suggestion when no html is returned', () => {
    expect(
      htmlFromAiResponse({
        reviewSuggestions: [
          {
            id: 'r1',
            message: 'shorter',
            severity: 'info',
            originalText: 'long',
            suggestedText: 'brief & clear',
          },
        ],
      }),
    ).toBe('<p>brief &amp; clear</p>');
  });
});
