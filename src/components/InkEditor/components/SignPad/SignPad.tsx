import { useEffect, useRef, useState, type FC, type PointerEvent } from 'react';
import { NUMBER_ZERO } from '@/constants/numbers';
import {
  SIGN_PAD_ACTIONS_CLASS,
  SIGN_PAD_CANVAS_CLASS,
  SIGN_PAD_CANVAS_HEIGHT,
  SIGN_PAD_CANVAS_WIDTH,
  SIGN_PAD_CLASS,
  SIGN_PAD_DEFAULT_CANCEL,
  SIGN_PAD_DEFAULT_CLEAR,
  SIGN_PAD_DEFAULT_CONFIRM,
  SIGN_PAD_DEFAULT_TITLE,
  SIGN_PAD_FILL_STYLE,
  SIGN_PAD_LINE_WIDTH,
  SIGN_PAD_MIME,
  SIGN_PAD_STROKE_STYLE,
  SIGN_PAD_TITLE_CLASS,
} from './SignPad.const';
import type { SignPadProps } from './SignPad.types';
import { getCanvasPoint } from './SignPad.utils';

export const SignPad: FC<SignPadProps> = (props) => {
  const {
    open,
    onClose,
    onConfirm,
    clearLabel = SIGN_PAD_DEFAULT_CLEAR,
    confirmLabel = SIGN_PAD_DEFAULT_CONFIRM,
    cancelLabel = SIGN_PAD_DEFAULT_CANCEL,
    title = SIGN_PAD_DEFAULT_TITLE,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [hasStroke, setHasStroke] = useState(false);

  useEffect(() => {
    if (!open) {
      drawingRef.current = false;
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.fillStyle = SIGN_PAD_FILL_STYLE;
    context.fillRect(NUMBER_ZERO, NUMBER_ZERO, canvas.width, canvas.height);
    context.strokeStyle = SIGN_PAD_STROKE_STYLE;
    context.lineWidth = SIGN_PAD_LINE_WIDTH;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    drawingRef.current = false;
    setHasStroke(false);
  }, [open]);

  if (!open) return null;

  const beginDraw = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const point = getCanvasPoint(canvas, event.clientX, event.clientY);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const moveDraw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const point = getCanvasPoint(canvas, event.clientX, event.clientY);
    context.lineTo(point.x, point.y);
    context.stroke();
    setHasStroke(true);
  };

  const endDraw = (event: PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = false;
    canvasRef.current?.releasePointerCapture(event.pointerId);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.fillStyle = SIGN_PAD_FILL_STYLE;
    context.fillRect(NUMBER_ZERO, NUMBER_ZERO, canvas.width, canvas.height);
    setHasStroke(false);
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasStroke) return;
    onConfirm(canvas.toDataURL(SIGN_PAD_MIME));
    onClose();
  };

  return (
    <div className={SIGN_PAD_CLASS} role="dialog" aria-modal="true" aria-label={title}>
      <p className={SIGN_PAD_TITLE_CLASS}>{title}</p>
      <canvas
        ref={canvasRef}
        className={SIGN_PAD_CANVAS_CLASS}
        width={SIGN_PAD_CANVAS_WIDTH}
        height={SIGN_PAD_CANVAS_HEIGHT}
        onPointerDown={beginDraw}
        onPointerMove={moveDraw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
      />
      <div className={SIGN_PAD_ACTIONS_CLASS}>
        <button type="button" className="Ink-Editor__button" onClick={handleClear}>
          {clearLabel}
        </button>
        <button type="button" className="Ink-Editor__button" onClick={onClose}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className="Ink-Editor__button Ink-Editor__button--active"
          disabled={!hasStroke}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
};
