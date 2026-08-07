import type { FC } from 'react';
import { Box } from '../Box';
import { FIELD_CLASS, FIELD_LABEL_CLASS } from './Field.const';
import type { FieldProps } from './Field.types';
import { cn } from '@utils';

export const Field: FC<FieldProps> = (props) => {
  const { label, value, onChange, autoFocus = false, className, inputProps } = props;
  return (
    <label className={cn(FIELD_CLASS, className)}>
      <Box as="span" className={FIELD_LABEL_CLASS}>
        {label}
      </Box>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoFocus={autoFocus}
        {...inputProps}
      />
    </label>
  );
};
