import type { FC } from 'react';
import { Button } from '@common-components';
import { TOOLBAR_OPTION_LABELS } from '../../../../constants';
import {
  TOOLBAR_CUSTOMIZE_ACTIONS_CLASS,
  TOOLBAR_CUSTOMIZE_CLASS,
  TOOLBAR_CUSTOMIZE_DEFAULT_CLOSE,
  TOOLBAR_CUSTOMIZE_DEFAULT_LIST_ARIA,
  TOOLBAR_CUSTOMIZE_DEFAULT_TITLE,
  TOOLBAR_CUSTOMIZE_INPUT_TYPE,
  TOOLBAR_CUSTOMIZE_ITEM_CLASS,
  TOOLBAR_CUSTOMIZE_LIST_CLASS,
  TOOLBAR_CUSTOMIZE_TITLE_CLASS,
} from './ToolbarCustomize.const';
import type { ToolbarCustomizeProps } from './ToolbarCustomize.types';

export const ToolbarCustomize: FC<ToolbarCustomizeProps> = (props) => {
  const {
    open,
    options,
    visibleItems,
    onToggle,
    onClose,
    title = TOOLBAR_CUSTOMIZE_DEFAULT_TITLE,
    closeLabel = TOOLBAR_CUSTOMIZE_DEFAULT_CLOSE,
    listAriaLabel = TOOLBAR_CUSTOMIZE_DEFAULT_LIST_ARIA,
  } = props;

  if (!open) return null;

  const enabled = new Set(visibleItems);

  return (
    <div className={TOOLBAR_CUSTOMIZE_CLASS} aria-label={title}>
      <p className={TOOLBAR_CUSTOMIZE_TITLE_CLASS}>{title}</p>
      <ul className={TOOLBAR_CUSTOMIZE_LIST_CLASS} aria-label={listAriaLabel}>
        {options.map((option) => {
          const checked = enabled.has(option);
          const label = TOOLBAR_OPTION_LABELS[option] ?? option;
          return (
            <li key={option} className={TOOLBAR_CUSTOMIZE_ITEM_CLASS}>
              <label>
                <input
                  type={TOOLBAR_CUSTOMIZE_INPUT_TYPE}
                  checked={checked}
                  onChange={(event) => onToggle(option, event.target.checked)}
                />
                <span>{label}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className={TOOLBAR_CUSTOMIZE_ACTIONS_CLASS}>
        <Button type="button" onClick={onClose}>
          {closeLabel}
        </Button>
      </div>
    </div>
  );
};
