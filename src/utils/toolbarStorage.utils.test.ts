import { describe, expect, it } from 'vitest';
import type { ToolbarOption } from '../types';
import {
  buildVisibleToolbarItems,
  listCustomizableToolbarOptions,
  normalizeToolbarItems,
  parseToolbarItems,
} from './toolbarStorage.utils';

describe('normalizeToolbarItems', () => {
  it('removes leading trailing and duplicate dividers', () => {
    const input: ToolbarOption[] = [
      'divider',
      'bold',
      'divider',
      'divider',
      'italic',
      'divider',
    ];
    expect(normalizeToolbarItems(input)).toEqual(['bold', 'divider', 'italic']);
  });
});

describe('buildVisibleToolbarItems', () => {
  it('keeps catalog order for enabled options', () => {
    const catalog: ToolbarOption[] = [
      'bold',
      'divider',
      'italic',
      'underline',
    ];
    const enabled = new Set<ToolbarOption>(['underline', 'bold']);
    expect(buildVisibleToolbarItems(catalog, enabled)).toEqual([
      'bold',
      'divider',
      'underline',
    ]);
  });
});

describe('listCustomizableToolbarOptions', () => {
  it('skips dividers and duplicates', () => {
    const catalog: ToolbarOption[] = ['bold', 'divider', 'bold', 'italic'];
    expect(listCustomizableToolbarOptions(catalog)).toEqual(['bold', 'italic']);
  });
});

describe('parseToolbarItems', () => {
  it('parses a valid JSON array', () => {
    expect(parseToolbarItems('["bold","italic"]')).toEqual(['bold', 'italic']);
  });

  it('returns null for invalid JSON', () => {
    expect(parseToolbarItems('{')).toBeNull();
  });
});
