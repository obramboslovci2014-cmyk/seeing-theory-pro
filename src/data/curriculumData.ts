import { ChapterConfig, UnitConfig } from '../types';
import { chapter0 } from './chapters/chapter0';
import { chapter1 } from './chapters/chapter1';
import { chapter2 } from './chapters/chapter2';
import { chapter3 } from './chapters/chapter3';
import { chapter4 } from './chapters/chapter4';
import { chapter5 } from './chapters/chapter5';
import { chapter6 } from './chapters/chapter6';

export const ALL_CHAPTERS: ChapterConfig[] = [
  chapter0,
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
];

export const ALL_UNITS: UnitConfig[] = ALL_CHAPTERS.flatMap(ch => ch.units);

export const UNIT_MAP: Record<string, UnitConfig> = ALL_UNITS.reduce(
  (acc, unit) => {
    acc[unit.id] = unit;
    return acc;
  },
  {} as Record<string, UnitConfig>
);

export function getUnitById(id: string): UnitConfig | undefined {
  return UNIT_MAP[id];
}

export function getNextUnit(currentId: string): UnitConfig | null {
  const index = ALL_UNITS.findIndex(u => u.id === currentId);
  if (index >= 0 && index < ALL_UNITS.length - 1) {
    return ALL_UNITS[index + 1];
  }
  return null;
}

export function getPrevUnit(currentId: string): UnitConfig | null {
  const index = ALL_UNITS.findIndex(u => u.id === currentId);
  if (index > 0) {
    return ALL_UNITS[index - 1];
  }
  return null;
}
