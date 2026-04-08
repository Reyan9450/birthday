import { useEffect, useRef } from "react";
import config from "./config";

interface FirstMeetingProps {
  onNext: () => void;
}

function FirstMeeting({ onNext }: FirstMeetingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Trigger fade-in by swapping CSS classes
    el.classList.remove("page-fade-init");
    el.classList.add("page-fade-in");
  }, []);

  return (
    <div
      ref={containerRef}
      className="page-fade-init min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50"
    >
      <div className="w-full max-w-lg text-center space-y-6">
        <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl md:text-5xl text-pink-700 leading-tight">
          Do you remember the first time we met?
        </h1>

        <p className="font-['Poppins'] text-sm sm:text-base text-purple-700 leading-relaxed">
          {config.firstMeetingText}
        </p>

        {config.firstMeetingImage ? (
          <img
            src={config.firstMeetingImage}
            alt="Our first meeting"
            className="mx-auto rounded-2xl shadow-lg max-h-60 object-cover w-full"
          />
        ) : (
          <div
            aria-label="Image placeholder"
            className="mx-auto flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 shadow-inner text-6xl sm:text-7xl select-none"
          >
            💕
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg active:scale-95 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
        >
          Next Memory
        </button>
      </div>
    </div>
  );
}

export default FirstMeeting;
