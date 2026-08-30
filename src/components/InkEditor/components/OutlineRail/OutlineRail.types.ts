import type { OutlineItem } from '../../../../types';

export type OutlineRailProps = {
  items: OutlineItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onHide?: () => void;
};
