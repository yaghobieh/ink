import {
  SIGN_PAD_EMPTY_ALPHA_THRESHOLD,
  SIGN_PAD_SAMPLE_STEP,
} from './SignPad.const';

export const canvasHasInk = (canvas: HTMLCanvasElement): boolean => {
  const context = canvas.getContext('2d');
  if (!context) return false;
  const { width, height } = canvas;
  const { data } = context.getImageData(0, 0, width, height);
  const alphaIndexOffset = 3;
  for (let index = alphaIndexOffset; index < data.length; index += SIGN_PAD_SAMPLE_STEP * 4) {
    if (data[index] > SIGN_PAD_EMPTY_ALPHA_THRESHOLD) return true;
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
