import type { FC } from 'react';
import {
  NUMBER_ZERO,
  INK_CLASS_OUTLINE,
  INK_CLASS_OUTLINE_ITEM,
  INK_CLASS_OUTLINE_ITEM_ACTIVE,
  INK_CLASS_OUTLINE_LABEL,
  INK_CLASS_OUTLINE_TOGGLE,
  INK_OUTLINE_EMPTY,
  INK_OUTLINE_HIDE,
  INK_OUTLINE_LABEL,
} from '../../../../constants';
import type { OutlineRailProps } from './OutlineRail.types';

export const OutlineRail: FC<OutlineRailProps> = (props) => {
  const { items, activeIndex, onSelect, onHide } = props;
  return (
    <aside className={INK_CLASS_OUTLINE} aria-label={INK_OUTLINE_LABEL}>
      <div className={INK_CLASS_OUTLINE_LABEL}>
        {INK_OUTLINE_LABEL}
        {onHide ? (
          <button type="button" className={INK_CLASS_OUTLINE_TOGGLE} onClick={onHide}>
            {INK_OUTLINE_HIDE}
          </button>
        ) : null}
      </div>
      {items.length === NUMBER_ZERO ? (
        <p className={INK_CLASS_OUTLINE_ITEM}>{INK_OUTLINE_EMPTY}</p>
      ) : null}
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
