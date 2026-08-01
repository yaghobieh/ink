import { useState, type FC, type FormEvent } from 'react';
import {
  INK_AI_DEMO_PROVIDER_ID,
  INK_QUICK_ACTIONS,
  INK_TRANSLATE_LANGUAGES,
} from '../../../../constants';
import type {
  InkAiChatTurn,
  InkAiConfig,
  InkAiDiffSuggestion,
  InkAiReviewSuggestion,
} from '../../../../types';
import { inkAi } from '../../../../plugins/ai';
import { createInkId } from '../../../../utils';

export interface AiPanelProps {
  config: InkAiConfig;
  documentHtml: string;
  selectionHtml: string;
  onApplyHtml: (html: string) => void;
  onClose?: () => void;
}

type AiTab = 'chat' | 'actions' | 'review' | 'translate';

export const AiPanel: FC<AiPanelProps> = (props) => {
  const { config, documentHtml, selectionHtml, onApplyHtml, onClose } = props;
  const [tab, setTab] = useState<AiTab>('chat');
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<InkAiChatTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [diff, setDiff] = useState<InkAiDiffSuggestion | null>(null);
  const [reviews, setReviews] = useState<InkAiReviewSuggestion[]>([]);
  const [language, setLanguage] = useState<string>(INK_TRANSLATE_LANGUAGES[1]);
  const providerId = config.providerId || INK_AI_DEMO_PROVIDER_ID;
  const themeClass = config.uiTheme?.className || config.className || '';

  const runCapability = async (
    capability: Parameters<typeof inkAi.runProvider>[1]['capability'],
    options?: Record<string, string>,
    userPrompt?: string,
  ) => {
    setBusy(true);
    try {
      const nextHistory =
        capability === 'chat' && userPrompt
          ? [
              ...history,
              {
                id: createInkId('turn'),
                role: 'user' as const,
                content: userPrompt,
                timestamp: Date.now(),
                capability,
              },
            ]
          : history;
      if (capability === 'chat' && userPrompt) {
        setHistory(nextHistory);
      }
      const response = await inkAi.runProvider(providerId, {
        capability,
        html: documentHtml,
        selectionHtml: selectionHtml || undefined,
        prompt: userPrompt,
        history: nextHistory,
        options,
        modelId: config.modelId,
        documentSnapshot: { html: documentHtml, selectionHtml: selectionHtml || undefined },
      });
      if (response.turns?.length) {
        setHistory((prev) => [...prev, ...response.turns!]);
      } else if (response.text && capability !== 'chat') {
        setHistory((prev) => [
          ...prev,
          {
            id: createInkId('turn'),
            role: 'assistant',
            content: response.text || '',
            timestamp: Date.now(),
            capability,
          },
        ]);
      }
      if (response.diff) setDiff(response.diff);
      if (response.reviewSuggestions) setReviews(response.reviewSuggestions);
    } finally {
      setBusy(false);
    }
  };

  const handleChat = (event: FormEvent) => {
    event.preventDefault();
    const text = prompt.trim();
    if (!text || busy) return;
    setPrompt('');
    void runCapability('chat', undefined, text);
  };

  return (
    <aside
      className={`Ink-Ai ${themeClass}`.trim()}
      data-placement={config.placement || 'sidebar'}
      style={{
        ['--ink-ai-accent' as string]: config.uiTheme?.accent,
        ['--ink-ai-surface' as string]: config.uiTheme?.surface,
        ['--ink-ai-border' as string]: config.uiTheme?.border,
      }}
      aria-label="Ink AI"
    >
      <div className="Ink-Ai__header">
        <strong>Ink AI</strong>
        {onClose ? (
          <button type="button" className="Ink-Editor__button" onClick={onClose} title="Close AI">
            ×
          </button>
        ) : null}
      </div>
      <div className="Ink-Ai__tabs" role="tablist">
        {(['chat', 'actions', 'review', 'translate'] as AiTab[]).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            className={`Ink-Editor__button${tab === item ? ' Ink-Editor__button--active' : ''}`}
            aria-selected={tab === item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="Ink-Ai__body">
        {tab === 'chat' ? (
          <>
            <div className="Ink-Ai__history">
              {history.length === 0 ? (
                <p className="Ink-Ai__empty">
                  Multi-turn chat with local demo provider. Bring your own LLM via{' '}
                  <code>inkAi.registerProvider</code>.
                </p>
              ) : (
                history.map((turn) => (
                  <div key={turn.id} className={`Ink-Ai__turn Ink-Ai__turn--${turn.role}`}>
                    <span>{turn.role}</span>
                    <p>{turn.content}</p>
                  </div>
                ))
              )}
            </div>
            <form className="Ink-Ai__form" onSubmit={handleChat}>
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask Ink AI…"
                disabled={busy}
              />
              <button type="submit" className="Ink-Editor__button Ink-Editor__button--active" disabled={busy}>
                Send
              </button>
            </form>
          </>
        ) : null}
        {tab === 'actions' ? (
          <div className="Ink-Ai__actions">
            <p className="Ink-Ai__hint">Quick actions use the current selection (or full document).</p>
            {INK_QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                className="Ink-Editor__button Ink-Ai__action"
                disabled={busy}
                onClick={() => void runCapability(action.capability)}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
        {tab === 'review' ? (
          <div className="Ink-Ai__review">
            <button
              type="button"
              className="Ink-Editor__button Ink-Editor__button--active"
              disabled={busy}
              onClick={() => void runCapability('review')}
            >
              Run grammar & style review
            </button>
            {reviews.map((item) => (
              <article key={item.id} className={`Ink-Ai__suggestion Ink-Ai__suggestion--${item.severity}`}>
                <strong>{item.severity}</strong>
                <p>{item.message}</p>
                <code>{item.suggestedText}</code>
              </article>
            ))}
          </div>
        ) : null}
        {tab === 'translate' ? (
          <div className="Ink-Ai__translate">
            <label>
              Language
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {INK_TRANSLATE_LANGUAGES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="Ink-Editor__button Ink-Editor__button--active"
              disabled={busy}
              onClick={() => void runCapability('translate', { language })}
            >
              Translate
            </button>
          </div>
        ) : null}
        {diff ? (
          <div className="Ink-Ai__diff">
            <strong>Suggested change</strong>
            <p>{diff.summary}</p>
            <div className="Ink-Ai__diff-preview" dangerouslySetInnerHTML={{ __html: diff.suggestedHtml }} />
            <div className="Ink-Ai__diff-actions">
              <button
                type="button"
                className="Ink-Editor__button Ink-Editor__button--active"
                onClick={() => {
                  onApplyHtml(diff.suggestedHtml);
                  setDiff(null);
                }}
              >
                Apply
              </button>
              <button type="button" className="Ink-Editor__button" onClick={() => setDiff(null)}>
                Dismiss
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <footer className="Ink-Ai__footer">Demo provider · BYO LLM</footer>
    </aside>
  );
};
