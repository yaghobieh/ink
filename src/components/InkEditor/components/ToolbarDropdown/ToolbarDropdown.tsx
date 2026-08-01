import type { ChangeEvent, FC } from 'react';
import type { ToolbarDropdownProps } from '../../../../types';

export const ToolbarDropdown: FC<ToolbarDropdownProps> = (props) => {
  const { options, value, onChange, title, disabled = false } = props;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      className="Ink-Editor__select"
      title={title}
      aria-label={title}
      value={value}
      disabled={disabled}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
