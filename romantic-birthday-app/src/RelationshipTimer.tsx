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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50">
      <div className="max-w-2xl w-full text-center space-y-10">

        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-pink-700 font-bold">
          We've Been Together For…
        </h1>

        {/* 3-column grid of timer cards */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-pink-200 py-5 px-2"
            >
              <span className="font-['Poppins'] text-3xl sm:text-4xl font-bold text-purple-600">
                {String(value).padStart(2, "0")}
              </span>
              <span className="font-['Poppins'] text-xs sm:text-sm text-pink-500 mt-1 tracking-wide uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Romantic line */}
        <p className="font-['Dancing_Script'] text-xl sm:text-2xl text-pink-600 italic">
          And every second with you is my favorite.
        </p>

        <button
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-['Playfair_Display'] text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 hover:shadow-pink-300/50 hover:shadow-xl transition-all duration-300"
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default RelationshipTimer;
