import { INK_AI_DEMO_MODEL_ID, INK_AI_DEMO_PROVIDER_ID, INK_DEMO_AI_DELAY_MS } from '../../constants';
import type { InkAiProvider, InkAiRequest, InkAiResponse } from '../../types';
import { createInkId } from '../../utils/id.utils';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const stripTags = (html: string): string => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const wrapParagraph = (text: string): string => `<p>${text}</p>`;

const runDemo = async (request: InkAiRequest): Promise<InkAiResponse> => {
  await delay(INK_DEMO_AI_DELAY_MS);
  const source = request.selectionHtml || request.html || '';
  const plain = stripTags(source) || 'your content';
  const prompt = request.prompt?.trim() || '';

  switch (request.capability) {
    case 'chat': {
      const answer = prompt
        ? `Demo assistant: regarding “${prompt.slice(0, 120)}”, here’s a concise take based on the current document (${plain.slice(0, 80)}…). Connect your own LLM provider for production answers.`
        : `Demo assistant ready. Ask a question about: ${plain.slice(0, 100)}…`;
      return {
        text: answer,
        turns: [
          {
            id: createInkId('turn'),
            role: 'assistant',
            content: answer,
            timestamp: Date.now(),
            capability: 'chat',
          },
        ],
        meta: { provider: INK_AI_DEMO_PROVIDER_ID, model: INK_AI_DEMO_MODEL_ID },
      };
    }
    case 'summarize': {
      const summary = wrapParagraph(`Summary (demo): ${plain.slice(0, 160)}${plain.length > 160 ? '…' : ''}`);
      return {
        html: summary,
        text: stripTags(summary),
        diff: {
          id: createInkId('diff'),
          originalHtml: source,
          suggestedHtml: summary,
          summary: 'Demo summary of the selection',
        },
      };
    }
    case 'expand': {
      const expanded = wrapParagraph(
        `${plain} Additionally, this demo expansion adds clarifying context, examples, and a short closing sentence so you can preview apply/reject flows.`,
      );
      return {
        html: expanded,
        diff: {
          id: createInkId('diff'),
          originalHtml: source,
          suggestedHtml: expanded,
          summary: 'Demo expansion',
        },
      };
    }
    case 'tone': {
      const toned = wrapParagraph(`In a clearer, more professional tone: ${plain}`);
      return {
        html: toned,
        diff: {
          id: createInkId('diff'),
          originalHtml: source,
          suggestedHtml: toned,
          summary: 'Demo tone adjustment',
        },
      };
    }
    case 'translate': {
      const language = request.options?.language || 'Spanish';
      const translated = wrapParagraph(`[${language} demo] ${plain}`);
      return {
        html: translated,
        text: stripTags(translated),
        diff: {
          id: createInkId('diff'),
          originalHtml: source,
          suggestedHtml: translated,
          summary: `Demo translation to ${language}`,
        },
      };
    }
    case 'review': {
      return {
        text: 'Demo review complete',
        reviewSuggestions: [
          {
            id: createInkId('rev'),
            message: 'Consider shortening long sentences for clarity.',
            severity: 'info',
            originalText: plain.slice(0, 40),
            suggestedText: plain.slice(0, 40),
          },
          {
            id: createInkId('rev'),
            message: 'Possible passive voice — prefer active constructions.',
            severity: 'warning',
            originalText: 'was processed',
            suggestedText: 'the team processed',
          },
        ],
      };
    }
    case 'autocomplete': {
      const prefix = prompt || plain;
      const continuation = prefix.trim().length
        ? ' and continue with a clear next phrase.'
        : 'Start typing to see a demo completion.';
      return {
        text: continuation,
        meta: { provider: INK_AI_DEMO_PROVIDER_ID, model: INK_AI_DEMO_MODEL_ID },
      };
    }
    case 'suggestDiff':
    case 'quickAction':
    case 'rewrite':
    default: {
      const rewritten = wrapParagraph(`Rewritten (demo): ${plain}`);
      return {
        html: rewritten,
        diff: {
          id: createInkId('diff'),
          originalHtml: source,
          suggestedHtml: rewritten,
          summary: 'Demo rewrite suggestion',
        },
      };
    }
  }
};

export const createDemoAiProvider = (): InkAiProvider => ({
  id: INK_AI_DEMO_PROVIDER_ID,
  name: 'Ink Demo Provider',
  models: [
    {
      id: INK_AI_DEMO_MODEL_ID,
      provider: 'demo',
      label: 'Ink Demo (local)',
      family: 'Demo',
    },
  ],
  run: runDemo,
});
