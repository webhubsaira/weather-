import React from 'react';
import { Sunrise, Sunset, Clock, Sun, Moon, Sparkles, Compass } from 'lucide-react';
import { calculateSunPosition, formatDaylightDuration, getLocalTimeString } from '../utils/dateTime';

interface SunriseSunsetCardProps {
  sunrise: string;
  sunset: string;
  daylightDuration: number;
  timezone: string;
  uvIndex?: number;
  isDay?: boolean;
}

export const SunriseSunsetCard: React.FC<SunriseSunsetCardProps> = ({
  sunrise,
  sunset,
  daylightDuration,
  timezone,
  uvIndex = 5,
  isDay = true,
}) => {
  const sunData = calculateSunPosition(sunrise, sunset);
  const sunriseFormatted = getLocalTimeString(sunrise, timezone);
  const sunsetFormatted = getLocalTimeString(sunset, timezone);

  // SVG curved arc calculation
  const t = sunData.progress;
  const angle = Math.PI * (1 - t);
  const sunX = 120 - 90 * Math.cos(angle);
  const sunY = 88 - 62 * Math.sin(angle);

  // Outdoor comfort tip
  const getOutdoorTip = () => {
    if (!isDay) return 'Quiet nighttime hours. Stargazing and restful conditions.';
    if (uvIndex >= 8) return 'Intense UV levels. Seek shade and use high SPF protection.';
    if (uvIndex >= 6) return 'Moderate-high UV. Sunglasses and sun hat recommended.';
    return 'Comfortable daylight conditions for walking and outdoor activities.';
  };

  return (
    <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-5 sm:p-6 transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
            {isDay ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
            <span>Sun & Daylight Cycle</span>
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {sunData.message}
          </span>
        </div>

        {/* Visual Solar Arc */}
        <div className="py-2 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[270px] h-[105px]">
            <svg viewBox="0 0 240 100" className="w-full h-full overflow-visible select-none">
              {/* Horizon baseline */}
              <line
                x1="10"
                y1="88"
                x2="230"
                y2="88"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Sun path arc */}
              <path
                d="M 25 88 A 95 65 0 0 1 215 88"
                fill="none"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="3"
              />

              {/* Elapsed daylight progress arc */}
              {sunData.progress > 0 && (
                <path
                  d="M 25 88 A 95 65 0 0 1 215 88"
                  fill="none"
                  stroke="url(#solarGradient)"
                  strokeWidth="3.5"
                  strokeDasharray="300"
                  strokeDashoffset={300 * (1 - sunData.progress)}
                  className="transition-all duration-1000"
                />
              )}

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>

              {/* Active Sun/Moon position marker */}
              <g
                transform={`translate(${sunX}, ${sunY})`}
                className="transition-all duration-700 ease-out"
              >
                <circle
                  r="12"
                  fill={isDay ? '#f59e0b' : '#818cf8'}
                  fillOpacity="0.2"
                  className="animate-pulse"
                />
                <circle
                  r="6.5"
                  fill={isDay ? '#f59e0b' : '#a5b4fc'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="shadow-sm"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Sunrise & Sunset times */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Sunrise className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Sunrise
              </span>
              <span className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-slate-900 dark:text-white">
                {sunriseFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Sunset className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Sunset
              </span>
              <span className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-slate-900 dark:text-white">
                {sunsetFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daylight & Outdoor Environment Summary (Fills height without leaving empty space) */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>Total Daylight:</span>
          <strong className="text-slate-800 dark:text-slate-200">
            {formatDaylightDuration(daylightDuration)}
          </strong>
        </div>

        <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-slate-800/40 border border-sky-100/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
          <span className="leading-snug">{getOutdoorTip()}</span>
        </div>
      </div>
    </div>
  );
};
