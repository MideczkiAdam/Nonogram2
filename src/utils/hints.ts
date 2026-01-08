import type { Grid } from "../types";

export function calculateLineHints(line: number[]): number[] {
  const result: number[] = [];
  let count = 0;

  for (const cell of line) {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      result.push(count);
      count = 0;
    }
  }

  if (count > 0) {
    result.push(count);
  }

  return result;
}

export function calculateRowHints(grid: Grid): number[][] {
  return grid.map(row => calculateLineHints(row));
}

export function calculateColumnHints(grid: Grid): number[][] {
  const size = grid.length;
  const result: number[][] = [];

  for (let col = 0; col < size; col++) {
    const column = grid.map(row => row[col]);
    result.push(calculateLineHints(column));
  }

  return result;
}
