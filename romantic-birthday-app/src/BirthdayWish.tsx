import { useEffect } from "react";
import confetti from "canvas-confetti";

interface BirthdayWishProps {
  onNext: () => void;
}

// Local floating hearts and balloons — absolutely positioned within the section
const FLOATERS = [
  { id: 1, emoji: "❤️",  left: "5%",  top: "10%", size: "1.6rem", delay: "0s",    duration: "4s"   },
  { id: 2, emoji: "🎈",  left: "90%", top: "15%", size: "1.8rem", delay: "0.6s",  duration: "5s"   },
  { id: 3, emoji: "❤️",  left: "15%", top: "80%", size: "1.2rem", delay: "1.1s",  duration: "3.5s" },
  { id: 4, emoji: "🎈",  left: "80%", top: "75%", size: "1.5rem", delay: "0.3s",  duration: "4.5s" },
  { id: 5, emoji: "❤️",  left: "50%", top: "5%",  size: "1rem",   delay: "1.8s",  duration: "5.5s" },
  { id: 6, emoji: "🎈",  left: "30%", top: "88%", size: "1.4rem", delay: "2s",    duration: "4s"   },
  { id: 7, emoji: "❤️",  left: "70%", top: "8%",  size: "1.3rem", delay: "0.9s",  duration: "4.8s" },
  { id: 8, emoji: "🎈",  left: "60%", top: "82%", size: "1.1rem", delay: "1.5s",  duration: "3.8s" },
];

function BirthdayWish({ onNext }: BirthdayWishProps) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-200 via-purple-100 to-rose-100 overflow-hidden">
      {/* Local floating hearts and balloons */}
      {FLOATERS.map((f) => (
        <span
          key={f.id}
          aria-hidden="true"
          className="absolute select-none pointer-events-none"
          style={{
            left: f.left,
            top: f.top,
            fontSize: f.size,
            animation: `floatHeart ${f.duration} ${f.delay} ease-in-out infinite`,
            opacity: 0.6,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg text-center space-y-6 px-2">
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl md:text-6xl text-pink-700 leading-tight drop-shadow-sm">
          Happy 18th Birthday Maira ❤️
        </h1>

        <p className="font-['Poppins'] text-sm sm:text-lg text-purple-700 leading-relaxed">
          18 years ago, the world became a much more beautiful place. Today we celebrate
          you — your laugh, your heart, your everything. From the moment we met on March 17th,
          you've made every single day feel like a gift. Here's to you, Maira. Happy Birthday, my love. 🎂✨
        </p>

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

export default BirthdayWish;
