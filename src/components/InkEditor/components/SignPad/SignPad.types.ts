export interface SignPadProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (dataUrl: string) => void;
  clearLabel?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  title?: string;
}
