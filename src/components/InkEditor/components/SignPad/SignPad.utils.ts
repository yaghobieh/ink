import {
  SIGN_PAD_ALPHA_OFFSET,
  SIGN_PAD_BLUE_OFFSET,
  SIGN_PAD_EMPTY_ALPHA_THRESHOLD,
  SIGN_PAD_GREEN_OFFSET,
  SIGN_PAD_INK_CHANNEL_MAX,
  SIGN_PAD_RED_OFFSET,
  SIGN_PAD_RGBA_STRIDE,
  SIGN_PAD_SAMPLE_STEP,
} from './SignPad.const';

const isInkSample = (data: Uint8ClampedArray, index: number): boolean => {
  const alpha = data[index + SIGN_PAD_ALPHA_OFFSET];
  if (alpha <= SIGN_PAD_EMPTY_ALPHA_THRESHOLD) return false;
  const red = data[index + SIGN_PAD_RED_OFFSET];
  const green = data[index + SIGN_PAD_GREEN_OFFSET];
  const blue = data[index + SIGN_PAD_BLUE_OFFSET];
  return (
    red < SIGN_PAD_INK_CHANNEL_MAX ||
    green < SIGN_PAD_INK_CHANNEL_MAX ||
    blue < SIGN_PAD_INK_CHANNEL_MAX
  );
};

export const canvasHasInk = (canvas: HTMLCanvasElement): boolean => {
  const context = canvas.getContext('2d');
  if (!context) return false;
  const { width, height } = canvas;
  const { data } = context.getImageData(0, 0, width, height);
  const step = SIGN_PAD_SAMPLE_STEP * SIGN_PAD_RGBA_STRIDE;
  for (let index = 0; index < data.length; index += step) {
    if (isInkSample(data, index)) return true;
  }
  return false;
};

export const getCanvasPoint = (
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
};
