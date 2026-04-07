import { useEffect, useRef, useState, useCallback } from "react";

interface Heart {
  id: string;
  x: number;        // 0–90 (percent from left)
  speed: number;    // fall duration in seconds
  delay: number;    // fall delay in seconds
  size: number;     // em size
  variant: number;  // 0–3 for color/emoji variety
}

interface Sparkle {
  id: string;
  x: number;
  y: number;
}

interface ScoreFloat {
  id: string;
  x: number;
  y: number;
}

interface Props {
  onNext: () => void;
}

const HEART_VARIANTS = ["❤️", "🩷", "💕", "💗"];
const SPARKLE_EMOJIS = ["✨", "⭐", "💫", "🌟"];
const GOAL = 5;

// Fixed star positions so they don't re-randomize on re-render
const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 97,
  top: (i * 53 + 7) % 85,
  speed: 1.5 + (i % 5) * 0.6,
  delay: (i * 0.3) % 3,
  size: 0.5 + (i % 3) * 0.3,
}));

function createHeart(): Heart {
  return {
    id: Math.random().toString(36).slice(2, 9),
    x: 2 + Math.random() * 88,
    speed: 3.5 + Math.random() * 4,
    delay: Math.random() * 0.5,
    size: 2.2 + Math.random() * 1.6,
    variant: Math.floor(Math.random() * 4),
  };
}

export default function HeartMiniGame({ onNext }: Props) {
  const [hearts, setHearts] = useState<Heart[]>(() =>
    Array.from({ length: 20 }, createHeart)
  );
  const [collected, setCollected] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [scoreFloats, setScoreFloats] = useState<ScoreFloat[]>([]);
  const [poppingIds, setPoppingIds] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unlocked = collected >= GOAL;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHearts((prev) => {
        if (prev.length >= 20) return prev;
        return [...prev, createHeart()];
      });
    }, 400);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleHeartClick = useCallback((id: string, x: number, y: number) => {
    // Pop animation
    setPoppingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
      setPoppingIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    }, 380);

    setCollected((c) => c + 1);

    // Sparkles
    const newSparkles: Sparkle[] = Array.from({ length: 4 }, () => ({
      id: Math.random().toString(36).slice(2),
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((n) => n.id === s.id)));
    }, 600);

    // Score float
    const floatId = Math.random().toString(36).slice(2);
    setScoreFloats((prev) => [...prev, { id: floatId, x, y }]);
    setTimeout(() => {
      setScoreFloats((prev) => prev.filter((f) => f.id !== floatId));
    }, 900);
  }, []);

  const progressPct = Math.min((collected / GOAL) * 100, 100);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Dreamy gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0533] via-[#3b0764] to-[#831843]" />

      {/* Twinkling stars */}
      {STARS.map((s) => (
        <span
          key={s.id}
          className="star-twinkle absolute select-none pointer-events-none text-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}rem`,
            "--twinkle-speed": `${s.speed}s`,
            "--twinkle-delay": `${s.delay}s`,
          } as React.CSSProperties}
        >
          ✦
        </span>
      ))}

      {/* Top UI panel */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-5 pb-3 flex flex-col items-center gap-3">
        {/* Title */}
        <p className="font-['Dancing_Script'] text-2xl text-pink-200 drop-shadow-lg">
          Catch my love! 💝
        </p>

        {/* Progress hearts row */}
        <div className="flex gap-2 items-center">
          {Array.from({ length: GOAL }).map((_, i) => (
            <span
              key={i}
              className="text-2xl transition-all duration-300"
              style={{
                filter: i < collected ? "drop-shadow(0 0 6px #f472b6)" : "grayscale(1) opacity(0.35)",
                transform: i < collected ? "scale(1.15)" : "scale(1)",
              }}
            >
              ❤️
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-48 h-3 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden border border-pink-400/30">
          <div
            className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="font-['Poppins'] text-pink-300 text-sm">
          {collected} / {GOAL} hearts caught
        </p>
      </div>

      {/* Falling hearts */}
      {hearts.map((heart) => (
        <button
          key={heart.id}
          aria-label="Catch heart"
          onClick={(e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            handleHeartClick(heart.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
          }}
          className={poppingIds.has(heart.id) ? "heart-pop" : "heart-fall"}
          style={{
            position: "absolute",
            left: `${heart.x}%`,
            top: "-60px",
            fontSize: `${heart.size}em`,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            lineHeight: 1,
            zIndex: 10,
            "--fall-speed": `${heart.speed}s`,
            "--fall-delay": `${heart.delay}s`,
            filter: "drop-shadow(0 0 8px rgba(244,114,182,0.7))",
          } as React.CSSProperties}
        >
          {HEART_VARIANTS[heart.variant]}
        </button>
      ))}

      {/* Sparkle bursts */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-burst"
          style={{ left: s.x, top: s.y }}
        >
          {SPARKLE_EMOJIS[Math.floor(Math.random() * 4)]}
        </span>
      ))}

      {/* Score floats */}
      {scoreFloats.map((f) => (
        <span
          key={f.id}
          className="score-float font-['Dancing_Script']"
          style={{ left: f.x - 16, top: f.y - 20 }}
        >
          +1 💕
        </span>
      ))}

      {/* Unlock overlay */}
      {unlocked && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center bg-[#1a0533]/80 backdrop-blur-md">
          <div className="glow-heart text-7xl mb-6">❤️</div>
          <p className="font-['Playfair_Display'] text-2xl sm:text-3xl text-pink-200 mb-3 leading-relaxed drop-shadow-lg">
            Looks like you caught all my love ❤️
          </p>
          <p className="font-['Dancing_Script'] text-xl text-pink-300 mb-8">
            Now let's begin something special…
          </p>
          <button
            onClick={onNext}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-['Poppins'] font-semibold text-lg shadow-2xl shadow-pink-500/40 hover:from-pink-400 hover:to-rose-400 hover:scale-105 transition-all duration-300"
          >
            Start Our Journey ✨
          </button>
        </div>
      )}
    </div>
  );
}
