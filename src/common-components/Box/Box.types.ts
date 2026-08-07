import type { HTMLAttributes, ReactNode } from 'react';

export type BoxProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'span' | 'p' | 'section';
  children?: ReactNode;
};
