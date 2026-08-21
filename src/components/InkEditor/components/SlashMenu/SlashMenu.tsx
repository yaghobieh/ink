import type { FC } from 'react';
import {
  INK_CLASS_SLASH_MARK_AI,
  NUMBER_ZERO,
  SLASH_ARIA_LABEL,
  SLASH_CATEGORY_AI,
  SLASH_ENTER_SHORTCUT,
  SLASH_HINT_AFTER,
  SLASH_HINT_AI,
  SLASH_HINT_BEFORE,
  SLASH_MOD_SHORTCUT,
  SLASH_PREFIX,
  SLASH_SEARCH_LABEL,
  SPACE_STRING,
} from '../../../../constants';
import type { SlashCommandItem } from '../../../../types';
import { groupSlashCommands } from '../../../../utils';

export interface SlashMenuProps {
  items: SlashCommandItem[];
  top: number;
  left: number;
  query: string;
  onSelect: (item: SlashCommandItem) => void;
}

export const SlashMenu: FC<SlashMenuProps> = (props) => {
  const { items, top, left, query, onSelect } = props;
  if (items.length === NUMBER_ZERO) return null;
  const groups = groupSlashCommands(items);
  const selectedId = items[NUMBER_ZERO]?.id;
  return (
    <div className="Ink-Slash" style={{ top, left }} role="listbox" aria-label={SLASH_ARIA_LABEL}>
      <div className="Ink-Slash__search" aria-hidden="true">
        {SLASH_SEARCH_LABEL}
        {SLASH_PREFIX}
        {query ? ` ${query}` : ''}
      </div>
      {groups.map((group) => (
        <div key={group.category} className="Ink-Slash__group">
          <div className="Ink-Slash__cat">{group.category}</div>
          {group.items.map((item) => {
            const selected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`Ink-Slash__item${selected ? ' Ink-Slash__item--sel' : ''}`}
                onMouseDown={(event) => {
                  event.preventDefault();
                  onSelect(item);
                }}
              >
                <span
                  className={`Ink-Slash__mark${item.category === SLASH_CATEGORY_AI ? `${SPACE_STRING}${INK_CLASS_SLASH_MARK_AI}` : ''}`}
                >
                  {item.mark}
                </span>
                <span className="Ink-Slash__txt">
                  <span className="Ink-Slash__name">{item.label}</span>
                  <span className="Ink-Slash__desc">{item.description}</span>
                </span>
                <span className="Ink-Slash__key">{selected ? SLASH_ENTER_SHORTCUT : item.shortcut}</span>
              </button>
            );
          })}
        </div>
      ))}
      <div className="Ink-Slash__hint">
        {SLASH_HINT_BEFORE}
        <span className="Ink-Slash__caret" aria-hidden="true" />
        {SLASH_HINT_AFTER}
        <kbd className="Ink-Slash__key">{SLASH_MOD_SHORTCUT}</kbd>
        {SLASH_HINT_AI}
      </div>
    </div>
  );
};
