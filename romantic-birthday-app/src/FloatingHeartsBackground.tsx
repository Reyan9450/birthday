import { useMemo } from "react";

interface HeartConfig {
  id: number;
  x: number;       // 0–100 (percent from left)
  duration: number; // animation duration in seconds (speed)
  delay: number;   // animation delay in seconds
  size: number;    // font size in px
}

const NUM_HEARTS = 15;

function generateHearts(): HeartConfig[] {
  return Array.from({ length: NUM_HEARTS }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: 6 + Math.random() * 8,  // 6–14s
    delay: Math.random() * 10,         // 0–10s
    size: 14 + Math.random() * 18,     // 14–32px
  }));
}

export default function FloatingHeartsBackground() {
  const hearts = useMemo(() => generateHearts(), []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            position: "absolute",
            left: `${heart.x}%`,
            bottom: 0,
            fontSize: `${heart.size}px`,
            animation: `floatHeart ${heart.duration}s ${heart.delay}s infinite ease-in-out`,
            userSelect: "none",
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
