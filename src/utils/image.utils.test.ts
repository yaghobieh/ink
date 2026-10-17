import { describe, expect, it } from 'vitest';
import { ensureImageFigure, setImageAlign, setImageAlt, setImageCaption, setImageWidth } from './image.utils';

describe('image.utils', () => {
  it('wraps an image, sets width, alt, caption, and alignment', () => {
    document.body.innerHTML = '<img src="a.png" alt="">';
    const image = document.querySelector('img') as HTMLImageElement;
    setImageWidth(image, 240);
    setImageAlt(image, 'Diagram');
    setImageCaption(image, 'Figure 1');
    setImageAlign(image, 'center');
    const figure = ensureImageFigure(image);
    expect(image.style.width).toBe('240px');
    expect(image.alt).toBe('Diagram');
    expect(figure.querySelector('figcaption')?.textContent).toBe('Figure 1');
    expect(figure.style.marginLeft).toBe('auto');
  });
});
