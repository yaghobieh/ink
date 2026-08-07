import type { FC } from 'react';
import type { ToolbarButtonProps } from '../../../../types';
import { Button } from '@common-components';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const { icon, title, active = false, onClick, disabled = false } = props;
  return (
    <Button
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      active={active}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
