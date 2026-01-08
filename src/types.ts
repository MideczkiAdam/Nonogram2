export type Cell = 0 | 1;

export type Grid = Cell[][];

export interface LevelData {
  size: number;
  grid: Grid;
  rowHints: number[][];
  columnHints: number[][];
}
