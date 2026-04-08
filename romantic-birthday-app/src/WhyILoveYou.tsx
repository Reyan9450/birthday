import { useState } from "react";
import LoveCard from "./LoveCard";
import type { LoveCardData } from "./LoveCard";

interface WhyILoveYouProps {
  onNext: () => void;
}

const cards: LoveCardData[] = [
  { emoji: "❤️", label: "Your Smile", message: "Your smile lights up every room and makes everything feel warm and safe." },
  { emoji: "💕", label: "Your Kindness", message: "The way you care for others shows the beautiful soul you truly are." },
  { emoji: "✨", label: "Your Care", message: "You always know what I need, even before I say a word." },
  { emoji: "💫", label: "Your Personality", message: "There's no one quite like you — you make every moment magical." },
];

function WhyILoveYou({ onNext }: WhyILoveYouProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const selectedData = cards.find((c) => c.label === selectedCard) ?? null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50">
      <div className="w-full max-w-lg text-center space-y-6">
        <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl text-pink-700 leading-tight">
          Why I Love You
        </h1>

        <p className="font-['Poppins'] text-sm text-purple-500">
          Tap a card to discover a reason ✨
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {cards.map((card) => (
            <LoveCard
              key={card.label}
              data={card}
              onSelect={setSelectedCard}
              isSelected={selectedCard === card.label}
            />
          ))}
        </div>

        {selectedData && (
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-200 shadow-lg px-4 py-4">
            <p className="font-['Poppins'] text-sm sm:text-base text-purple-700 leading-relaxed">
              {selectedData.message}
            </p>
          </div>
        )}

        {selectedCard !== null && (
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg active:scale-95 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default WhyILoveYou;
