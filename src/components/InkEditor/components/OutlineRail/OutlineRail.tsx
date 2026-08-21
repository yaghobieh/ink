import type { FC } from 'react';
import {
  INK_CLASS_OUTLINE,
  INK_CLASS_OUTLINE_ITEM,
  INK_CLASS_OUTLINE_ITEM_ACTIVE,
  INK_CLASS_OUTLINE_LABEL,
  INK_OUTLINE_LABEL,
} from '../../../../constants';
import type { OutlineRailProps } from './OutlineRail.types';

export const OutlineRail: FC<OutlineRailProps> = (props) => {
  const { items, activeIndex, onSelect } = props;
  return (
    <aside className={INK_CLASS_OUTLINE} aria-label={INK_OUTLINE_LABEL}>
      <div className={INK_CLASS_OUTLINE_LABEL}>{INK_OUTLINE_LABEL}</div>
      {items.map((item) => {
        const isActive = item.index === activeIndex;
        return (
          <button
            key={`${item.level}-${item.index}`}
            type="button"
            className={`${INK_CLASS_OUTLINE_ITEM} ${INK_CLASS_OUTLINE_ITEM}--h${item.level}${
              isActive ? ` ${INK_CLASS_OUTLINE_ITEM_ACTIVE}` : ''
            }`}
            onClick={() => onSelect(item.index)}
          >
            <span className={`${INK_CLASS_OUTLINE_ITEM}-dot`} aria-hidden="true" />
            {item.text}
          </button>
        );
      })}
    </aside>
  );
};
