export interface AiSelectionBubbleProps {
  open: boolean;
  top: number;
  left: number;
  busy: boolean;
  preview: string;
  onAction: (actionId: string) => void;
  onApply: () => void;
  onDismiss: () => void;
}
