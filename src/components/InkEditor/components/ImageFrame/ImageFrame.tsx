import type { FC } from 'react';
import {
  IMAGE_ALIGN_CENTER,
  IMAGE_ALIGN_LEFT,
  IMAGE_ALIGN_RIGHT,
  IMAGE_WIDTH_DEFAULT,
  IMAGE_WIDTH_MAX,
  IMAGE_WIDTH_MIN,
  setImageAlign,
  setImageAlt,
  setImageCaption,
  setImageWidth,
  type ImageAlign,
} from '../../../../utils/image.utils';

export interface ImageFrameProps {
  image: HTMLImageElement;
  onChange: () => void;
  onClose: () => void;
}

export const ImageFrame: FC<ImageFrameProps> = (props) => {
  const { image, onChange, onClose } = props;
  const applyAlign = (align: ImageAlign) => {
    setImageAlign(image, align);
    onChange();
  };
  return (
    <div className="Ink-ImageFrame" role="toolbar" aria-label="Image">
      <label>
        Width
        <input
          type="range"
          min={IMAGE_WIDTH_MIN}
          max={IMAGE_WIDTH_MAX}
          defaultValue={image.clientWidth || IMAGE_WIDTH_DEFAULT}
          onChange={(event) => {
            setImageWidth(image, Number(event.target.value));
            onChange();
          }}
        />
      </label>
      <button type="button" className="Ink-Editor__button" onClick={() => applyAlign(IMAGE_ALIGN_LEFT)}>
        Left
      </button>
      <button type="button" className="Ink-Editor__button" onClick={() => applyAlign(IMAGE_ALIGN_CENTER)}>
        Center
      </button>
      <button type="button" className="Ink-Editor__button" onClick={() => applyAlign(IMAGE_ALIGN_RIGHT)}>
        Right
      </button>
      <input
        aria-label="Alt text"
        defaultValue={image.alt}
        placeholder="Alt text"
        onBlur={(event) => {
          setImageAlt(image, event.target.value);
          onChange();
        }}
      />
      <input
        aria-label="Caption"
        defaultValue={image.parentElement?.querySelector('figcaption')?.textContent ?? ''}
        placeholder="Caption"
        onBlur={(event) => {
          setImageCaption(image, event.target.value);
          onChange();
        }}
      />
      <button type="button" className="Ink-Editor__button" onClick={onClose}>
        Done
      </button>
    </div>
  );
};
