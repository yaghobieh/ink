import type { FC, MouseEvent } from 'react';
import type { ToolbarButtonProps } from '../../../../types';
import { Button } from '@common-components';
import { EMPTY_STRING, INK_CLASS_PLUGIN_PIP, INK_CLASS_TOOL_WRAP } from '../../../../constants';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const {
    icon,
    title,
    hint,
    onHint,
    pluginColor,
    active = false,
    onClick,
    disabled = false,
    className,
  } = props;

  const stopMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const detail = hint || title;

  return (
    <span
      className={INK_CLASS_TOOL_WRAP}
      onMouseEnter={() => onHint?.(detail)}
      onMouseLeave={() => onHint?.(EMPTY_STRING)}
    >
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
        {pluginColor ? (
          <span className={INK_CLASS_PLUGIN_PIP} style={{ background: pluginColor }} aria-hidden />
        ) : null}
      </Button>
    </span>
  );
};
