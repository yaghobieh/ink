import { useEffect, useRef, useState, type FC, type ClipboardEvent, type ReactNode } from 'react';
import type { InkEditorProps, ToolbarOption } from '../../types';
import {
  INK_BUTTON_CONFIG,
  INK_CLASS_CONTENT,
  INK_CLASS_DIVIDER,
  INK_CLASS_FOOTER,
  INK_CLASS_ROOT,
  INK_CLASS_TOOLBAR,
  INK_DEFAULT_HIGHLIGHT_COLOR,
  INK_DEFAULT_TEXT_COLOR,
  INK_DEFAULT_TOOLBAR,
  INK_HEADING_OPTIONS,
  INK_MIN_HEIGHT,
  INK_PLACEHOLDER_DEFAULT,
} from '../../constants';
import { applyTypoAutoFix, cn } from '../../utils';
import {
  execCommand,
  fileToDataUrl,
  getActiveFormats,
  insertImage,
  insertLink,
  queryCommandValue,
  setHighlightColor,
  setTextColor,
} from './helpers';
import { ToolbarButton, ToolbarColorPicker, ToolbarDropdown } from './components';

const LABEL_ICONS: Record<string, string> = {
  bold: 'B',
  italic: 'I',
  underline: 'U',
  strikethrough: 'S',
  bulletList: '•',
  orderedList: '1.',
  link: '🔗',
  image: '🖼',
  clearFormat: '⌫',
  alignLeft: '⫷',
  alignCenter: '☰',
  alignRight: '⫸',
  alignJustify: '≡',
  indent: '→',
  outdent: '←',
  blockquote: '“',
  code: '</>',
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
    ...rest
  } = props;

  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentBlock, setCurrentBlock] = useState('p');
  const [charCount, setCharCount] = useState(0);
  const [textColorValue, setTextColorValue] = useState(INK_DEFAULT_TEXT_COLOR);
  const [highlightColorValue, setHighlightColorValue] = useState(INK_DEFAULT_HIGHLIGHT_COLOR);

  useEffect(() => {
    if (!editorRef.current || value === undefined) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  useEffect(() => {
    if (!editorRef.current || value || !defaultValue) return;
    editorRef.current.innerHTML = defaultValue;
  }, []);

  const emitChange = (html: string) => {
    onChange?.(html);
    if (showCharCount && editorRef.current) {
      setCharCount(editorRef.current.textContent?.length ?? 0);
    }
  };

  const refreshFormats = () => {
    setActiveFormats(getActiveFormats());
    const block = queryCommandValue('formatBlock');
    if (block) {
      setCurrentBlock(block.toLowerCase().replace(/[<>]/g, ''));
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    emitChange(editorRef.current.innerHTML);
    refreshFormats();
  };

  const handleBlur = () => {
    if (!editorRef.current || !typoAutoFix || disabled || readOnly) return;
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

  const handleImage = async () => {
    if (disabled || readOnly) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const dataUrl = await fileToDataUrl(file);
      editorRef.current?.focus();
      insertImage(dataUrl, file.name);
      handleInput();
    };
    input.click();
  };

  const handlePaste = async (event: ClipboardEvent<HTMLDivElement>) => {
    if (!allowImagePaste || disabled || readOnly) return;
    const items = event.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (!item.type.startsWith('image/')) continue;
      event.preventDefault();
      const file = item.getAsFile();
      if (!file) continue;
      const dataUrl = await fileToDataUrl(file);
      insertImage(dataUrl);
      handleInput();
    }
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
          icon={LABEL_ICONS.link}
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
          icon={LABEL_ICONS.image}
          title="Insert image"
          disabled={disabled || readOnly}
          onClick={() => {
            void handleImage();
          }}
        />
      );
    }
    const config = INK_BUTTON_CONFIG[item];
    if (!config) return null;
    return (
      <ToolbarButton
        key={item}
        icon={LABEL_ICONS[item] ?? item.slice(0, 1).toUpperCase()}
        title={config.title}
        active={activeFormats.has(item)}
        disabled={disabled || readOnly}
        onClick={() => handleFormat(item)}
      />
    );
  };

  const minHeightValue = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
  const maxHeightValue = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  return (
    <div
      className={cn(INK_CLASS_ROOT, className)}
      data-testid={testId}
      data-disabled={disabled || undefined}
      {...rest}
    >
      <div className={INK_CLASS_TOOLBAR} role="toolbar" aria-label="Ink formatting toolbar">
        {toolbar.map(renderToolbarItem)}
      </div>
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
        onMouseUp={refreshFormats}
        onPaste={(event) => {
          void handlePaste(event);
        }}
      />
      {showCharCount ? (
        <div className={INK_CLASS_FOOTER}>
          {charCount}
          {charCountMax ? ` / ${charCountMax}` : ''}
        </div>
      ) : null}
    </div>
  );
};
