import { describe, expect, it } from 'vitest';
import { getCanvasPoint } from './SignPad.utils';

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
});
