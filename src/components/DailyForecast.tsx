import React, { useState } from 'react';
import { Droplets, Wind, Sun, ChevronDown, ChevronUp, Umbrella, Sparkles } from 'lucide-react';
import { DailyForecastItem, TempUnit, WindUnit } from '../types/weather';
import { formatTemp, formatWindSpeed, getUvCategory } from '../utils/conversions';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  tempUnit: TempUnit;
  windUnit: WindUnit;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  daily,
  tempUnit,
  windUnit,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!daily || daily.length === 0) return null;

  // Calculate overall min & max across all 7 days for normalized temperature bar graph
  const globalMin = Math.min(...daily.map((d) => d.minTemp));
  const globalMax = Math.max(...daily.map((d) => d.maxTemp));
  const range = Math.max(1, globalMax - globalMin);

  return (
    <section className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-5 sm:p-6 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span>7-Day Weather Forecast</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daily daytime highs, overnight lows, and precipitation probabilities
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1 sm:mt-0">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" /> Low (Night)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> High (Day)
            </span>
          </div>
        </div>

        {/* 7-Day Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {daily.slice(0, 7).map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            // Calculate bar offsets for visual range visualization
            const leftPercent = Math.max(0, Math.min(85, ((item.minTemp - globalMin) / range) * 100));
            const widthPercent = Math.max(
              12,
              Math.min(100 - leftPercent, ((item.maxTemp - item.minTemp) / range) * 100)
            );

            const uvInfo = getUvCategory(item.uvIndexMax);

            return (
              <div
                key={`${item.date}-${idx}`}
                className="py-2.5 sm:py-3 transition-colors rounded-xl"
              >
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="flex items-center justify-between gap-3 text-sm hover:bg-slate-50/80 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  {/* Day Name & Date */}
                  <div className="w-24 sm:w-32 shrink-0">
                    <span className="font-semibold text-slate-900 dark:text-white block truncate">
                      {item.dayName}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block truncate">
                      {item.formattedDate}
                    </span>
                  </div>

                  {/* Weather Icon & Condition */}
                  <div className="flex items-center gap-2 sm:gap-2.5 w-32 sm:w-40 shrink-0">
                    <WeatherIcon code={item.weatherCode} isDay={true} size={22} />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate font-medium">
                      {item.condition}
                    </span>
                  </div>

                  {/* Rain Probability */}
                  <div className="flex items-center gap-1 w-14 sm:w-16 shrink-0 text-xs font-mono tabular-nums">
                    {item.precipitationProbability > 0 ? (
                      <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold">
                        <Droplets className="w-3.5 h-3.5 shrink-0" />
                        <span>{Math.round(item.precipitationProbability)}%</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 text-[11px]">0%</span>
                    )}
                  </div>

                  {/* Temperature Range Bar & Min/Max with explicit labels */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end max-w-xs">
                    {/* Low (Min) Temp */}
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none">
                        Low
                      </span>
                      <span className="text-xs sm:text-sm font-mono tabular-nums font-semibold text-sky-600 dark:text-sky-400">
                        {formatTemp(item.minTemp, tempUnit)}
                      </span>
                    </div>

                    {/* Gradient Bar Range */}
                    <div className="hidden sm:block flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-amber-500"
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      />
                    </div>

                    {/* High (Max) Temp */}
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none">
                        High
                      </span>
                      <span className="text-xs sm:text-sm font-mono tabular-nums font-bold text-slate-900 dark:text-white">
                        {formatTemp(item.maxTemp, tempUnit)}
                      </span>
                    </div>

                    {/* Expand icon */}
                    <div className="text-slate-400 shrink-0 ml-1">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Daily Meteorological Detail Drawer */}
                {isExpanded && (
                  <div className="mt-2 mx-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs animate-in fade-in duration-200">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">
                        RealFeel High
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-sm">
                        {formatTemp(item.apparentMaxTemp ?? item.maxTemp, tempUnit)}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">
                        Rain Volume
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-sm">
                        {item.precipitationSum > 0 ? `${item.precipitationSum.toFixed(1)} mm` : '0 mm (Dry)'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">
                        Wind Peak
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-sm">
                        {formatWindSpeed(item.windSpeedMax, windUnit)}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">
                        UV Index
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-sm">
                        {Math.round(item.uvIndexMax)} ({uvInfo.label})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
