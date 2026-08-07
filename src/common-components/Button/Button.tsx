import type { FC } from 'react';
import { cn } from '@utils';
import {
  BUTTON_ACTIVE_CLASS,
  BUTTON_CLASS,
  BUTTON_EDITOR_ACTIVE_CLASS,
  BUTTON_EDITOR_CLASS,
} from './Button.const';
import type { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = (props) => {
  const { active = false, className, children, type = 'button', ...rest } = props;
  return (
    <button
      type={type}
      className={cn(
        BUTTON_CLASS,
        BUTTON_EDITOR_CLASS,
        active && BUTTON_ACTIVE_CLASS,
        active && BUTTON_EDITOR_ACTIVE_CLASS,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
