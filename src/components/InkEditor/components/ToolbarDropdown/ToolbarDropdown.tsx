import { useEffect, useRef, useState, type FC, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  COLOR_MODE_LIGHT,
  EMPTY_STRING,
  INK_CLASS_STYLE_CHEV,
  INK_CLASS_STYLE_CHECK,
  INK_CLASS_STYLE_DD,
  INK_CLASS_STYLE_MENU,
  INK_CLASS_STYLE_MENU_FORCED,
  INK_CLASS_STYLE_MENU_PORTAL,
  INK_CLASS_STYLE_OPTION,
  INK_CLASS_STYLE_OPTION_SEL,
  INK_CLASS_STYLE_TRIGGER,
  INK_STYLE_CHECK,
  KEY_ESCAPE,
  NUMBER_ZERO,
  SPACE_STRING,
} from '../../../../constants';
import type { ToolbarDropdownProps } from '../../../../types';
import { getToolbarDropdownMenuPosition } from './ToolbarDropdown.utils';
import type { ToolbarDropdownMenuPosition } from './ToolbarDropdown.types';

const ChevronIcon = () => (
  <svg className={INK_CLASS_STYLE_CHEV} viewBox="0 0 10 10" aria-hidden="true">
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
  </svg>
);

export const ToolbarDropdown: FC<ToolbarDropdownProps> = (props) => {
  const { options, value, onChange, title, disabled = false } = props;
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<ToolbarDropdownMenuPosition>({
    top: NUMBER_ZERO,
    left: NUMBER_ZERO,
    minWidth: NUMBER_ZERO,
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[NUMBER_ZERO];
  const label = selected?.label ?? EMPTY_STRING;

  useEffect(() => {
    if (!open) return undefined;
    const place = () => {
      setMenuPosition(getToolbarDropdownMenuPosition(triggerRef.current));
    };
    place();
    const onPointer = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === KEY_ESCAPE) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  const onTriggerMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onToggle = () => {
    if (disabled) return;
    setOpen((current) => !current);
  };

  return (
    <div className={INK_CLASS_STYLE_DD} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={INK_CLASS_STYLE_TRIGGER}
        title={title}
        aria-label={title}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onMouseDown={onTriggerMouseDown}
        onClick={onToggle}
      >
        <span>{label}</span>
        <ChevronIcon />
      </button>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              className={`${INK_CLASS_STYLE_MENU} ${INK_CLASS_STYLE_MENU_PORTAL} ${INK_CLASS_STYLE_MENU_FORCED}`}
              data-color-mode={COLOR_MODE_LIGHT}
              role="listbox"
              aria-label={title}
              style={{ top: menuPosition.top, left: menuPosition.left, minWidth: menuPosition.minWidth }}
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                const optionClass = `${INK_CLASS_STYLE_OPTION}${isSelected ? `${SPACE_STRING}${INK_CLASS_STYLE_OPTION_SEL}` : EMPTY_STRING}`;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={optionClass}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    {isSelected ? (
                      <span className={INK_CLASS_STYLE_CHECK} aria-hidden="true">
                        {INK_STYLE_CHECK}
                      </span>
                    ) : null}
                    {option.label}
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
