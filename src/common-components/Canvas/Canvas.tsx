import type { FC } from 'react';
import { cn } from '@utils';
import { CANVAS_CLASS } from './Canvas.const';
import type { CanvasProps } from './Canvas.types';

export const Canvas: FC<CanvasProps> = (props) => {
  const { canvasRef, className, ...rest } = props;
  return <canvas ref={canvasRef} className={cn(CANVAS_CLASS, className)} {...rest} />;
};
