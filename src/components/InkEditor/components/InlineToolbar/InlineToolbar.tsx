import { useEffect, useRef, type FC, type MouseEvent } from 'react';
import { Button } from '@common-components';
import {
  INLINE_TOOLBAR_ACTION_BOLD,
  INLINE_TOOLBAR_ACTION_CLEAR,
  INLINE_TOOLBAR_ACTION_CODE,
  INLINE_TOOLBAR_ACTION_ITALIC,
  INLINE_TOOLBAR_ACTION_UNDERLINE,
  INLINE_TOOLBAR_ARIA_LABEL,
  INLINE_TOOLBAR_CLASS,
  INLINE_TOOLBAR_DIVIDER_CLASS,
  INLINE_TOOLBAR_EVENT_KEY_DOWN,
  INLINE_TOOLBAR_EVENT_POINTER_DOWN,
  INLINE_TOOLBAR_ITEM_CLASS,
  INLINE_TOOLBAR_KEY_ESCAPE,
  INLINE_TOOLBAR_LINK_ID,
  INLINE_TOOLBAR_ROLE,
  INLINE_TOOLBAR_TITLE_BOLD,
  INLINE_TOOLBAR_TITLE_CLEAR,
  INLINE_TOOLBAR_TITLE_CODE,
  INLINE_TOOLBAR_TITLE_ITALIC,
  INLINE_TOOLBAR_TITLE_LINK,
  INLINE_TOOLBAR_TITLE_UNDERLINE,
} from './InlineToolbar.const';
import type {
  InlineToolbarFormatAction,
  InlineToolbarProps,
} from './InlineToolbar.types';

export const InlineToolbar: FC<InlineToolbarProps> = (props) => {
  const {
    open,
    top,
    left,
    icons,
    activeFormats,
    disabled = false,
    onFormat,
    onLink,
    onClose,
  } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        onClose();
        return;
      }
      if (rootRef.current?.contains(target)) return;
      onClose();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === INLINE_TOOLBAR_KEY_ESCAPE) onClose();
    };
    window.addEventListener(INLINE_TOOLBAR_EVENT_POINTER_DOWN, handlePointer);
    window.addEventListener(INLINE_TOOLBAR_EVENT_KEY_DOWN, handleKey);
    return () => {
      window.removeEventListener(INLINE_TOOLBAR_EVENT_POINTER_DOWN, handlePointer);
      window.removeEventListener(INLINE_TOOLBAR_EVENT_KEY_DOWN, handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const stopMouseDown = (event: MouseEvent) => {
    event.preventDefault();
  };

  const runFormat = (action: InlineToolbarFormatAction) => {
    onFormat(action);
  };

  return (
    <div
      ref={rootRef}
      className={INLINE_TOOLBAR_CLASS}
      role={INLINE_TOOLBAR_ROLE}
      aria-label={INLINE_TOOLBAR_ARIA_LABEL}
      style={{ top, left }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <Button
        className={INLINE_TOOLBAR_ITEM_CLASS}
        title={INLINE_TOOLBAR_TITLE_BOLD}
        aria-label={INLINE_TOOLBAR_TITLE_BOLD}
        aria-pressed={activeFormats?.has(INLINE_TOOLBAR_ACTION_BOLD)}
        active={activeFormats?.has(INLINE_TOOLBAR_ACTION_BOLD)}
        disabled={disabled}
        onMouseDown={stopMouseDown}
        onClick={() => runFormat(INLINE_TOOLBAR_ACTION_BOLD)}
      >
        {icons.bold}
      </Button>
      <Button
        className={INLINE_TOOLBAR_ITEM_CLASS}
        title={INLINE_TOOLBAR_TITLE_ITALIC}
        aria-label={INLINE_TOOLBAR_TITLE_ITALIC}
        aria-pressed={activeFormats?.has(INLINE_TOOLBAR_ACTION_ITALIC)}
        active={activeFormats?.has(INLINE_TOOLBAR_ACTION_ITALIC)}
        disabled={disabled}
        onMouseDown={stopMouseDown}
        onClick={() => runFormat(INLINE_TOOLBAR_ACTION_ITALIC)}
      >
        {icons.italic}
      </Button>
      <Button
        className={INLINE_TOOLBAR_ITEM_CLASS}
        title={INLINE_TOOLBAR_TITLE_UNDERLINE}
        aria-label={INLINE_TOOLBAR_TITLE_UNDERLINE}
        aria-pressed={activeFormats?.has(INLINE_TOOLBAR_ACTION_UNDERLINE)}
        active={activeFormats?.has(INLINE_TOOLBAR_ACTION_UNDERLINE)}
        disabled={disabled}
        onMouseDown={stopMouseDown}
        onClick={() => runFormat(INLINE_TOOLBAR_ACTION_UNDERLINE)}
      >
        {icons.underline}
      </Button>
      <Button
        className={INLINE_TOOLBAR_ITEM_CLASS}
        title={INLINE_TOOLBAR_TITLE_CODE}
        aria-label={INLINE_TOOLBAR_TITLE_CODE}
        aria-pressed={activeFormats?.has(INLINE_TOOLBAR_ACTION_CODE)}
        active={activeFormats?.has(INLINE_TOOLBAR_ACTION_CODE)}
        disabled={disabled}
        onMouseDown={stopMouseDown}
        onClick={() => runFormat(INLINE_TOOLBAR_ACTION_CODE)}
      >
        {icons.code}
      </Button>
      <span className={INLINE_TOOLBAR_DIVIDER_CLASS} aria-hidden="true" />
      <Button
        className={INLINE_TOOLBAR_ITEM_CLASS}
        title={INLINE_TOOLBAR_TITLE_LINK}
        aria-label={INLINE_TOOLBAR_TITLE_LINK}
        disabled={disabled}
        data-action={INLINE_TOOLBAR_LINK_ID}
        onMouseDown={stopMouseDown}
        onClick={onLink}
      >
        {icons.link}
      </Button>
      <Button
        className={INLINE_TOOLBAR_ITEM_CLASS}
        title={INLINE_TOOLBAR_TITLE_CLEAR}
        aria-label={INLINE_TOOLBAR_TITLE_CLEAR}
        disabled={disabled}
        onMouseDown={stopMouseDown}
        onClick={() => runFormat(INLINE_TOOLBAR_ACTION_CLEAR)}
      >
        {icons.clearFormat}
      </Button>
    </div>
  );
};
