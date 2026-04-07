import { useState } from "react";

export interface Letter {
  title: string;
  content: string;
}

interface EnvelopeCardProps {
  letter: Letter;
}

function EnvelopeCard({ letter }: EnvelopeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="cursor-pointer rounded-2xl border border-pink-200 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-pink-200/60 hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center select-none"
    >
      {!isOpen ? (
        /* Closed state */
        <div className="flex flex-col items-center gap-3 py-4">
          <span className="text-5xl">✉️</span>
          <p className="font-['Playfair_Display'] text-lg text-pink-700 font-semibold">
            {letter.title}
          </p>
          <p className="font-['Poppins'] text-xs text-purple-400">
            Tap to open
          </p>
        </div>
      ) : (
        /* Open state — paper-style with soft glow */
        <div className="envelope-open w-full rounded-xl bg-white border border-pink-200 shadow-lg shadow-pink-200/50 px-5 py-6 flex flex-col gap-3">
          <p className="font-['Playfair_Display'] text-base font-bold text-pink-600">
            {letter.title}
          </p>
          <p className="font-['Poppins'] text-sm text-purple-700 leading-relaxed">
            {letter.content}
          </p>
          <p className="font-['Poppins'] text-xs text-pink-300 mt-2">
            Tap to close
          </p>
        </div>
      )}
    </div>
  );
}

export default EnvelopeCard;
