import type { FC } from 'react';
import type { ToolbarButtonProps } from '../../../../types';
import { INK_CLASS_BUTTON, INK_CLASS_BUTTON_ACTIVE } from '../../../../constants';
import { cn } from '../../../../utils';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const { icon, title, active = false, onClick, disabled = false } = props;
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      className={cn(INK_CLASS_BUTTON, active && INK_CLASS_BUTTON_ACTIVE)}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
