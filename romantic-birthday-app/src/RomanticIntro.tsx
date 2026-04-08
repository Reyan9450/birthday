import useTypingAnimation from "./hooks/useTypingAnimation";

const INTRO_TEXT =
  "Hey Maira ❤️ Today is not just your birthday... It's the day the most beautiful soul came into this world... Someone who changed my life from the very first moment I met you.";

interface RomanticIntroProps {
  onNext: () => void;
}

function RomanticIntro({ onNext }: RomanticIntroProps) {
  const displayedText = useTypingAnimation(INTRO_TEXT, 50);
  const isComplete = displayedText === INTRO_TEXT;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50">
      <div className="w-full max-w-lg text-center space-y-6">
        <p
          className="font-['Dancing_Script'] text-xl sm:text-3xl md:text-4xl text-pink-700 leading-relaxed min-h-[6rem] sm:min-h-[8rem]"
          aria-live="polite"
        >
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-0.5 h-6 bg-pink-500 ml-1 animate-pulse align-middle" />
          )}
        </p>

        {isComplete && (
          <button
            onClick={onNext}
            className="mt-4 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg active:scale-95 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default RomanticIntro;
