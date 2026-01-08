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

  return (
    <>
      <Controls onResize={resize} onRandom={randomize} onSave={save} />

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          {rowHints.map((h, i) => (
            <div key={i} style={{ height: 30 }}>
              {h.join(" ")}
            </div>
          ))}
        </div>

        <GridView grid={grid} onToggleCell={toggleCell} />
      </div>

      <div style={{ marginTop: 10 }}>
        {columnHints.map((h, i) => (
          <span key={i} style={{ width: 30, display: "inline-block", textAlign: "center" }}>
            {h.join(" ")}
          </span>
        ))}
      </div>
    </>
  );
}
