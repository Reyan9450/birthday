import { useEffect, useRef } from "react";
import config from "./config";

interface FavoriteMemoryProps {
  onNext: () => void;
}

// Local floating hearts data — rendered within the section, not fixed/full-screen
const LOCAL_HEARTS = [
  { id: 1, left: "8%",  top: "15%", size: "1.4rem", delay: "0s",    duration: "4s"  },
  { id: 2, left: "88%", top: "20%", size: "1rem",   delay: "0.8s",  duration: "5s"  },
  { id: 3, left: "20%", top: "75%", size: "1.6rem", delay: "1.2s",  duration: "3.5s"},
  { id: 4, left: "75%", top: "70%", size: "1.1rem", delay: "0.4s",  duration: "4.5s"},
  { id: 5, left: "50%", top: "10%", size: "0.9rem", delay: "1.8s",  duration: "5.5s"},
  { id: 6, left: "35%", top: "85%", size: "1.3rem", delay: "2.2s",  duration: "4s"  },
];

function FavoriteMemory({ onNext }: FavoriteMemoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove("page-fade-init");
    el.classList.add("page-fade-in");
  }, []);

  return (
    <div
      ref={containerRef}
      className="page-fade-init relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 overflow-hidden"
    >
      {/* Local floating hearts overlay */}
      {LOCAL_HEARTS.map((h) => (
        <span
          key={h.id}
          aria-hidden="true"
          className="absolute select-none pointer-events-none"
          style={{
            left: h.left,
            top: h.top,
            fontSize: h.size,
            animation: `floatHeart ${h.duration} ${h.delay} ease-in-out infinite`,
            opacity: 0.55,
          }}
        >
          ❤️
        </span>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-pink-700 leading-tight">
          My Favorite Memory With You
        </h1>

        <p className="font-['Poppins'] text-base sm:text-lg text-purple-700 leading-relaxed">
          {config.favoriteMemoryText}
        </p>

        <button
          onClick={onNext}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 hover:shadow-pink-300/50 hover:shadow-xl transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default FavoriteMemory;
