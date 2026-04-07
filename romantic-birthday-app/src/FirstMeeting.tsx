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
      className="page-fade-init min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50"
    >
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Title */}
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-pink-700 leading-tight">
          Do you remember the first time we met?
        </h1>

        {/* Paragraph from config */}
        <p className="font-['Poppins'] text-base sm:text-lg text-purple-700 leading-relaxed">
          {config.firstMeetingText}
        </p>

        {/* Image or placeholder */}
        {config.firstMeetingImage ? (
          <img
            src={config.firstMeetingImage}
            alt="Our first meeting"
            className="mx-auto rounded-2xl shadow-lg max-h-72 object-cover w-full sm:w-auto"
          />
        ) : (
          <div
            aria-label="Image placeholder"
            className="mx-auto flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 shadow-inner text-7xl select-none"
          >
            💕
          </div>
        )}

        {/* Next button */}
        <button
          onClick={onNext}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 hover:shadow-pink-300/50 hover:shadow-xl transition-all duration-300"
        >
          Next Memory
        </button>
      </div>
    </div>
  );
}

export default FirstMeeting;
