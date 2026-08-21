import type { FC, MouseEvent } from 'react';
import type { ToolbarButtonProps } from '../../../../types';
import { Button } from '@common-components';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const { icon, title, active = false, onClick, disabled = false, className } = props;

  const stopMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Button
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      active={active}
      className={className}
      onMouseDown={stopMouseDown}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
