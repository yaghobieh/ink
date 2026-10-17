import type { FC } from 'react';

export interface MentionMenuProps {
  open: boolean;
  top: number;
  left: number;
  people: Array<{ id: string; label: string }>;
  onSelect: (person: { id: string; label: string }) => void;
}

export const MentionMenu: FC<MentionMenuProps> = (props) => {
  const { open, top, left, people, onSelect } = props;
  if (!open || people.length === 0) return null;
  return (
    <div className="Ink-Mentions" style={{ top, left }} role="listbox" aria-label="Mention someone">
      {people.map((person) => (
        <button
          key={person.id}
          type="button"
          className="Ink-Mentions__item"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(person)}
        >
          @{person.label}
        </button>
      ))}
    </div>
  );
};
