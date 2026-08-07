import type { InputHTMLAttributes, ReactNode } from 'react';

export type FieldProps = {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  className?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'autoFocus'>;
};
