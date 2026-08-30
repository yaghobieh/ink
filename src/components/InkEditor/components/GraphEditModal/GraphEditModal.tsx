import { useEffect, useState, type FC } from 'react';
import { Button, Modal } from '@forgedevstack/bear';
import {
  INK_GRAPH_ADD_POINT,
  INK_GRAPH_APPLY,
  INK_GRAPH_CANCEL,
  INK_GRAPH_COLORS_TITLE,
  INK_GRAPH_VALUES_TITLE,
  NUMBER_ONE,
  NUMBER_ZERO,
} from '../../../../constants';
import { EMPTY_STRING } from '../../../../constants/generals.const';
import { GRAPH_COLORS } from '../../../../plugins/graph/graph.const';
import type { GraphColors, GraphPoint } from '../../../../plugins/graph';
import type { GraphEditModalProps } from './GraphEditModal.types';

const nextPoint = (): GraphPoint => ({ label: '•', value: NUMBER_ONE });

export const GraphEditModal: FC<GraphEditModalProps> = (props) => {
  const { open, mode, points, colors, onClose, onApply } = props;
  const [draftPoints, setDraftPoints] = useState<GraphPoint[]>(points);
  const [draftColors, setDraftColors] = useState<GraphColors>(
    colors.length > NUMBER_ZERO ? colors : [...GRAPH_COLORS],
  );

  useEffect(() => {
    if (!open) return;
    setDraftPoints(points);
    setDraftColors(colors.length > NUMBER_ZERO ? colors : [...GRAPH_COLORS]);
  }, [open, points, colors]);

  const title = mode === 'colors' ? INK_GRAPH_COLORS_TITLE : INK_GRAPH_VALUES_TITLE;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {INK_GRAPH_CANCEL}
          </Button>
          <Button variant="primary" onClick={() => onApply(draftPoints, draftColors)}>
            {INK_GRAPH_APPLY}
          </Button>
        </>
      }
    >
      {mode === 'values' ? (
        <div className="Ink-GraphModal">
          {draftPoints.map((point, index) => (
            <div key={`${point.label}-${index}`} className="Ink-GraphModal__row">
              <input
                value={point.label}
                aria-label={`Label ${index + NUMBER_ONE}`}
                onChange={(event) => {
                  const label = event.target.value;
                  setDraftPoints((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, label } : item,
                    ),
                  );
                }}
              />
              <input
                type="number"
                value={point.value}
                aria-label={`Value ${index + NUMBER_ONE}`}
                onChange={(event) => {
                  const value = Number(event.target.value) || NUMBER_ZERO;
                  setDraftPoints((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, value } : item,
                    ),
                  );
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDraftPoints((current) => [...current, nextPoint()])}
          >
            {INK_GRAPH_ADD_POINT}
          </Button>
        </div>
      ) : (
        <div className="Ink-GraphModal">
          {draftColors.map((color, index) => (
            <label key={`${color}-${index}`} className="Ink-GraphModal__row">
              <span>{index + NUMBER_ONE}</span>
              <input
                type="color"
                value={color}
                onChange={(event) => {
                  const next = event.target.value || EMPTY_STRING;
                  setDraftColors((current) =>
                    current.map((item, itemIndex) => (itemIndex === index ? next : item)),
                  );
                }}
              />
            </label>
          ))}
        </div>
      )}
    </Modal>
  );
};
