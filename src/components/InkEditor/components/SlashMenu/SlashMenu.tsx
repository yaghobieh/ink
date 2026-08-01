import type { FC } from 'react';
import type { SlashCommandItem } from '../../../../types';

export interface SlashMenuProps {
  items: SlashCommandItem[];
  top: number;
  left: number;
  onSelect: (item: SlashCommandItem) => void;
}

export const SlashMenu: FC<SlashMenuProps> = (props) => {
  const { items, top, left, onSelect } = props;
  if (items.length === 0) return null;
  return (
    <div className="Ink-Slash" style={{ top, left }} role="listbox" aria-label="Slash commands">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="option"
          className="Ink-Slash__item"
          onMouseDown={(event) => {
            event.preventDefault();
            onSelect(item);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
