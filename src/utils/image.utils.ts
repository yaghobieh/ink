export const IMAGE_FIGURE_CLASS = 'Ink-figure';
export const IMAGE_WIDTH_MIN = 80;
export const IMAGE_WIDTH_MAX = 720;
export const IMAGE_WIDTH_DEFAULT = 240;
export const IMAGE_ALIGN_LEFT = 'left';
export const IMAGE_ALIGN_CENTER = 'center';
export const IMAGE_ALIGN_RIGHT = 'right';

export type ImageAlign = typeof IMAGE_ALIGN_LEFT | typeof IMAGE_ALIGN_CENTER | typeof IMAGE_ALIGN_RIGHT;

export const ensureImageFigure = (image: HTMLImageElement): HTMLElement => {
  const parent = image.parentElement;
  if (parent instanceof HTMLElement && parent.tagName === 'FIGURE') return parent;
  const figure = document.createElement('figure');
  figure.className = IMAGE_FIGURE_CLASS;
  image.replaceWith(figure);
  figure.appendChild(image);
  const caption = document.createElement('figcaption');
  figure.appendChild(caption);
  return figure;
};

export const setImageWidth = (image: HTMLImageElement, width: number): void => {
  image.style.width = `${width}px`;
  image.style.height = 'auto';
};

export const setImageAlign = (image: HTMLImageElement, align: ImageAlign): void => {
  const figure = ensureImageFigure(image);
  figure.style.display = 'table';
  if (align === IMAGE_ALIGN_CENTER) {
    figure.style.marginLeft = 'auto';
    figure.style.marginRight = 'auto';
  } else if (align === IMAGE_ALIGN_RIGHT) {
    figure.style.marginLeft = 'auto';
    figure.style.marginRight = '0';
  } else {
    figure.style.marginLeft = '0';
    figure.style.marginRight = 'auto';
  }
};

export const setImageAlt = (image: HTMLImageElement, alt: string): void => {
  image.alt = alt;
};

export const setImageCaption = (image: HTMLImageElement, caption: string): void => {
  const figure = ensureImageFigure(image);
  let node = figure.querySelector('figcaption');
  if (!node) {
    node = document.createElement('figcaption');
    figure.appendChild(node);
  }
  node.textContent = caption;
};
