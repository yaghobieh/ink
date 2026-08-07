import {
  useEffect,
  useRef,
  useState,
  type FC,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import type {
  InkCommentThread,
  InkEditorProps,
  InkTrackChange,
  SlashCommandItem,
  ToolbarOption,
} from '../../types';
import {
  BLOCK_DROP_POSITION_BEFORE,
  COLOR_MODE_SYSTEM,
  CONTEXT_MENU_ID_BOLD,
  CONTEXT_MENU_ID_BULLET,
  CONTEXT_MENU_ID_CLEAR,
  CONTEXT_MENU_ID_COMMENT,
  CONTEXT_MENU_ID_FIND,
  CONTEXT_MENU_ID_HEADING,
  CONTEXT_MENU_ID_ITALIC,
  CONTEXT_MENU_ID_LINK,
  CONTEXT_MENU_ID_ORDERED,
  CONTEXT_MENU_ID_SHOW_TOOLBAR,
  CONTEXT_MENU_ID_SIGNATURE,
  CONTEXT_MENU_ID_STRIKE,
  CONTEXT_MENU_ID_TABLE_COL_LEFT,
  CONTEXT_MENU_ID_TABLE_COL_RIGHT,
  CONTEXT_MENU_ID_TABLE_DELETE_COL,
  CONTEXT_MENU_ID_TABLE_DELETE_ROW,
  CONTEXT_MENU_ID_TABLE_ROW_ABOVE,
  CONTEXT_MENU_ID_TABLE_ROW_BELOW,
  CONTEXT_MENU_ID_UNDERLINE,
  CONTEXT_MENU_LABEL_BOLD,
  CONTEXT_MENU_LABEL_BULLET,
  CONTEXT_MENU_LABEL_CLEAR,
  CONTEXT_MENU_LABEL_COMMENT,
  CONTEXT_MENU_LABEL_FIND,
  CONTEXT_MENU_LABEL_HEADING,
  CONTEXT_MENU_LABEL_ITALIC,
  CONTEXT_MENU_LABEL_LINK,
  CONTEXT_MENU_LABEL_ORDERED,
  CONTEXT_MENU_LABEL_SHOW_TOOLBAR,
  CONTEXT_MENU_LABEL_SIGNATURE,
  CONTEXT_MENU_LABEL_STRIKE,
  CONTEXT_MENU_LABEL_TABLE_COL_LEFT,
  CONTEXT_MENU_LABEL_TABLE_COL_RIGHT,
  CONTEXT_MENU_LABEL_TABLE_DELETE_COL,
  CONTEXT_MENU_LABEL_TABLE_DELETE_ROW,
  CONTEXT_MENU_LABEL_TABLE_ROW_ABOVE,
  CONTEXT_MENU_LABEL_TABLE_ROW_BELOW,
  CONTEXT_MENU_LABEL_UNDERLINE,
  DIR_LTR,
  DIR_RTL,
  FIND_REPLACE_DROPDOWN_TITLE,
  FIND_REPLACE_FOCUS_FIND,
  FIND_REPLACE_FOCUS_REPLACE,
  FIND_REPLACE_VALUE_REPLACE,
  FONT_DROPDOWN_TITLE,
  FONT_VALUE_SYSTEM,
  INK_BUTTON_CONFIG,
  INK_CLASS_BLOCK_ACTIVE,
  INK_CLASS_BODY,
  INK_CLASS_CONTENT,
  INK_CLASS_DIVIDER,
  INK_CLASS_FOOTER,
  INK_CLASS_ROOT,
  INK_CLASS_SHELL,
  INK_CLASS_TOOLBAR,
  INK_CLASS_TOOLBAR_SHOW,
  INK_DEFAULT_AUTHOR,
  INK_DEFAULT_CHROME,
  INK_DEFAULT_COLOR_MODE,
  INK_DEFAULT_FEATURES,
  INK_DEFAULT_HIGHLIGHT_COLOR,
  INK_DEFAULT_ICONS,
  INK_DEFAULT_TEXT_COLOR,
  INK_DEFAULT_TOOLBAR,
  INK_DEFAULT_VARIANT,
  INK_FIND_REPLACE_OPTIONS,
  INK_FONT_OPTIONS,
  INK_HEADING_OPTIONS,
  INK_LIST_OPTIONS,
  INK_MIN_HEIGHT,
  INK_PLACEHOLDER_DEFAULT,
  INK_TABLE_DEFAULT_COLS,
  INK_TABLE_DEFAULT_ROWS,
  INK_AI_DEMO_PROVIDER_ID,
  KEY_ENTER,
  KEY_ESCAPE,
  KEY_TAB,
  KEY_Z,
  LIST_DROPDOWN_TITLE,
  LIST_VALUE_BULLET,
  NUMBER_ZERO,
  TOOLBAR_CONTEXT_MENU_ID_CUSTOMIZE,
  TOOLBAR_CONTEXT_MENU_ID_HIDE,
  TOOLBAR_CONTEXT_MENU_LABEL_CUSTOMIZE,
  TOOLBAR_CONTEXT_MENU_LABEL_HIDE,
  TOOLBAR_OPTION_DIVIDER,
  TOOLBAR_OPTION_FIND_REPLACE,
  TOOLBAR_OPTION_FIND_REPLACE_DROPDOWN,
  TOOLBAR_OPTION_FONT_DROPDOWN,
  TOOLBAR_OPTION_HORIZONTAL_RULE,
  TOOLBAR_OPTION_LIST_DROPDOWN,
  TOOLBAR_OPTION_SIGNATURE,
  TOOLBAR_SHOW_CONTROL_ARIA_LABEL,
  TOOLBAR_SHOW_CONTROL_LABEL,
} from '../../constants';
import {
  acceptTrackChangeInHtml,
  applyTypoAutoFix,
  buildTableHtml,
  buildVisibleToolbarItems,
  deleteTableColumn,
  deleteTableRow,
  getTableCellFromSelection,
  insertTableColumn,
  insertTableRow,
  clearBlockDragClasses,
  cn,
  createCommentThread,
  createInkId,
  createTrackChange,
  extractClipboardHtml,
  extractClipboardText,
  extractSlashQuery,
  filterSlashCommands,
  getBlockElement,
  hasInkPremiumFeature,
  InkHistoryStack,
  listCustomizableToolbarOptions,
  markActiveBlock,
  markDraggingBlock,
  markDropTarget,
  moveBlock,
  reorderBlockAfter,
  reorderBlockBefore,
  rejectTrackChangeInHtml,
  removeCommentMark,
  readInkMemory,
  readToolbarHidden,
  readToolbarItems,
  replaceInHtml,
  resolveDropPosition,
  resolveInkPremium,
  sanitizePastedHtml,
  themeTokensToStyle,
  withPreservedSelection,
  writeInkMemory,
  writeToolbarHidden,
  writeToolbarItems,
  wrapDeleteHtml,
  wrapInsertHtml,
  wrapSelectionAsComment,
} from '../../utils';
import { Button, ContextMenu, type ContextMenuItem } from '@common-components';
import type { FindReplaceFocusField } from './components/FindReplace/FindReplace.types';
import {
  applyFontFamily,
  applyListType,
  clearFormatDeep,
  detectListType,
  execCommand,
  fileToDataUrl,
  getActiveFormats,
  insertHTML,
  insertImage,
  insertLink,
  queryCommandValue,
  setBlockDirection,
  setHighlightColor,
  setTextColor,
  tryConvertMarkdownListPrefix,
} from './helpers';
import { inkAi } from '../../plugins/ai';
import {
  AiAutocomplete,
  AI_AUTOCOMPLETE_COMMAND_INSERT_TEXT,
  AI_AUTOCOMPLETE_DEBOUNCE_MS,
  AiPanel,
  BlockHandles,
  BLOCK_HANDLES_DRAG_EFFECT_MOVE,
  BLOCK_HANDLES_DRAG_MIME,
  BLOCK_HANDLES_DRAG_PAYLOAD,
  CommentsPanel,
  FindReplace,
  getCaretPositionInRoot,
  getTextBeforeCaret,
  InlineToolbar,
  SignPad,
  SlashMenu,
  ToolbarButton,
  ToolbarColorPicker,
  ToolbarCustomize,
  ToolbarDropdown,
  TrackChangesBar,
  clampInlineToolbarPosition,
  selectionIsInsideElement,
  INLINE_TOOLBAR_EDGE_PADDING_PX,
  INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX,
  INLINE_TOOLBAR_ESTIMATED_WIDTH_PX,
  INLINE_TOOLBAR_GAP_PX,
} from './components';
import type { InlineToolbarFormatAction } from './components';

const getSelectionHtml = (): string => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === NUMBER_ZERO) return '';
  const range = selection.getRangeAt(NUMBER_ZERO);
  const container = document.createElement('div');
  container.appendChild(range.cloneContents());
  return container.innerHTML;
};

const focusEditor = (element: HTMLDivElement | null): void => {
  element?.focus({ preventScroll: true });
};

export const InkEditor: FC<InkEditorProps> = (props) => {
  const {
    value,
    defaultValue = '',
    onChange,
    placeholder = INK_PLACEHOLDER_DEFAULT,
    disabled = false,
    readOnly = false,
    minHeight = INK_MIN_HEIGHT,
    maxHeight,
    toolbar = INK_DEFAULT_TOOLBAR,
    className = '',
    testId,
    allowImagePaste = true,
    showCharCount = false,
    charCountMax,
    typoAutoFix = true,
    variant = INK_DEFAULT_VARIANT,
    chrome = INK_DEFAULT_CHROME,
    colorMode = INK_DEFAULT_COLOR_MODE,
    features: featuresProp,
    author = INK_DEFAULT_AUTHOR,
    trackChanges: trackChangesProp,
    onTrackChangesChange,
    trackChangesEnabled: trackChangesEnabledProp,
    onTrackChangesEnabledChange,
    comments: commentsProp,
    onCommentsChange,
    showCommentsPanel: showCommentsPanelProp,
    onShowCommentsPanelChange,
    ai,
    slashCommands,
    tableRows = INK_TABLE_DEFAULT_ROWS,
    tableCols = INK_TABLE_DEFAULT_COLS,
    premium: premiumProp,
    theme,
    icons: iconsProp,
    pasteMode = 'plain',
    onImageUpload,
    wysiwyg = false,
    keepInMemory = false,
    memoryKey,
    onToolbarChange,
    toolbarHidden: toolbarHiddenProp,
    onToolbarHiddenChange,
    style: styleProp,
    ...rest
  } = props;

  const features = { ...INK_DEFAULT_FEATURES, ...featuresProp };
  const premium = resolveInkPremium(premiumProp);
  const canUseIcons = hasInkPremiumFeature(premium, 'icons');
  const canUseTheme = hasInkPremiumFeature(premium, 'theme');
  const canUseRichPaste = hasInkPremiumFeature(premium, 'richPaste');
  const canUseImageUpload = hasInkPremiumFeature(premium, 'imageUpload');
  const canUseWysiwyg = hasInkPremiumFeature(premium, 'wysiwyg') && wysiwyg;
  const icons = canUseIcons && iconsProp ? { ...INK_DEFAULT_ICONS, ...iconsProp } : INK_DEFAULT_ICONS;
  const themeStyle = canUseTheme ? themeTokensToStyle(theme) : {};
  const richPasteEnabled = canUseRichPaste && pasteMode === 'rich';
  const editorRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef(new InkHistoryStack(value ?? defaultValue));
  const lastEmittedHtmlRef = useRef<string | null>(null);
  const dragBlockRef = useRef<HTMLElement | null>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentBlock, setCurrentBlock] = useState('p');
  const [charCount, setCharCount] = useState(0);
  const [textColorValue, setTextColorValue] = useState(INK_DEFAULT_TEXT_COLOR);
  const [highlightColorValue, setHighlightColorValue] = useState(INK_DEFAULT_HIGHLIGHT_COLOR);
  const [trackChangesEnabled, setTrackChangesEnabled] = useState(trackChangesEnabledProp ?? false);
  const [localTrackChanges, setLocalTrackChanges] = useState<InkTrackChange[]>(trackChangesProp ?? []);
  const [localComments, setLocalComments] = useState<InkCommentThread[]>(commentsProp ?? []);
  const [showCommentsPanel, setShowCommentsPanel] = useState(showCommentsPanelProp ?? false);
  const [showAiPanel, setShowAiPanel] = useState(Boolean(ai?.enabled && ai.openOnInit));
  const [aiPanelBusy, setAiPanelBusy] = useState(false);
  const aiPanelBusyRef = useRef(false);
  const [aiAutocomplete, setAiAutocomplete] = useState({
    visible: false,
    suggestion: '',
    top: NUMBER_ZERO,
    left: NUMBER_ZERO,
  });
  const autocompleteTimerRef = useRef<number | null>(null);
  const autocompleteRequestIdRef = useRef(NUMBER_ZERO);
  const [selectionHtml, setSelectionHtml] = useState('');
  const [activeBlockTop, setActiveBlockTop] = useState(0);
  const [hasActiveBlock, setHasActiveBlock] = useState(false);
  const [slashItems, setSlashItems] = useState<SlashCommandItem[]>([]);
  const [slashPos, setSlashPos] = useState({ top: 0, left: 0 });
  const [signPadOpen, setSignPadOpen] = useState(false);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [findReplaceFocus, setFindReplaceFocus] =
    useState<FindReplaceFocusField>(FIND_REPLACE_FOCUS_FIND);
  const [currentFont, setCurrentFont] = useState(FONT_VALUE_SYSTEM);
  const [currentList, setCurrentList] = useState(LIST_VALUE_BULLET);
  const [findReplaceChoice, setFindReplaceChoice] =
    useState<FindReplaceFocusField>(FIND_REPLACE_FOCUS_FIND);
  const [contextMenu, setContextMenu] = useState({ open: false, x: NUMBER_ZERO, y: NUMBER_ZERO });
  const [tableContextActive, setTableContextActive] = useState(false);
  const [toolbarContextMenu, setToolbarContextMenu] = useState({
    open: false,
    x: NUMBER_ZERO,
    y: NUMBER_ZERO,
  });
  const [inlineToolbar, setInlineToolbar] = useState({
    open: false,
    top: NUMBER_ZERO,
    left: NUMBER_ZERO,
  });
  const [visibleToolbar, setVisibleToolbar] = useState<ToolbarOption[]>(
    () => readToolbarItems(keepInMemory, memoryKey) ?? toolbar,
  );
  const [localToolbarHidden, setLocalToolbarHidden] = useState(() => {
    if (toolbarHiddenProp !== undefined) return toolbarHiddenProp;
    return readToolbarHidden(keepInMemory, memoryKey) ?? false;
  });
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const skipToolbarPropSyncRef = useRef(true);
  const toolbarSignature = toolbar.join(',');

  const trackChanges = trackChangesProp ?? localTrackChanges;
  const comments = commentsProp ?? localComments;
  const commentsOpen = showCommentsPanelProp ?? showCommentsPanel;
  const slashEnabled = slashCommands ?? features.slash;
  const isToolbarHidden = toolbarHiddenProp ?? localToolbarHidden;
  const toolbarCatalog = toolbar;
  const customizableOptions = listCustomizableToolbarOptions(toolbarCatalog);
  const colorModeAttr = colorMode === COLOR_MODE_SYSTEM ? undefined : colorMode;
  const autocompleteEnabled = Boolean(
    features.ai && ai?.enabled && ai.autocomplete !== false && !disabled && !readOnly,
  );

  const clearAutocompleteTimer = () => {
    if (autocompleteTimerRef.current !== null) {
      window.clearTimeout(autocompleteTimerRef.current);
      autocompleteTimerRef.current = null;
    }
  };

  const dismissAiAutocomplete = () => {
    clearAutocompleteTimer();
    autocompleteRequestIdRef.current += 1;
    setAiAutocomplete((prev) =>
      prev.visible || prev.suggestion
        ? { visible: false, suggestion: '', top: NUMBER_ZERO, left: NUMBER_ZERO }
        : prev,
    );
  };

  const scheduleAiAutocomplete = () => {
    if (!autocompleteEnabled || aiPanelBusy || !editorRef.current) {
      dismissAiAutocomplete();
      return;
    }
    const selection = window.getSelection();
    if (!selection || !selection.isCollapsed) {
      dismissAiAutocomplete();
      return;
    }
    clearAutocompleteTimer();
    setAiAutocomplete((prev) =>
      prev.visible || prev.suggestion
        ? { ...prev, visible: false, suggestion: '' }
        : prev,
    );
    const providerId = ai?.providerId || INK_AI_DEMO_PROVIDER_ID;
    autocompleteTimerRef.current = window.setTimeout(() => {
      autocompleteTimerRef.current = null;
      if (!editorRef.current || aiPanelBusyRef.current) return;
      const liveSelection = window.getSelection();
      if (!liveSelection || !liveSelection.isCollapsed) return;
      const prefix = getTextBeforeCaret(editorRef.current);
      const position = getCaretPositionInRoot(editorRef.current);
      if (!prefix.trim() || !position) return;
      const requestId = autocompleteRequestIdRef.current + 1;
      autocompleteRequestIdRef.current = requestId;
      const html = editorRef.current.innerHTML;
      void inkAi
        .runProvider(providerId, {
          capability: 'autocomplete',
          html,
          prompt: prefix,
          modelId: ai?.modelId,
        })
        .then((response) => {
          if (requestId !== autocompleteRequestIdRef.current) return;
          const suggestion = response.text?.trim() || '';
          if (!suggestion) {
            setAiAutocomplete({
              visible: false,
              suggestion: '',
              top: NUMBER_ZERO,
              left: NUMBER_ZERO,
            });
            return;
          }
          const nextPosition =
            (editorRef.current && getCaretPositionInRoot(editorRef.current)) || position;
          setAiAutocomplete({
            visible: true,
            suggestion,
            top: nextPosition.top,
            left: nextPosition.left,
          });
        })
        .catch(() => {
          if (requestId !== autocompleteRequestIdRef.current) return;
          setAiAutocomplete({
            visible: false,
            suggestion: '',
            top: NUMBER_ZERO,
            left: NUMBER_ZERO,
          });
        });
    }, AI_AUTOCOMPLETE_DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      clearAutocompleteTimer();
      autocompleteRequestIdRef.current += 1;
    };
  }, []);

  useEffect(() => {
    aiPanelBusyRef.current = aiPanelBusy;
    if (aiPanelBusy) dismissAiAutocomplete();
  }, [aiPanelBusy]);

  useEffect(() => {
    if (trackChangesEnabledProp !== undefined) setTrackChangesEnabled(trackChangesEnabledProp);
  }, [trackChangesEnabledProp]);

  useEffect(() => {
    if (trackChangesProp) setLocalTrackChanges(trackChangesProp);
  }, [trackChangesProp]);

  useEffect(() => {
    if (commentsProp) setLocalComments(commentsProp);
  }, [commentsProp]);

  useEffect(() => {
    if (showCommentsPanelProp !== undefined) setShowCommentsPanel(showCommentsPanelProp);
  }, [showCommentsPanelProp]);

  useEffect(() => {
    if (toolbarHiddenProp !== undefined) setLocalToolbarHidden(toolbarHiddenProp);
  }, [toolbarHiddenProp]);

  useEffect(() => {
    if (skipToolbarPropSyncRef.current) {
      skipToolbarPropSyncRef.current = false;
      return;
    }
    setVisibleToolbar(toolbar);
  }, [toolbarSignature]);

  useEffect(() => {
    if (!editorRef.current || value === undefined) return;
    if (value === lastEmittedHtmlRef.current) return;
    if (editorRef.current.innerHTML === value) {
      lastEmittedHtmlRef.current = value;
      return;
    }
    const focused = document.activeElement === editorRef.current;
    withPreservedSelection(focused ? editorRef.current : null, () => {
      if (!editorRef.current) return;
      editorRef.current.innerHTML = value;
    });
    lastEmittedHtmlRef.current = value;
  }, [value]);

  useEffect(() => {
    if (!editorRef.current) return;
    const remembered = keepInMemory ? readInkMemory(memoryKey) : '';
    if (remembered) {
      editorRef.current.innerHTML = remembered;
      lastEmittedHtmlRef.current = remembered;
      historyRef.current = new InkHistoryStack(remembered);
      onChange?.(remembered);
      return;
    }
    if (value !== undefined) return;
    if (!defaultValue) return;
    editorRef.current.innerHTML = defaultValue;
    lastEmittedHtmlRef.current = defaultValue;
    historyRef.current = new InkHistoryStack(defaultValue);
    onChange?.(defaultValue);
  }, []);

  const emitChange = (html: string) => {
    historyRef.current.push(html);
    lastEmittedHtmlRef.current = html;
    onChange?.(html);
    if (keepInMemory) writeInkMemory(html, memoryKey);
    if (showCharCount && editorRef.current) {
      setCharCount(editorRef.current.textContent?.length ?? 0);
    }
  };

  const setHtml = (html: string) => {
    if (!editorRef.current) return;
    withPreservedSelection(editorRef.current, () => {
      if (!editorRef.current) return;
      editorRef.current.innerHTML = html;
    });
    emitChange(html);
  };

  const setToolbarHiddenState = (hidden: boolean) => {
    setLocalToolbarHidden(hidden);
    onToolbarHiddenChange?.(hidden);
    writeToolbarHidden(hidden, keepInMemory, memoryKey);
  };

  const commitVisibleToolbar = (items: ToolbarOption[]) => {
    setVisibleToolbar(items);
    onToolbarChange?.(items);
    writeToolbarItems(items, keepInMemory, memoryKey);
  };

  const handleToolbarItemToggle = (option: ToolbarOption, visible: boolean) => {
    if (option === TOOLBAR_OPTION_DIVIDER) return;
    const enabled = new Set<ToolbarOption>(
      visibleToolbar.filter((item) => item !== TOOLBAR_OPTION_DIVIDER),
    );
    if (visible) enabled.add(option);
    else enabled.delete(option);
    commitVisibleToolbar(buildVisibleToolbarItems(toolbarCatalog, enabled));
  };

  const updateTrackChanges = (next: InkTrackChange[]) => {
    setLocalTrackChanges(next);
    onTrackChangesChange?.(next);
  };

  const updateComments = (next: InkCommentThread[]) => {
    setLocalComments(next);
    onCommentsChange?.(next);
  };

  const setCommentsOpen = (open: boolean) => {
    setShowCommentsPanel(open);
    onShowCommentsPanelChange?.(open);
  };

  const setTrackEnabled = (enabled: boolean) => {
    setTrackChangesEnabled(enabled);
    onTrackChangesEnabledChange?.(enabled);
  };

  const updateInlineToolbar = () => {
    if (disabled || readOnly) {
      setInlineToolbar((prev) => (prev.open ? { ...prev, open: false } : prev));
      return;
    }
    const selection = window.getSelection();
    if (
      !selection ||
      selection.isCollapsed ||
      selection.rangeCount === 0 ||
      !selectionIsInsideElement(selection, editorRef.current)
    ) {
      setInlineToolbar((prev) => (prev.open ? { ...prev, open: false } : prev));
      return;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setInlineToolbar((prev) => (prev.open ? { ...prev, open: false } : prev));
      return;
    }
    const position = clampInlineToolbarPosition({
      selectionRect: rect,
      toolbarWidth: INLINE_TOOLBAR_ESTIMATED_WIDTH_PX,
      toolbarHeight: INLINE_TOOLBAR_ESTIMATED_HEIGHT_PX,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      gap: INLINE_TOOLBAR_GAP_PX,
      edgePadding: INLINE_TOOLBAR_EDGE_PADDING_PX,
    });
    setInlineToolbar({ open: true, top: position.top, left: position.left });
  };

  const refreshFormats = () => {
    setActiveFormats(getActiveFormats());
    const block = queryCommandValue('formatBlock');
    if (block) {
      setCurrentBlock(block.toLowerCase().replace(/[<>]/g, ''));
    }
    setCurrentList(detectListType());
    setSelectionHtml(getSelectionHtml());
    updateInlineToolbar();
    if (!editorRef.current || !features.blocks) return;
    const selection = window.getSelection();
    const anchor = selection?.anchorNode ?? null;
    const blockEl = getBlockElement(anchor, editorRef.current);
    markActiveBlock(editorRef.current, blockEl);
    if (blockEl) {
      const rootRect = editorRef.current.getBoundingClientRect();
      const blockRect = blockEl.getBoundingClientRect();
      setActiveBlockTop(blockRect.top - rootRect.top + editorRef.current.scrollTop);
      setHasActiveBlock(true);
    } else {
      setHasActiveBlock(false);
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    let html = editorRef.current.innerHTML;
    if (trackChangesEnabled && features.trackChanges) {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        const selected = getSelectionHtml();
        if (selected) {
          const change = createTrackChange('delete', selected, author);
          updateTrackChanges([...trackChanges, change]);
          wrapSelectionWithDelete(change.id);
          html = editorRef.current.innerHTML;
        }
      }
    }
    emitChange(html);
    refreshFormats();
    if (slashEnabled && editorRef.current) {
      const text = window.getSelection()?.anchorNode?.textContent ?? '';
      const query = extractSlashQuery(text);
      if (query !== null) {
        setSlashItems(filterSlashCommands(query));
        const range = window.getSelection()?.getRangeAt(0);
        if (range && editorRef.current) {
          const rect = range.getBoundingClientRect();
          const rootRect = editorRef.current.getBoundingClientRect();
          setSlashPos({
            top: rect.bottom - rootRect.top + 8,
            left: rect.left - rootRect.left,
          });
        }
      } else {
        setSlashItems([]);
      }
    }
    if (autocompleteEnabled) {
      scheduleAiAutocomplete();
    } else {
      dismissAiAutocomplete();
    }
  };

  const acceptAiAutocomplete = () => {
    const text = aiAutocomplete.suggestion;
    if (!text) {
      dismissAiAutocomplete();
      return;
    }
    focusEditor(editorRef.current);
    execCommand(AI_AUTOCOMPLETE_COMMAND_INSERT_TEXT, text);
    dismissAiAutocomplete();
    handleInput();
  };

  const wrapSelectionWithDelete = (changeId: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const html = getSelectionHtml();
    if (!html) return;
    insertHTML(wrapDeleteHtml(html, changeId));
  };

  const handleBlur = () => {
    if (!editorRef.current || !typoAutoFix || !features.typoAutoFix || disabled || readOnly) return;
    const current = editorRef.current.innerHTML;
    const result = applyTypoAutoFix(current);
    if (result.html === current) return;
    withPreservedSelection(editorRef.current, () => {
      if (!editorRef.current) return;
      editorRef.current.innerHTML = result.html;
    });
    emitChange(result.html);
  };

  const handleFormat = (format: ToolbarOption) => {
    if (disabled || readOnly) return;
    focusEditor(editorRef.current);
    if (format === 'clearFormat') {
      clearFormatDeep();
      handleInput();
      return;
    }
    if (format === 'directionLtr' && editorRef.current) {
      setBlockDirection(editorRef.current, DIR_LTR);
      handleInput();
      return;
    }
    if (format === 'directionRtl' && editorRef.current) {
      setBlockDirection(editorRef.current, DIR_RTL);
      handleInput();
      return;
    }
    if (format === 'superscript' || format === 'subscript') {
      execCommand(format);
      handleInput();
      return;
    }
    const config = INK_BUTTON_CONFIG[format];
    if (!config) return;
    if (config.value) {
      execCommand(config.command, config.value);
    } else {
      execCommand(config.command);
    }
    handleInput();
  };

  const handleHeadingChange = (next: string) => {
    if (disabled || readOnly) return;
    focusEditor(editorRef.current);
    execCommand('formatBlock', next);
    setCurrentBlock(next);
    handleInput();
  };

  const handleFontChange = (next: string) => {
    if (disabled || readOnly) return;
    focusEditor(editorRef.current);
    applyFontFamily(next);
    setCurrentFont(next);
    handleInput();
  };

  const handleListChange = (next: string) => {
    if (disabled || readOnly) return;
    focusEditor(editorRef.current);
    applyListType(next);
    setCurrentList(next);
    handleInput();
  };

  const openFindReplace = (focusField: FindReplaceFocusField) => {
    setFindReplaceFocus(focusField);
    setFindReplaceChoice(focusField);
    setFindReplaceOpen(true);
  };

  const handleFindReplaceChange = (next: string) => {
    if (disabled || readOnly) return;
    const focusField =
      next === FIND_REPLACE_VALUE_REPLACE
        ? FIND_REPLACE_FOCUS_REPLACE
        : FIND_REPLACE_FOCUS_FIND;
    openFindReplace(focusField);
  };

  const handleLink = () => {
    if (disabled || readOnly) return;
    const url = window.prompt('Enter URL:', 'https://');
    if (!url) return;
    focusEditor(editorRef.current);
    insertLink(url);
    handleInput();
  };

  const resolveImageSrc = async (file: File): Promise<string> => {
    if (canUseImageUpload && onImageUpload) {
      return onImageUpload(file);
    }
    return fileToDataUrl(file);
  };

  const handleImage = async () => {
    if (disabled || readOnly) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const src = await resolveImageSrc(file);
      focusEditor(editorRef.current);
      insertImage(src, file.name);
      handleInput();
    };
    input.click();
  };

  const handleTable = () => {
    if (disabled || readOnly || !features.table) return;
    focusEditor(editorRef.current);
    const html = buildTableHtml(tableRows, tableCols);
    if (trackChangesEnabled && features.trackChanges) {
      const change = createTrackChange('insert', html, author);
      updateTrackChanges([...trackChanges, change]);
      insertHTML(wrapInsertHtml(html, change.id));
    } else {
      insertHTML(html);
    }
    handleInput();
  };

  const handleUndo = () => {
    const html = historyRef.current.undo();
    if (html === null || !editorRef.current) {
      execCommand('undo');
      handleInput();
      return;
    }
    setHtml(html);
  };

  const handleRedo = () => {
    const html = historyRef.current.redo();
    if (html === null || !editorRef.current) {
      execCommand('redo');
      handleInput();
      return;
    }
    setHtml(html);
  };

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;
    event.preventDefault();
    setToolbarContextMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
    setTableContextActive(Boolean(features.table && getTableCellFromSelection()));
    setContextMenu({ open: true, x: event.clientX, y: event.clientY });
  };

  const handleToolbarContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;
    event.preventDefault();
    setContextMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
    setToolbarContextMenu({ open: true, x: event.clientX, y: event.clientY });
  };

  const handleAddComment = () => {
    if (disabled || readOnly || !features.comments) return;
    const body = window.prompt('Comment:');
    if (!body?.trim()) return;
    const highlightId = createInkId('hl');
    focusEditor(editorRef.current);
    const wrapped = wrapSelectionAsComment(highlightId);
    if (!wrapped) return;
    const thread = createCommentThread(author, body.trim(), highlightId);
    updateComments([thread, ...comments]);
    setCommentsOpen(true);
    handleInput();
  };

  const toolbarContextMenuItems: ContextMenuItem[] = [
    {
      id: TOOLBAR_CONTEXT_MENU_ID_CUSTOMIZE,
      label: TOOLBAR_CONTEXT_MENU_LABEL_CUSTOMIZE,
      onSelect: () => setCustomizeOpen(true),
    },
    {
      id: TOOLBAR_CONTEXT_MENU_ID_HIDE,
      label: TOOLBAR_CONTEXT_MENU_LABEL_HIDE,
      onSelect: () => setToolbarHiddenState(true),
    },
  ];

  const runTableMutation = (
    mutate: (cell: HTMLTableCellElement) => boolean,
  ): void => {
    const cell = getTableCellFromSelection();
    if (!cell || !features.table) return;
    if (!mutate(cell)) return;
    handleInput();
  };

  const tableContextMenuItems: ContextMenuItem[] =
    features.table && tableContextActive
      ? [
          {
            id: CONTEXT_MENU_ID_TABLE_ROW_ABOVE,
            label: CONTEXT_MENU_LABEL_TABLE_ROW_ABOVE,
            onSelect: () => runTableMutation((cell) => insertTableRow(cell, 'before')),
          },
          {
            id: CONTEXT_MENU_ID_TABLE_ROW_BELOW,
            label: CONTEXT_MENU_LABEL_TABLE_ROW_BELOW,
            onSelect: () => runTableMutation((cell) => insertTableRow(cell, 'after')),
          },
          {
            id: CONTEXT_MENU_ID_TABLE_COL_LEFT,
            label: CONTEXT_MENU_LABEL_TABLE_COL_LEFT,
            onSelect: () => runTableMutation((cell) => insertTableColumn(cell, 'before')),
          },
          {
            id: CONTEXT_MENU_ID_TABLE_COL_RIGHT,
            label: CONTEXT_MENU_LABEL_TABLE_COL_RIGHT,
            onSelect: () => runTableMutation((cell) => insertTableColumn(cell, 'after')),
          },
          {
            id: CONTEXT_MENU_ID_TABLE_DELETE_ROW,
            label: CONTEXT_MENU_LABEL_TABLE_DELETE_ROW,
            onSelect: () => runTableMutation((cell) => deleteTableRow(cell)),
          },
          {
            id: CONTEXT_MENU_ID_TABLE_DELETE_COL,
            label: CONTEXT_MENU_LABEL_TABLE_DELETE_COL,
            onSelect: () => runTableMutation((cell) => deleteTableColumn(cell)),
          },
        ]
      : [];

  const contextMenuItems: ContextMenuItem[] = [
    ...tableContextMenuItems,
    {
      id: CONTEXT_MENU_ID_BOLD,
      label: CONTEXT_MENU_LABEL_BOLD,
      onSelect: () => handleFormat('bold'),
    },
    {
      id: CONTEXT_MENU_ID_ITALIC,
      label: CONTEXT_MENU_LABEL_ITALIC,
      onSelect: () => handleFormat('italic'),
    },
    {
      id: CONTEXT_MENU_ID_UNDERLINE,
      label: CONTEXT_MENU_LABEL_UNDERLINE,
      onSelect: () => handleFormat('underline'),
    },
    {
      id: CONTEXT_MENU_ID_STRIKE,
      label: CONTEXT_MENU_LABEL_STRIKE,
      onSelect: () => handleFormat('strikethrough'),
    },
    {
      id: CONTEXT_MENU_ID_HEADING,
      label: CONTEXT_MENU_LABEL_HEADING,
      onSelect: () => handleFormat('heading2'),
    },
    {
      id: CONTEXT_MENU_ID_BULLET,
      label: CONTEXT_MENU_LABEL_BULLET,
      onSelect: () => handleFormat('bulletList'),
    },
    {
      id: CONTEXT_MENU_ID_ORDERED,
      label: CONTEXT_MENU_LABEL_ORDERED,
      onSelect: () => handleFormat('orderedList'),
    },
    {
      id: CONTEXT_MENU_ID_LINK,
      label: CONTEXT_MENU_LABEL_LINK,
      onSelect: () => handleLink(),
    },
    {
      id: CONTEXT_MENU_ID_CLEAR,
      label: CONTEXT_MENU_LABEL_CLEAR,
      onSelect: () => handleFormat('clearFormat'),
    },
    {
      id: CONTEXT_MENU_ID_FIND,
      label: CONTEXT_MENU_LABEL_FIND,
      disabled: !features.findReplace,
      onSelect: () => setFindReplaceOpen(true),
    },
    {
      id: CONTEXT_MENU_ID_SIGNATURE,
      label: CONTEXT_MENU_LABEL_SIGNATURE,
      disabled: !features.signature,
      onSelect: () => setSignPadOpen(true),
    },
    {
      id: CONTEXT_MENU_ID_COMMENT,
      label: CONTEXT_MENU_LABEL_COMMENT,
      disabled: !features.comments,
      onSelect: () => handleAddComment(),
    },
    ...(isToolbarHidden
      ? [
          {
            id: CONTEXT_MENU_ID_SHOW_TOOLBAR,
            label: CONTEXT_MENU_LABEL_SHOW_TOOLBAR,
            onSelect: () => setToolbarHiddenState(false),
          },
        ]
      : []),
  ];

  const handleAcceptChange = (id: string) => {
    if (!editorRef.current) return;
    const nextHtml = acceptTrackChangeInHtml(editorRef.current.innerHTML, id);
    setHtml(nextHtml);
    updateTrackChanges(
      trackChanges.map((change) => (change.id === id ? { ...change, accepted: true } : change)),
    );
  };

  const handleRejectChange = (id: string) => {
    if (!editorRef.current) return;
    const nextHtml = rejectTrackChangeInHtml(editorRef.current.innerHTML, id);
    setHtml(nextHtml);
    updateTrackChanges(
      trackChanges.map((change) => (change.id === id ? { ...change, rejected: true } : change)),
    );
  };

  const insertPastedImage = async (file: File) => {
    const src = await resolveImageSrc(file);
    const html = `<img src="${src}" alt="" style="max-width:100%;height:auto;" />`;
    if (trackChangesEnabled && features.trackChanges) {
      const change = createTrackChange('insert', html, author);
      updateTrackChanges([...trackChanges, change]);
      insertHTML(wrapInsertHtml(html, change.id));
    } else {
      insertImage(src);
    }
    handleInput();
  };

  const handlePaste = async (event: ClipboardEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;
    const clipboard = event.clipboardData;
    if (!clipboard) return;

    if (richPasteEnabled) {
      const html = extractClipboardHtml(clipboard);
      if (html) {
        event.preventDefault();
        const clean = sanitizePastedHtml(html);
        if (clean) {
          insertHTML(clean);
          handleInput();
        }
        const items = clipboard.items;
        if (allowImagePaste && items) {
          for (const item of Array.from(items)) {
            if (!item.type.startsWith('image/')) continue;
            const file = item.getAsFile();
            if (file) await insertPastedImage(file);
          }
        }
        return;
      }
      const text = extractClipboardText(clipboard);
      if (text) {
        event.preventDefault();
        insertHTML(text.replace(/\n/g, '<br />'));
        handleInput();
        return;
      }
    }

    if (!allowImagePaste) return;
    const items = clipboard.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (!item.type.startsWith('image/')) continue;
      event.preventDefault();
      const file = item.getAsFile();
      if (!file) continue;
      await insertPastedImage(file);
    }
  };

  const handleInlineFormat = (action: InlineToolbarFormatAction) => {
    handleFormat(action);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_TAB && aiAutocomplete.visible && aiAutocomplete.suggestion) {
      event.preventDefault();
      acceptAiAutocomplete();
      return;
    }
    if (event.key === KEY_ENTER) {
      dismissAiAutocomplete();
      return;
    }
    if (tryConvertMarkdownListPrefix(event.nativeEvent)) {
      handleInput();
      return;
    }
    if (event.key === KEY_ESCAPE) {
      if (aiAutocomplete.visible) {
        event.preventDefault();
        dismissAiAutocomplete();
        return;
      }
      setSlashItems([]);
      setInlineToolbar((prev) => (prev.open ? { ...prev, open: false } : prev));
    }
    if ((event.metaKey || event.ctrlKey) && event.key === KEY_Z) {
      event.preventDefault();
      if (event.shiftKey) handleRedo();
      else handleUndo();
    }
  };

  const applySlash = (item: SlashCommandItem) => {
    focusEditor(editorRef.current);
    const selection = window.getSelection();
    if (selection?.anchorNode?.textContent) {
      const text = selection.anchorNode.textContent;
      const cleaned = text.replace(/(?:^|\s)\/[^\s]*$/, ' ');
      if (selection.anchorNode.nodeType === Node.TEXT_NODE) {
        selection.anchorNode.textContent = cleaned;
      }
    }
    setSlashItems([]);
    switch (item.insert) {
      case 'heading1':
        execCommand('formatBlock', 'h1');
        break;
      case 'heading2':
        execCommand('formatBlock', 'h2');
        break;
      case 'bulletList':
        execCommand('insertUnorderedList');
        break;
      case 'orderedList':
        execCommand('insertOrderedList');
        break;
      case 'table':
        handleTable();
        return;
      case 'ai':
        setShowAiPanel(true);
        break;
      default:
        break;
    }
    handleInput();
  };

  const moveActiveBlock = (direction: 'up' | 'down') => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    const block = getBlockElement(selection?.anchorNode ?? null, editorRef.current);
    if (!block) return;
    if (moveBlock(block, direction)) {
      handleInput();
      refreshFormats();
    }
  };

  const handleBlockDragStart = (event: DragEvent<HTMLButtonElement>) => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    const selectedBlock = getBlockElement(selection?.anchorNode ?? null, editorRef.current);
    const activeBlock = editorRef.current.querySelector(`.${INK_CLASS_BLOCK_ACTIVE}`);
    const block =
      selectedBlock ?? (activeBlock instanceof HTMLElement ? activeBlock : null);
    if (!block) {
      event.preventDefault();
      return;
    }
    dragBlockRef.current = block;
    clearBlockDragClasses(editorRef.current);
    markActiveBlock(editorRef.current, block);
    markDraggingBlock(block);
    event.dataTransfer.setData(BLOCK_HANDLES_DRAG_MIME, BLOCK_HANDLES_DRAG_PAYLOAD);
    event.dataTransfer.effectAllowed = BLOCK_HANDLES_DRAG_EFFECT_MOVE;
  };

  const handleContentDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!editorRef.current || !dragBlockRef.current) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = BLOCK_HANDLES_DRAG_EFFECT_MOVE;
    const target = getBlockElement(event.target as Node, editorRef.current);
    if (!target || target === dragBlockRef.current) {
      markDropTarget(editorRef.current, null, null);
      return;
    }
    const position = resolveDropPosition(event.clientY, target);
    markDropTarget(editorRef.current, target, position);
  };

  const handleContentDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!editorRef.current || !dragBlockRef.current) return;
    event.preventDefault();
    const target = getBlockElement(event.target as Node, editorRef.current);
    const dragging = dragBlockRef.current;
    if (target && target !== dragging) {
      const position = resolveDropPosition(event.clientY, target);
      const moved =
        position === BLOCK_DROP_POSITION_BEFORE
          ? reorderBlockBefore(dragging, target)
          : reorderBlockAfter(dragging, target);
      if (moved) {
        handleInput();
        refreshFormats();
      }
    }
    clearBlockDragClasses(editorRef.current);
    dragBlockRef.current = null;
  };

  const handleContentDragEnd = () => {
    if (editorRef.current) {
      clearBlockDragClasses(editorRef.current);
    }
    dragBlockRef.current = null;
  };

  const renderToolbarItem = (item: ToolbarOption, index: number): ReactNode => {
    if (item === 'divider') {
      return <span key={`divider-${index}`} className={INK_CLASS_DIVIDER} />;
    }
    if (item === 'headingDropdown') {
      return (
        <ToolbarDropdown
          key="heading"
          title="Heading"
          options={INK_HEADING_OPTIONS}
          value={currentBlock || 'p'}
          disabled={disabled || readOnly}
          onChange={handleHeadingChange}
        />
      );
    }
    if (item === TOOLBAR_OPTION_FONT_DROPDOWN) {
      return (
        <ToolbarDropdown
          key={TOOLBAR_OPTION_FONT_DROPDOWN}
          title={FONT_DROPDOWN_TITLE}
          options={INK_FONT_OPTIONS}
          value={currentFont}
          disabled={disabled || readOnly}
          onChange={handleFontChange}
        />
      );
    }
    if (item === TOOLBAR_OPTION_LIST_DROPDOWN) {
      return (
        <ToolbarDropdown
          key={TOOLBAR_OPTION_LIST_DROPDOWN}
          title={LIST_DROPDOWN_TITLE}
          options={INK_LIST_OPTIONS}
          value={currentList}
          disabled={disabled || readOnly}
          onChange={handleListChange}
        />
      );
    }
    if (item === 'textColor') {
      return (
        <ToolbarColorPicker
          key="textColor"
          title="Text color"
          type="text"
          value={textColorValue}
          disabled={disabled || readOnly}
          onChange={(color) => {
            focusEditor(editorRef.current);
            setTextColor(color);
            setTextColorValue(color);
            handleInput();
          }}
        />
      );
    }
    if (item === 'highlightColor') {
      return (
        <ToolbarColorPicker
          key="highlightColor"
          title="Highlight color"
          type="highlight"
          value={highlightColorValue}
          disabled={disabled || readOnly}
          onChange={(color) => {
            focusEditor(editorRef.current);
            setHighlightColor(color);
            setHighlightColorValue(color);
            handleInput();
          }}
        />
      );
    }
    if (item === 'link') {
      return (
        <ToolbarButton
          key="link"
          icon={icons.link}
          title="Insert link"
          disabled={disabled || readOnly}
          onClick={handleLink}
        />
      );
    }
    if (item === 'image') {
      return (
        <ToolbarButton
          key="image"
          icon={icons.image}
          title="Insert image"
          disabled={disabled || readOnly}
          onClick={() => {
            void handleImage();
          }}
        />
      );
    }
    if (item === 'table') {
      if (!features.table) return null;
      return (
        <ToolbarButton
          key="table"
          icon={icons.table}
          title="Insert table"
          disabled={disabled || readOnly}
          onClick={handleTable}
        />
      );
    }
    if (item === TOOLBAR_OPTION_SIGNATURE) {
      if (!features.signature) return null;
      return (
        <ToolbarButton
          key={TOOLBAR_OPTION_SIGNATURE}
          icon={icons.signature}
          title="Sign pad"
          active={signPadOpen}
          disabled={disabled || readOnly}
          onClick={() => setSignPadOpen(true)}
        />
      );
    }
    if (item === TOOLBAR_OPTION_FIND_REPLACE) {
      if (!features.findReplace) return null;
      return (
        <ToolbarButton
          key={TOOLBAR_OPTION_FIND_REPLACE}
          icon={icons.findReplace}
          title="Find and replace"
          active={findReplaceOpen}
          disabled={disabled || readOnly}
          onClick={() => {
            if (findReplaceOpen) setFindReplaceOpen(false);
            else openFindReplace(FIND_REPLACE_FOCUS_FIND);
          }}
        />
      );
    }
    if (item === TOOLBAR_OPTION_FIND_REPLACE_DROPDOWN) {
      if (!features.findReplace) return null;
      return (
        <ToolbarDropdown
          key={TOOLBAR_OPTION_FIND_REPLACE_DROPDOWN}
          title={FIND_REPLACE_DROPDOWN_TITLE}
          options={INK_FIND_REPLACE_OPTIONS}
          value={findReplaceChoice}
          disabled={disabled || readOnly}
          onChange={handleFindReplaceChange}
        />
      );
    }
    if (item === TOOLBAR_OPTION_HORIZONTAL_RULE) {
      if (!features.horizontalRule) return null;
      return (
        <ToolbarButton
          key={TOOLBAR_OPTION_HORIZONTAL_RULE}
          icon={icons.horizontalRule}
          title="Horizontal rule"
          disabled={disabled || readOnly}
          onClick={() => {
            focusEditor(editorRef.current);
            insertHTML('<hr />');
            handleInput();
          }}
        />
      );
    }
    if (item === 'undo') {
      return (
        <ToolbarButton
          key="undo"
          icon={icons.undo}
          title="Undo"
          disabled={disabled || readOnly}
          onClick={handleUndo}
        />
      );
    }
    if (item === 'redo') {
      return (
        <ToolbarButton
          key="redo"
          icon={icons.redo}
          title="Redo"
          disabled={disabled || readOnly}
          onClick={handleRedo}
        />
      );
    }
    if (item === 'trackChanges') {
      if (!features.trackChanges) return null;
      return (
        <ToolbarButton
          key="trackChanges"
          icon={icons.trackChanges}
          title="Track changes"
          active={trackChangesEnabled}
          disabled={disabled || readOnly}
          onClick={() => setTrackEnabled(!trackChangesEnabled)}
        />
      );
    }
    if (item === 'comments') {
      if (!features.comments) return null;
      return (
        <ToolbarButton
          key="comments"
          icon={icons.comments}
          title="Comments"
          active={commentsOpen}
          disabled={disabled || readOnly}
          onClick={() => {
            if (!commentsOpen) handleAddComment();
            else setCommentsOpen(false);
          }}
        />
      );
    }
    if (item === 'ai') {
      if (!features.ai || !ai?.enabled) return null;
      return (
        <ToolbarButton
          key="ai"
          icon={icons.ai}
          title="Ink AI"
          active={showAiPanel}
          disabled={disabled || readOnly}
          onClick={() => setShowAiPanel((prev) => !prev)}
        />
      );
    }
    const config = INK_BUTTON_CONFIG[item];
    if (!config) return null;
    return (
      <ToolbarButton
        key={item}
        icon={icons[item as keyof typeof icons] ?? item.slice(0, 1).toUpperCase()}
        title={config.title}
        active={activeFormats.has(item)}
        disabled={disabled || readOnly}
        onClick={() => handleFormat(item)}
      />
    );
  };

  const minHeightValue = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
  const maxHeightValue = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  const aiOpen = Boolean(ai?.enabled && showAiPanel);

  return (
    <div
      className={cn(INK_CLASS_ROOT, className)}
      data-testid={testId}
      data-disabled={disabled || undefined}
      data-variant={variant}
      data-chrome={chrome}
      data-color-mode={colorModeAttr}
      data-premium={premium.active || undefined}
      data-wysiwyg={canUseWysiwyg || undefined}
      style={{ ...themeStyle, ...styleProp }}
      {...rest}
    >
      {isToolbarHidden ? (
        <div className={INK_CLASS_TOOLBAR_SHOW}>
          <Button
            type="button"
            aria-label={TOOLBAR_SHOW_CONTROL_ARIA_LABEL}
            onClick={() => setToolbarHiddenState(false)}
          >
            {TOOLBAR_SHOW_CONTROL_LABEL}
          </Button>
        </div>
      ) : (
        <div
          className={INK_CLASS_TOOLBAR}
          role="toolbar"
          aria-label="Ink formatting toolbar"
          onContextMenu={handleToolbarContextMenu}
        >
          {visibleToolbar.map(renderToolbarItem)}
        </div>
      )}
      <ToolbarCustomize
        open={customizeOpen}
        options={customizableOptions}
        visibleItems={visibleToolbar}
        onToggle={handleToolbarItemToggle}
        onClose={() => setCustomizeOpen(false)}
      />
      <SignPad
        open={signPadOpen}
        onClose={() => setSignPadOpen(false)}
        onConfirm={(dataUrl) => {
          focusEditor(editorRef.current);
          insertImage(dataUrl);
          handleInput();
        }}
      />
      <FindReplace
        open={findReplaceOpen}
        focusField={findReplaceFocus}
        onClose={() => setFindReplaceOpen(false)}
        onReplace={(find, replace, replaceAll) => {
          if (!editorRef.current) return;
          const next = replaceInHtml(editorRef.current.innerHTML, find, replace, replaceAll);
          setHtml(next);
        }}
      />
      {trackChangesEnabled && features.trackChanges ? (
        <TrackChangesBar
          changes={trackChanges}
          onAccept={handleAcceptChange}
          onReject={handleRejectChange}
          onAcceptAll={() => trackChanges.forEach((change) => handleAcceptChange(change.id))}
          onRejectAll={() => trackChanges.forEach((change) => handleRejectChange(change.id))}
        />
      ) : null}
      <div className={INK_CLASS_SHELL}>
        <div className={INK_CLASS_BODY}>
          {features.blocks ? (
            <BlockHandles
              visible={hasActiveBlock && !disabled && !readOnly}
              top={activeBlockTop}
              onMoveUp={() => moveActiveBlock('up')}
              onMoveDown={() => moveActiveBlock('down')}
              onDragStart={handleBlockDragStart}
            />
          ) : null}
          <div
            ref={editorRef}
            className={INK_CLASS_CONTENT}
            contentEditable={!disabled && !readOnly}
            role="textbox"
            aria-multiline="true"
            aria-placeholder={placeholder}
            data-placeholder={placeholder}
            suppressContentEditableWarning
            style={{ minHeight: minHeightValue, maxHeight: maxHeightValue }}
            onInput={handleInput}
            onBlur={handleBlur}
            onKeyUp={refreshFormats}
            onKeyDown={handleKeyDown}
            onMouseUp={refreshFormats}
            onContextMenu={handleContextMenu}
            onDragOver={handleContentDragOver}
            onDrop={handleContentDrop}
            onDragEnd={handleContentDragEnd}
            onPaste={(event) => {
              void handlePaste(event);
            }}
          />
          {slashEnabled ? (
            <SlashMenu
              items={slashItems}
              top={slashPos.top}
              left={slashPos.left}
              onSelect={applySlash}
            />
          ) : null}
          {autocompleteEnabled ? (
            <AiAutocomplete
              suggestion={aiAutocomplete.suggestion}
              position={{ top: aiAutocomplete.top, left: aiAutocomplete.left }}
              visible={aiAutocomplete.visible}
              onAccept={acceptAiAutocomplete}
              onDismiss={dismissAiAutocomplete}
            />
          ) : null}
          <InlineToolbar
            open={inlineToolbar.open}
            top={inlineToolbar.top}
            left={inlineToolbar.left}
            icons={{
              bold: icons.bold,
              italic: icons.italic,
              underline: icons.underline,
              code: icons.code,
              link: icons.link,
              clearFormat: icons.clearFormat,
            }}
            activeFormats={activeFormats}
            disabled={disabled || readOnly}
            onFormat={handleInlineFormat}
            onLink={handleLink}
            onClose={() => setInlineToolbar((prev) => ({ ...prev, open: false }))}
          />
          <ContextMenu
            open={contextMenu.open}
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenuItems}
            colorMode={colorModeAttr}
            onClose={() => {
              setTableContextActive(false);
              setContextMenu((prev) => ({ ...prev, open: false }));
            }}
          />
          <ContextMenu
            open={toolbarContextMenu.open}
            x={toolbarContextMenu.x}
            y={toolbarContextMenu.y}
            items={toolbarContextMenuItems}
            colorMode={colorModeAttr}
            onClose={() => setToolbarContextMenu((prev) => ({ ...prev, open: false }))}
          />
        </div>
        {commentsOpen && features.comments ? (
          <CommentsPanel
            comments={comments}
            author={author}
            onClose={() => setCommentsOpen(false)}
            onResolve={(threadId) => {
              const thread = comments.find((item) => item.id === threadId);
              updateComments(
                comments.map((item) =>
                  item.id === threadId ? { ...item, resolved: true } : item,
                ),
              );
              if (thread && editorRef.current) {
                setHtml(removeCommentMark(editorRef.current.innerHTML, thread.highlightId));
              }
            }}
            onAddReply={(threadId, body) => {
              updateComments(
                comments.map((item) =>
                  item.id === threadId
                    ? {
                        ...item,
                        replies: [
                          ...item.replies,
                          {
                            id: createInkId('reply'),
                            author,
                            body,
                            timestamp: Date.now(),
                          },
                        ],
                      }
                    : item,
                ),
              );
            }}
          />
        ) : null}
        {aiOpen && ai ? (
          <AiPanel
            config={ai}
            documentHtml={editorRef.current?.innerHTML ?? value ?? ''}
            selectionHtml={selectionHtml}
            onBusyChange={setAiPanelBusy}
            onClose={() => setShowAiPanel(false)}
            onApplyHtml={(html) => {
              focusEditor(editorRef.current);
              if (selectionHtml) {
                insertHTML(html);
              } else {
                setHtml(html);
                return;
              }
              handleInput();
            }}
          />
        ) : null}
      </div>
      {showCharCount ? (
        <div className={INK_CLASS_FOOTER}>
          {charCount}
          {charCountMax ? ` / ${charCountMax}` : ''}
        </div>
      ) : null}
    </div>
  );
};
