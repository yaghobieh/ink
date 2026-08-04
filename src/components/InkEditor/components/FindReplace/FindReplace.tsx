import { useState, type FC, type FormEvent } from 'react';
import { EMPTY_STRING } from '@/constants/generals.const';
import {
  FIND_REPLACE_ACTIONS_CLASS,
  FIND_REPLACE_CLASS,
  FIND_REPLACE_DEFAULT_ALL,
  FIND_REPLACE_DEFAULT_CLOSE,
  FIND_REPLACE_DEFAULT_FIND,
  FIND_REPLACE_DEFAULT_ONE,
  FIND_REPLACE_DEFAULT_REPLACE,
  FIND_REPLACE_DEFAULT_TITLE,
  FIND_REPLACE_FIELD_CLASS,
  FIND_REPLACE_TITLE_CLASS,
} from './FindReplace.const';
import type { FindReplaceProps } from './FindReplace.types';

export const FindReplace: FC<FindReplaceProps> = (props) => {
  const {
    open,
    onClose,
    onReplace,
    findLabel = FIND_REPLACE_DEFAULT_FIND,
    replaceLabel = FIND_REPLACE_DEFAULT_REPLACE,
    replaceOneLabel = FIND_REPLACE_DEFAULT_ONE,
    replaceAllLabel = FIND_REPLACE_DEFAULT_ALL,
    closeLabel = FIND_REPLACE_DEFAULT_CLOSE,
    title = FIND_REPLACE_DEFAULT_TITLE,
  } = props;
  const [find, setFind] = useState(EMPTY_STRING);
  const [replace, setReplace] = useState(EMPTY_STRING);

  if (!open) return null;

  const submit = (event: FormEvent, replaceAll: boolean) => {
    event.preventDefault();
    if (!find) return;
    onReplace(find, replace, replaceAll);
  };

  return (
    <form className={FIND_REPLACE_CLASS} aria-label={title} onSubmit={(event) => submit(event, false)}>
      <p className={FIND_REPLACE_TITLE_CLASS}>{title}</p>
      <label className={FIND_REPLACE_FIELD_CLASS}>
        <span>{findLabel}</span>
        <input value={find} onChange={(event) => setFind(event.target.value)} autoFocus />
      </label>
      <label className={FIND_REPLACE_FIELD_CLASS}>
        <span>{replaceLabel}</span>
        <input value={replace} onChange={(event) => setReplace(event.target.value)} />
      </label>
      <div className={FIND_REPLACE_ACTIONS_CLASS}>
        <button type="button" className="Ink-Editor__button" onClick={onClose}>
          {closeLabel}
        </button>
        <button type="submit" className="Ink-Editor__button" disabled={!find}>
          {replaceOneLabel}
        </button>
        <button
          type="button"
          className="Ink-Editor__button Ink-Editor__button--active"
          disabled={!find}
          onClick={(event) => submit(event, true)}
        >
          {replaceAllLabel}
        </button>
      </div>
    </form>
  );
};
