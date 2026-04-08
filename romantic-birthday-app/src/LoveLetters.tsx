import EnvelopeCard from "./EnvelopeCard";
import type { Letter } from "./EnvelopeCard";

interface LoveLettersProps {
  onNext: () => void;
}

const letters: Letter[] = [
  {
    title: "To My Love",
    content:
      "Every day with you is a gift I never want to return. You are my home, my peace, my everything.",
  },
  {
    title: "When You Feel Sad",
    content:
      "On your darkest days, remember I am here. You are never alone. My arms are always open for you.",
  },
  {
    title: "My Promise",
    content:
      "I promise to love you through every season, to hold your hand through every storm, and to choose you every single day.",
  },
  {
    title: "Birthday Letter",
    content:
      "Happy Birthday, my love. Today the world became a better place the moment you were born. I am so grateful you exist.",
  },
];

function LoveLetters({ onNext }: LoveLettersProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50">
      <div className="w-full max-w-lg text-center space-y-6">
        <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl text-pink-700 leading-tight">
          Letters For You 💌
        </h1>

        <p className="font-['Poppins'] text-sm text-purple-500">
          Each envelope holds a piece of my heart ✨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {letters.map((letter) => (
            <EnvelopeCard key={letter.title} letter={letter} />
          ))}
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg active:scale-95 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default LoveLetters;
