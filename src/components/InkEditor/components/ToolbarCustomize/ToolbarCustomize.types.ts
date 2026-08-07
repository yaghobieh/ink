import type { ToolbarOption } from '../../../../types';

export interface ToolbarCustomizeProps {
  open: boolean;
  options: ToolbarOption[];
  visibleItems: ToolbarOption[];
  onToggle: (option: ToolbarOption, visible: boolean) => void;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  listAriaLabel?: string;
}
