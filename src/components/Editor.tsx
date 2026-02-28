import { useState } from "react";
import type { Grid, LevelData } from "../types";
import GridView from "./GridView";
import Controls from "./Controls";
import { calculateRowHints, calculateColumnHints } from "../utils/hints";

function createEmptyGrid(size: number): Grid {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
}

export default function Editor() {
  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(5));

  const rowHints = calculateRowHints(grid);
  const columnHints = calculateColumnHints(grid);

  function toggleCell(row: number, col: number) {
    setGrid(prev =>
      prev.map((r, ri) =>
        r.map((c, ci) =>
          ri === row && ci === col ? (c === 1 ? 0 : 1) : c
        )
      )
    );
  }

  function resize(newSize: number) {
    setSize(newSize);
    setGrid(createEmptyGrid(newSize));
  }

  function randomize() {
    setGrid(
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => (Math.random() > 0.5 ? 1 : 0))
      )
    );
  }

  function save() {
    const data: LevelData = {
      size,
      grid,
      rowHints,
      columnHints
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "picross-level.json";
    a.click();
  }

  const cellSize = 30;
  const maxHintLen = Math.ceil(grid.length / 2);
  const hintWidth = maxHintLen * cellSize;
  const hintHeight = maxHintLen * cellSize;

  return (
    <>
      <Controls onResize={resize} onRandom={randomize} onSave={save} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${hintWidth}px ${grid.length * cellSize}px`,
          gridTemplateRows: `${grid.length * cellSize}px ${hintHeight}px`
        }}
      >
        <div style={{ width: hintWidth, height: grid.length * cellSize, display: "flex", flexDirection: "column" }}>
          {rowHints.map((h, i) => (
            <div
              key={i}
              style={{
                height: cellSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 4
              }}
            >
              {Array.from({ length: maxHintLen }).map((_, idx) => {
                const valueIndex = idx - (maxHintLen - h.length);
                const val = valueIndex >= 0 ? h[valueIndex] : null;
                return (
                  <div key={idx} style={{ width: cellSize, textAlign: "center" }}>
                    {val ?? ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div>
          <GridView grid={grid} onToggleCell={toggleCell} />
        </div>

        <div style={{ width: hintWidth, height: hintHeight }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${maxHintLen}, ${cellSize}px)`
          }}
        >
          {Array.from({ length: maxHintLen }).map((_, r) =>
            columnHints.map((col, c) => {
              const val = r < col.length ? col[r] : null;
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {val ?? ""}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
