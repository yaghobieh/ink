import { describe, expect, it } from 'vitest';
import {
  SIGN_PAD_CANVAS_HEIGHT,
  SIGN_PAD_CANVAS_WIDTH,
  SIGN_PAD_FILL_CHANNEL,
  SIGN_PAD_INK_CHANNEL_MAX,
  SIGN_PAD_RGBA_STRIDE,
} from './SignPad.const';
import { canvasHasInk, getCanvasPoint } from './SignPad.utils';

const buildPixelData = (ink: boolean): Uint8ClampedArray => {
  const pixelCount = SIGN_PAD_CANVAS_WIDTH * SIGN_PAD_CANVAS_HEIGHT;
  const data = new Uint8ClampedArray(pixelCount * SIGN_PAD_RGBA_STRIDE);
  for (let index = 0; index < data.length; index += SIGN_PAD_RGBA_STRIDE) {
    data[index] = ink ? SIGN_PAD_INK_CHANNEL_MAX - 1 : SIGN_PAD_FILL_CHANNEL;
    data[index + 1] = ink ? SIGN_PAD_INK_CHANNEL_MAX - 1 : SIGN_PAD_FILL_CHANNEL;
    data[index + 2] = ink ? SIGN_PAD_INK_CHANNEL_MAX - 1 : SIGN_PAD_FILL_CHANNEL;
    data[index + 3] = SIGN_PAD_FILL_CHANNEL;
  }
  return data;
};

const mockCanvas = (ink: boolean): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = SIGN_PAD_CANVAS_WIDTH;
  canvas.height = SIGN_PAD_CANVAS_HEIGHT;
  const data = buildPixelData(ink);
  canvas.getContext = (() =>
    ({
      getImageData: () => ({ data, width: canvas.width, height: canvas.height }),
    })) as unknown as HTMLCanvasElement['getContext'];
  return canvas;
};

describe('SignPad utils', () => {
  it('maps client coordinates to canvas space', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 100;
    canvas.getBoundingClientRect = () =>
      ({
        left: 10,
        top: 20,
        width: 100,
        height: 50,
        right: 110,
        bottom: 70,
        x: 10,
        y: 20,
        toJSON: () => ({}),
      }) as DOMRect;
    const point = getCanvasPoint(canvas, 60, 45);
    expect(point.x).toBe(100);
    expect(point.y).toBe(50);
  });

  it('treats white fill as empty', () => {
    expect(canvasHasInk(mockCanvas(false))).toBe(false);
  });

  it('detects dark stroke ink', () => {
    expect(canvasHasInk(mockCanvas(true))).toBe(true);
  });
});
