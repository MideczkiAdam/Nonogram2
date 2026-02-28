import type { LevelData } from "../types";

interface Props {
  onLoad: (level: LevelData) => void;
}

export default function FileLoader({ onLoad }: Props) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(
          event.target?.result as string
        ) as LevelData;

        if (!json.size || !json.grid) {
          alert("Hibás JSON fájl!");
          return;
        }

        onLoad(json);
      } catch {
        alert("Nem érvényes JSON!");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <p>Válaszd ki a JSON pályafájlt:</p>
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  );
}

