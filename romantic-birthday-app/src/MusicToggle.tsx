import { useEffect, useRef, useState } from "react";
import config from "./config";

export default function MusicToggle() {
  if (!config.musicSrc) return null;

  return <MusicToggleInner />;
}

function MusicToggleInner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {
      // Autoplay may be blocked by the browser — silently ignore
    });
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={config.musicSrc}
        loop
        style={{ display: "none" }}
      />
      <button
        onClick={handleToggle}
        aria-label={muted ? "Unmute music" : "Mute music"}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          background: "rgba(255, 255, 255, 0.8)",
          border: "none",
          borderRadius: "50%",
          width: "3rem",
          height: "3rem",
          fontSize: "1.4rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
