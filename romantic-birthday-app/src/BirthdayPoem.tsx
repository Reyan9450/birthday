interface BirthdayPoemProps {
  onNext: () => void;
}

const POEM_LINES = [
  ["On this day, the world got you,", "And my world found its light,"],
  ["A smile that feels like morning sun,", "A heart that feels so right."],
  ["Even miles can't dim your glow,", "You're close in every way,"],
  ["In every thought, in every breath,", "You're with me every day."],
  ["If I could, I'd hold your hand,", "And whisper soft and true —"],
  ["The best thing life has given me,", "Is loving someone like you."],
];

export default function BirthdayPoem({ onNext }: BirthdayPoemProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100">
      <div className="w-full max-w-sm sm:max-w-md text-center space-y-8">

        {/* Decorative top */}
        <div className="text-4xl select-none">🌸</div>

        {/* Poem stanzas */}
        <div className="space-y-5">
          {POEM_LINES.map(([line1, line2], i) => (
            <div key={i} className="space-y-1">
              <p className="font-['Dancing_Script'] text-lg sm:text-xl text-pink-800 leading-relaxed">
                {line1}
              </p>
              <p className="font-['Dancing_Script'] text-lg sm:text-xl text-pink-800 leading-relaxed">
                {line2}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="pt-2 space-y-1 border-t border-pink-200">
          <p className="font-['Playfair_Display'] text-base sm:text-lg text-pink-700 font-semibold italic">
            Happy Birthday, my love ❤️
          </p>
          <p className="font-['Dancing_Script'] text-base sm:text-lg text-purple-600">
            Today, tomorrow, always… it's you.
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg active:scale-95 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
        >
          Continue ❤️
        </button>
      </div>
    </div>
  );
}
