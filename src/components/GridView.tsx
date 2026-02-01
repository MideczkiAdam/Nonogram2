import type { Grid } from "../types";

interface Props {
  grid: Grid;
  onToggleCell: (row: number, col: number) => void;
}

export default function GridView({ grid, onToggleCell }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid.length}, 30px)` }}>
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            onClick={() => onToggleCell(r, c)}
            style={{
              width: 30,
              height: 30,
              boxSizing: "border-box",
              border: "1px solid black",
              backgroundColor: cell ? "black" : "white",
              cursor: "pointer"
            }}
          />
        ))
      )}
    </div>
  );
}
