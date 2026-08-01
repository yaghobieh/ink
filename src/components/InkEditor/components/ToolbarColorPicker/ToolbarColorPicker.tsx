import type { ChangeEvent, FC } from 'react';
import type { ToolbarColorPickerProps } from '../../../../types';
import { INK_COLOR_SWATCHES } from '../../../../constants';

export const ToolbarColorPicker: FC<ToolbarColorPickerProps> = (props) => {
  const { value, onChange, title, disabled = false, type = 'text' } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="Ink-Editor__color" title={title} aria-label={title}>
      <span className="Ink-Editor__color-swatch" style={{ background: value }} data-type={type} />
      <input
        type="color"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        list={`ink-colors-${type}`}
      />
      <datalist id={`ink-colors-${type}`}>
        {INK_COLOR_SWATCHES.map((swatch) => (
          <option key={swatch} value={swatch} />
        ))}
      </datalist>
    </label>
  );
};
