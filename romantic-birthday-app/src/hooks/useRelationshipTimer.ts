import { useState, useEffect } from "react";

interface TimerValue {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZEROS: TimerValue = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function compute(startDate: Date): TimerValue {
  const totalMs = Date.now() - startDate.getTime();
  if (totalMs < 0) return ZEROS;

  const YEAR_MS  = 365.25 * 24 * 3600 * 1000;
  const MONTH_MS = 30.44  * 24 * 3600 * 1000;
  const DAY_MS   = 24 * 3600 * 1000;
  const HOUR_MS  = 3600 * 1000;
  const MIN_MS   = 60000;

  return {
    years:   Math.floor(totalMs / YEAR_MS),
    months:  Math.floor((totalMs % YEAR_MS)  / MONTH_MS),
    days:    Math.floor((totalMs % MONTH_MS) / DAY_MS),
    hours:   Math.floor((totalMs % DAY_MS)   / HOUR_MS),
    minutes: Math.floor((totalMs % HOUR_MS)  / MIN_MS),
    seconds: Math.floor((totalMs % MIN_MS)   / 1000),
  };
}

function useRelationshipTimer(startDate: string): TimerValue {
  const parsed = new Date(startDate);

  if (isNaN(parsed.getTime())) {
    console.warn("Invalid relationshipStartDate");
    return ZEROS;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<TimerValue>(() => compute(parsed));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(compute(parsed));
    }, 1000);
    return () => clearInterval(interval);
    // parsed is derived from startDate; re-run if startDate changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return value;
}

export default useRelationshipTimer;
