import config from "./config";
import useRelationshipTimer from "./hooks/useRelationshipTimer";

interface RelationshipTimerProps {
  onNext: () => void;
}

interface TimerUnit {
  label: string;
  value: number;
}

function RelationshipTimer({ onNext }: RelationshipTimerProps) {
  const timer = useRelationshipTimer(config.relationshipStartDate);

  const units: TimerUnit[] = [
    { label: "Years",   value: timer.years   },
    { label: "Months",  value: timer.months  },
    { label: "Days",    value: timer.days    },
    { label: "Hours",   value: timer.hours   },
    { label: "Minutes", value: timer.minutes },
    { label: "Seconds", value: timer.seconds },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50">
      <div className="w-full max-w-lg text-center space-y-6">

        <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl text-pink-700 font-bold leading-tight">
          We've Been Together Since March 17th 💕
        </h1>

        {/* 3-column grid — compact on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md border border-pink-200 py-3 sm:py-5 px-1"
            >
              <span className="font-['Poppins'] text-xl sm:text-3xl font-bold text-purple-600 tabular-nums">
                {String(value).padStart(2, "0")}
              </span>
              <span className="font-['Poppins'] text-[10px] sm:text-xs text-pink-500 mt-1 tracking-wide uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-['Dancing_Script'] text-lg sm:text-2xl text-pink-600 italic">
          And every second with you is my favorite.
        </p>

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg active:scale-95 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default RelationshipTimer;
