import { useState } from "react";

interface LoveCardData {
  emoji: string;
  label: string;
  message: string;
}

interface LoveCardProps {
  data: LoveCardData;
  onSelect: (label: string) => void;
  isSelected: boolean;
}

function LoveCard({ data, onSelect, isSelected }: LoveCardProps) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    onSelect(data.label);
    setTimeout(() => setClicked(false), 300);
  }

  return (
    <button
      onClick={handleClick}
      className={[
        "flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-2xl cursor-pointer select-none w-full",
        "bg-white/70 backdrop-blur-sm shadow-md border border-pink-100",
        "active:scale-95 hover:scale-105 hover:shadow-xl transition-all duration-300",
        isSelected ? "ring-2 ring-pink-400 bg-pink-50/80" : "",
        clicked ? "scale-95" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={clicked ? { transform: "scale(0.95)" } : undefined}
      aria-pressed={isSelected}
    >
      <span className="text-4xl sm:text-5xl" aria-hidden="true">
        {data.emoji}
      </span>
      <span className="font-['Playfair_Display'] text-sm sm:text-lg text-pink-700 font-semibold leading-tight">
        {data.label}
      </span>
    </button>
  );
}

export default LoveCard;
export type { LoveCardData };
