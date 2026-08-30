import { useLayoutEffect, useRef, useState } from 'react';
import { INK_TOOLBAR_GAP_PX, INK_TOOLBAR_MORE_WIDTH_PX, NUMBER_ONE, NUMBER_ZERO } from '../constants';

export const useToolbarOverflow = (itemCount: number) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [fitCount, setFitCount] = useState(itemCount);
  const [overflowOpen, setOverflowOpen] = useState(false);

  useLayoutEffect(() => {
    const measureNode = measureRef.current;
    const rowNode = rowRef.current;
    if (!measureNode || !rowNode) return undefined;
    const measure = () => {
      const budget = rowNode.clientWidth - INK_TOOLBAR_MORE_WIDTH_PX - INK_TOOLBAR_GAP_PX;
      const kids = Array.from(measureNode.children).filter(
        (node): node is HTMLElement => node instanceof HTMLElement,
      );
      let used = NUMBER_ZERO;
      let count = NUMBER_ZERO;
      kids.forEach((kid) => {
        const next = used + kid.offsetWidth + (count > NUMBER_ZERO ? INK_TOOLBAR_GAP_PX : NUMBER_ZERO);
        if (next > budget) return;
        used = next;
        count += NUMBER_ONE;
      });
      setFitCount(Math.max(count, NUMBER_ONE));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rowNode);
    return () => observer.disconnect();
  }, [itemCount]);

  return { measureRef, rowRef, fitCount, overflowOpen, setOverflowOpen };
};
