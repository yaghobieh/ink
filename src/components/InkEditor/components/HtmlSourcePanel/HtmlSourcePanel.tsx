import type { ChangeEvent, FC } from 'react';
import { INK_CLASS_SOURCE, INK_HTML_SOURCE_TITLE } from '../../../../constants';
import type { HtmlSourcePanelProps } from './HtmlSourcePanel.types';

export const HtmlSourcePanel: FC<HtmlSourcePanelProps> = (props) => {
  const { value, onChange, disabled = false, minHeight } = props;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className={INK_CLASS_SOURCE}
      aria-label={INK_HTML_SOURCE_TITLE}
      value={value}
      disabled={disabled}
      spellCheck={false}
      style={{ minHeight }}
      onChange={handleChange}
    />
  );
};
