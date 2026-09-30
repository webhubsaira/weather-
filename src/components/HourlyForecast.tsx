import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Droplets } from 'lucide-react';
import { HourlyForecastItem, TempUnit } from '../types/weather';
import { formatTemp } from '../utils/conversions';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  tempUnit: TempUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, tempUnit }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!hourly || hourly.length === 0) return null;

  return (
    <section className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Hourly Forecast
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Next 24 hours conditions and precipitation chance
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Scroll hourly forecast left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Scroll hourly forecast right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally scrollable row */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
        tabIndex={0}
        aria-label="Hourly weather scroll area"
      >
        {hourly.map((item, index) => (
          <div
            key={`${item.time}-${index}`}
            className="shrink-0 w-24 sm:w-28 flex flex-col items-center justify-between p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-sky-50/30 dark:hover:bg-slate-700/60 transition-all text-center group"
          >
            {/* Time */}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono tabular-nums whitespace-nowrap">
              {index === 0 ? 'Now' : item.formattedHour}
            </span>

            {/* Icon */}
            <div className="my-2.5 transform group-hover:scale-110 transition-transform">
              <WeatherIcon code={item.weatherCode} isDay={item.isDay} size={30} />
            </div>

            {/* Temperature */}
            <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {formatTemp(item.temperature, tempUnit)}
            </span>

            {/* Condition text (truncated) */}
            <span
              className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-full mt-0.5"
              title={item.condition}
            >
              {item.condition}
            </span>

            {/* Precipitation chance */}
            <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 font-mono tabular-nums">
              <Droplets className="w-3 h-3 shrink-0" />
              <span>{Math.round(item.precipitationProbability)}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
