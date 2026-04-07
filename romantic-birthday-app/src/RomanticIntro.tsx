import useTypingAnimation from "./hooks/useTypingAnimation";

const INTRO_TEXT =
  "Hey Beautiful ❤️ Today is not just your birthday... It's the day someone very special came into this world... Someone who changed my life forever.";

interface RomanticIntroProps {
  onNext: () => void;
}

function RomanticIntro({ onNext }: RomanticIntroProps) {
  const displayedText = useTypingAnimation(INTRO_TEXT, 50);
  const isComplete = displayedText === INTRO_TEXT;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-100 via-purple-50 to-lavender-100">
      <div className="max-w-2xl w-full text-center space-y-8">
        <p
          className="font-['Dancing_Script'] text-2xl sm:text-3xl md:text-4xl text-pink-700 leading-relaxed min-h-[8rem]"
          aria-live="polite"
        >
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-0.5 h-7 bg-pink-500 ml-1 animate-pulse align-middle" />
          )}
        </p>

        {isComplete && (
          <button
            onClick={onNext}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 hover:shadow-pink-300/50 hover:shadow-xl transition-all duration-300 animate-fade-in"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default RomanticIntro;
