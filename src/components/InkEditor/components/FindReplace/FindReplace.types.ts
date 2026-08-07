export type FindReplaceFocusField = 'find' | 'replace';

export interface FindReplaceProps {
  open: boolean;
  onClose: () => void;
  onReplace: (find: string, replace: string, replaceAll: boolean) => void;
  findLabel?: string;
  replaceLabel?: string;
  replaceOneLabel?: string;
  replaceAllLabel?: string;
  closeLabel?: string;
  title?: string;
  focusField?: FindReplaceFocusField;
}
