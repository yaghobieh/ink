import { useEffect, useRef, useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import {
  COLOR_MODE_LIGHT,
  INK_CLASS_GRAPH_PANEL,
  INK_CLASS_GRAPH_PREVIEW,
  INK_CLASS_GRAPH_TYPES,
  INK_CLASS_STYLE_DD,
  INK_CLASS_STYLE_MENU,
  INK_CLASS_STYLE_MENU_FORCED,
  INK_CLASS_STYLE_MENU_PORTAL,
  INK_GRAPH_INSERT,
  INK_GRAPH_TITLE,
  KEY_ESCAPE,
  NUMBER_ZERO,
} from '../../../../constants';
import {
  GRAPH_KIND_DEFAULT,
  GRAPH_KIND_LABELS,
  GRAPH_KINDS,
  GRAPH_SAMPLE,
  buildGraphHtml,
  type GraphKind,
} from '../../../../plugins/graph';
import { getToolbarDropdownMenuPosition } from '../ToolbarDropdown/ToolbarDropdown.utils';
import { ToolbarButton } from '../ToolbarButton';
import type { GraphPickerProps } from './GraphPicker.types';

export const GraphPicker: FC<GraphPickerProps> = (props) => {
  const { icon, disabled = false, hint, onHint, pluginColor, onInsert } = props;
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<GraphKind>(GRAPH_KIND_DEFAULT);
  const [menuPosition, setMenuPosition] = useState({ top: NUMBER_ZERO, left: NUMBER_ZERO });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const next = getToolbarDropdownMenuPosition(triggerRef.current);
      setMenuPosition({ top: next.top, left: next.left });
    };
    place();
    const onPointer = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === KEY_ESCAPE) setOpen(false);
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

  return (
    <div className={INK_CLASS_STYLE_DD} ref={rootRef}>
      <div ref={triggerRef}>
        <ToolbarButton
          icon={icon}
          title={INK_GRAPH_TITLE}
          hint={hint}
          onHint={onHint}
          pluginColor={pluginColor}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((current) => !current);
          }}
        />
      </div>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              className={`${INK_CLASS_STYLE_MENU} ${INK_CLASS_STYLE_MENU_PORTAL} ${INK_CLASS_STYLE_MENU_FORCED} ${INK_CLASS_GRAPH_PANEL}`}
              data-color-mode={COLOR_MODE_LIGHT}
              role="dialog"
              aria-label={INK_GRAPH_TITLE}
              style={{ top: menuPosition.top, left: menuPosition.left }}
            >
              <div className={INK_CLASS_GRAPH_TYPES}>
                {GRAPH_KINDS.map((next) => (
                  <button
                    key={next}
                    type="button"
                    aria-pressed={next === kind}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setKind(next);
                    }}
                  >
                    {GRAPH_KIND_LABELS[next]}
                  </button>
                ))}
              </div>
              <div
                className={INK_CLASS_GRAPH_PREVIEW}
                dangerouslySetInnerHTML={{ __html: buildGraphHtml(kind, GRAPH_SAMPLE) }}
              />
              <button
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onInsert(buildGraphHtml(kind, GRAPH_SAMPLE));
                  setOpen(false);
                }}
              >
                {INK_GRAPH_INSERT}
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
