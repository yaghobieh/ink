export interface AiAutocompletePosition {
  top: number;
  left: number;
}

export interface AiAutocompleteProps {
  suggestion: string;
  position: AiAutocompletePosition;
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
