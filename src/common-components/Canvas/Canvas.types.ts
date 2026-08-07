import type { CanvasHTMLAttributes, Ref } from 'react';

export type CanvasProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  canvasRef?: Ref<HTMLCanvasElement>;
};
