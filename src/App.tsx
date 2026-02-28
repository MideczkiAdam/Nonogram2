import { useState } from "react";
import Editor from "./components/Editor";
import Game from "./components/Game";

type Screen = "menu" | "editor" | "game";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");

  if (screen === "editor") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setScreen("menu")}>Vissza a főoldalra</button>
        <h1>Picross pályaszerkesztő</h1>
        <Editor />
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setScreen("menu")}>Vissza a főoldalra</button>
        <h1>Picross játék</h1>
        <Game />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-start"
      }}
    >
      <h1>Picross</h1>
      <p>Válaszd ki, mit szeretnél csinálni:</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setScreen("editor")}>Pálya készítés</button>
        <button onClick={() => setScreen("game")}>Játék indítása</button>
      </div>
    </div>
  );
}
