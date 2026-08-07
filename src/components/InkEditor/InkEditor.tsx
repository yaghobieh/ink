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
  CONTEXT_MENU_ID_BOLD,
  CONTEXT_MENU_ID_BULLET,
  CONTEXT_MENU_ID_CLEAR,
  CONTEXT_MENU_ID_COMMENT,
  CONTEXT_MENU_ID_FIND,
  CONTEXT_MENU_ID_HEADING,
  CONTEXT_MENU_ID_ITALIC,
  CONTEXT_MENU_ID_LINK,
  CONTEXT_MENU_ID_ORDERED,
  CONTEXT_MENU_ID_SIGNATURE,
  CONTEXT_MENU_ID_STRIKE,
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
  CONTEXT_MENU_LABEL_SIGNATURE,
  CONTEXT_MENU_LABEL_STRIKE,
  CONTEXT_MENU_LABEL_UNDERLINE,
  INK_BUTTON_CONFIG,
  INK_CLASS_BLOCK_ACTIVE,
  INK_CLASS_BODY,
  INK_CLASS_CONTENT,
  INK_CLASS_DIVIDER,
  INK_CLASS_FOOTER,
  INK_CLASS_ROOT,
  INK_CLASS_SHELL,
  INK_CLASS_TOOLBAR,
  INK_DEFAULT_AUTHOR,
  INK_DEFAULT_CHROME,
  INK_DEFAULT_FEATURES,
  INK_DEFAULT_HIGHLIGHT_COLOR,
  INK_DEFAULT_ICONS,
  INK_DEFAULT_TEXT_COLOR,
  INK_DEFAULT_TOOLBAR,
  INK_DEFAULT_VARIANT,
  INK_HEADING_OPTIONS,
  INK_MIN_HEIGHT,
  INK_PLACEHOLDER_DEFAULT,
  INK_TABLE_DEFAULT_COLS,
  INK_TABLE_DEFAULT_ROWS,
  TOOLBAR_OPTION_FIND_REPLACE,
  TOOLBAR_OPTION_HORIZONTAL_RULE,
  TOOLBAR_OPTION_SIGNATURE,
} from '../../constants';
import {
  acceptTrackChangeInHtml,
  applyTypoAutoFix,
  buildTableHtml,
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
  markActiveBlock,
  moveBlock,
  reorderBlockBefore,
  rejectTrackChangeInHtml,
  removeCommentMark,
  readInkMemory,
  replaceInHtml,
  resolveInkPremium,
  sanitizePastedHtml,
  themeTokensToStyle,
  writeInkMemory,
  wrapDeleteHtml,
  wrapInsertHtml,
  wrapSelectionAsComment,
} from '../../utils';
import { ContextMenu, type ContextMenuItem } from '@common-components';
import {
  execCommand,
  fileToDataUrl,
  getActiveFormats,
  insertHTML,
  insertImage,
  insertLink,
  queryCommandValue,
  setHighlightColor,
  setTextColor,
} from './helpers';
import {
  AiPanel,
  BlockHandles,
  BLOCK_HANDLES_DRAG_EFFECT_MOVE,
  BLOCK_HANDLES_DRAG_MIME,
  BLOCK_HANDLES_DRAG_PAYLOAD,
  CommentsPanel,
  FindReplace,
  InlineToolbar,
  SignPad,
  SlashMenu,
  ToolbarButton,
  ToolbarColorPicker,
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
  if (!selection || selection.rangeCount === 0) return '';
  const range = selection.getRangeAt(0);
  const container = document.createElement('div');
  container.appendChild(range.cloneContents());
  return container.innerHTML;
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
  const [selectionHtml, setSelectionHtml] = useState('');
  const [activeBlockTop, setActiveBlockTop] = useState(0);
  const [hasActiveBlock, setHasActiveBlock] = useState(false);
  const [slashItems, setSlashItems] = useState<SlashCommandItem[]>([]);
  const [slashPos, setSlashPos] = useState({ top: 0, left: 0 });
  const [signPadOpen, setSignPadOpen] = useState(false);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ open: false, x: 0, y: 0 });
  const [inlineToolbar, setInlineToolbar] = useState({ open: false, top: 0, left: 0 });

  const trackChanges = trackChangesProp ?? localTrackChanges;
  const comments = commentsProp ?? localComments;
  const commentsOpen = showCommentsPanelProp ?? showCommentsPanel;
  const slashEnabled = slashCommands ?? features.slash;

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
    if (!editorRef.current || value === undefined) return;
    if (value === lastEmittedHtmlRef.current) return;
    if (editorRef.current.innerHTML === value) {
      lastEmittedHtmlRef.current = value;
      return;
    }
    const focused = document.activeElement === editorRef.current;
    if (focused) return;
    editorRef.current.innerHTML = value;
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
    editorRef.current.innerHTML = html;
    emitChange(html);
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
    editorRef.current.innerHTML = result.html;
    emitChange(result.html);
  };

  const handleFormat = (format: ToolbarOption) => {
    if (disabled || readOnly) return;
    editorRef.current?.focus();
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
    editorRef.current?.focus();
    execCommand('formatBlock', next);
    setCurrentBlock(next);
    handleInput();
  };

  const handleLink = () => {
    if (disabled || readOnly) return;
    const url = window.prompt('Enter URL:', 'https://');
    if (!url) return;
    editorRef.current?.focus();
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
      editorRef.current?.focus();
      insertImage(src, file.name);
      handleInput();
    };
    input.click();
  };

  const handleTable = () => {
    if (disabled || readOnly || !features.table) return;
    editorRef.current?.focus();
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
    setContextMenu({ open: true, x: event.clientX, y: event.clientY });
  };

  const handleAddComment = () => {
    if (disabled || readOnly || !features.comments) return;
    const body = window.prompt('Comment:');
    if (!body?.trim()) return;
    const highlightId = createInkId('hl');
    editorRef.current?.focus();
    const wrapped = wrapSelectionAsComment(highlightId);
    if (!wrapped) return;
    const thread = createCommentThread(author, body.trim(), highlightId);
    updateComments([thread, ...comments]);
    setCommentsOpen(true);
    handleInput();
  };

  const contextMenuItems: ContextMenuItem[] = [
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
    if (event.key === 'Escape') {
      setSlashItems([]);
      setInlineToolbar((prev) => (prev.open ? { ...prev, open: false } : prev));
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
      event.preventDefault();
      if (event.shiftKey) handleRedo();
      else handleUndo();
    }
  };

  const applySlash = (item: SlashCommandItem) => {
    editorRef.current?.focus();
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
    if (!block) return;
    dragBlockRef.current = block;
    markActiveBlock(editorRef.current, block);
    event.dataTransfer.setData(BLOCK_HANDLES_DRAG_MIME, BLOCK_HANDLES_DRAG_PAYLOAD);
    event.dataTransfer.effectAllowed = BLOCK_HANDLES_DRAG_EFFECT_MOVE;
  };

  const handleContentDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!dragBlockRef.current) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = BLOCK_HANDLES_DRAG_EFFECT_MOVE;
  };

  const handleContentDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!editorRef.current || !dragBlockRef.current) return;
    event.preventDefault();
    const target = getBlockElement(event.target as Node, editorRef.current);
    if (target && reorderBlockBefore(dragBlockRef.current, target)) {
      handleInput();
      refreshFormats();
    }
    dragBlockRef.current = null;
  };

  const handleContentDragEnd = () => {
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
    if (item === 'textColor') {
      return (
        <ToolbarColorPicker
          key="textColor"
          title="Text color"
          type="text"
          value={textColorValue}
          disabled={disabled || readOnly}
          onChange={(color) => {
            editorRef.current?.focus();
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
            editorRef.current?.focus();
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
          onClick={() => setFindReplaceOpen((prev) => !prev)}
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
            editorRef.current?.focus();
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
      data-premium={premium.active || undefined}
      data-wysiwyg={canUseWysiwyg || undefined}
      style={{ ...themeStyle, ...styleProp }}
      {...rest}
    >
      <div className={INK_CLASS_TOOLBAR} role="toolbar" aria-label="Ink formatting toolbar">
        {toolbar.map(renderToolbarItem)}
      </div>
      <SignPad
        open={signPadOpen}
        onClose={() => setSignPadOpen(false)}
        onConfirm={(dataUrl) => {
          editorRef.current?.focus();
          insertImage(dataUrl);
          handleInput();
        }}
      />
      <FindReplace
        open={findReplaceOpen}
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
            onClose={() => setContextMenu((prev) => ({ ...prev, open: false }))}
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
            onClose={() => setShowAiPanel(false)}
            onApplyHtml={(html) => {
              editorRef.current?.focus();
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
