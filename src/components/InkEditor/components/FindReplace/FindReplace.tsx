import { useState, type FC, type FormEvent } from 'react';
import { EMPTY_STRING } from '@/constants/generals.const';
import { Button, Field } from '@common-components';
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
      <Field
        className={FIND_REPLACE_FIELD_CLASS}
        label={findLabel}
        value={find}
        onChange={setFind}
        autoFocus
      />
      <Field
        className={FIND_REPLACE_FIELD_CLASS}
        label={replaceLabel}
        value={replace}
        onChange={setReplace}
      />
      <div className={FIND_REPLACE_ACTIONS_CLASS}>
        <Button type="button" onClick={onClose}>
          {closeLabel}
        </Button>
        <Button type="submit" disabled={!find}>
          {replaceOneLabel}
        </Button>
        <Button type="button" active disabled={!find} onClick={(event) => submit(event, true)}>
          {replaceAllLabel}
        </Button>
      </div>
    </form>
  );
};
