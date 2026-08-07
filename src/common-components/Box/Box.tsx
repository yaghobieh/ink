import type { FC } from 'react';
import { cn } from '@utils';
import { BOX_CLASS, BOX_DEFAULT_AS } from './Box.const';
import type { BoxProps } from './Box.types';

export const Box: FC<BoxProps> = (props) => {
  const { as: Tag = BOX_DEFAULT_AS, className, children, ...rest } = props;
  return (
    <Tag className={cn(BOX_CLASS, className)} {...rest}>
      {children}
    </Tag>
  );
};
