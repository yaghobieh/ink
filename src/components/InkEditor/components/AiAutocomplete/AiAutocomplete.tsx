import type { FC } from 'react';
import { AI_AUTOCOMPLETE_ARIA_HIDDEN, AI_AUTOCOMPLETE_CLASS } from './AiAutocomplete.const';
import type { AiAutocompleteProps } from './AiAutocomplete.types';

export const AiAutocomplete: FC<AiAutocompleteProps> = (props) => {
  const { suggestion, position, visible } = props;
  if (!visible || !suggestion) return null;

  return (
    <span
      className={AI_AUTOCOMPLETE_CLASS}
      style={{ top: position.top, left: position.left }}
      aria-hidden={AI_AUTOCOMPLETE_ARIA_HIDDEN}
    >
      {suggestion}
    </span>
  );
};
