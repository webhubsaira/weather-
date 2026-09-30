import React from 'react';
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Cloud,
  Sun,
  Compass,
  Star,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  CurrentWeather,
  GeoLocation,
  TempUnit,
  VisibilityUnit,
  WindUnit,
} from '../types/weather';
import {
  formatTemp,
  formatVisibility,
  formatWindSpeed,
  getWindDirectionName,
} from '../utils/conversions';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  location: GeoLocation;
  tempUnit: TempUnit;
  windUnit: WindUnit;
  visibilityUnit: VisibilityUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  location,
  tempUnit,
  windUnit,
  visibilityUnit,
  isFavorite,
  onToggleFavorite,
  onRefresh,
  isRefreshing = false,
}) => {
  const windDirName = getWindDirectionName(weather.windDirection);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-sm p-6 sm:p-8 transition-all">
      {/* Subtle ambient light gradient according to weather */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 dark:opacity-20 bg-gradient-to-br from-sky-400 to-indigo-600"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
        {/* Header: Location & Time + Favorite/Refresh actions */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                {location.name}
              </h1>
              {location.admin1 && location.admin1 !== location.name && (
                <span className="text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400">
                  · {location.admin1}
                </span>
              )}
              {location.country && (
                <span className="text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400">
                  · {location.country}
                </span>
              )}
            </div>

            {/* Timezone date & time */}
            <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <span>{weather.localDate}</span>
              <span aria-hidden="true">·</span>
              <span>{weather.localTime} local time</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              title="Refresh weather data"
              aria-label="Refresh weather data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onToggleFavorite}
              className={`p-2.5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isFavorite
                  ? 'border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-500'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={isFavorite}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hero Temperature & Condition Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-2">
          {/* Main Temp & Icon */}
          <div className="md:col-span-7 flex items-center gap-5 sm:gap-8">
            <div className="shrink-0 p-3 sm:p-4 rounded-2xl bg-sky-50/80 dark:bg-slate-700/50 border border-sky-100/80 dark:border-slate-600/50 shadow-xs">
              <WeatherIcon
                code={weather.weatherCode}
                isDay={weather.isDay}
                size={64}
                className="w-14 h-14 sm:w-16 sm:h-16"
              />
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
                  {tempUnit === 'F'
                    ? Math.round((weather.temperature * 9) / 5 + 32)
                    : Math.round(weather.temperature)}
                </span>
                <span className="text-2xl sm:text-3xl font-light text-slate-400 dark:text-slate-500">
                  °{tempUnit}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-3">
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {weather.condition}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                  Feels like {formatTemp(weather.feelsLike, tempUnit)}
                </span>
              </div>

              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                H: {formatTemp(weather.maxTemp, tempUnit)} · L: {formatTemp(weather.minTemp, tempUnit)}
              </div>
            </div>
          </div>

          {/* Key Metrics Quick Summary */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>Humidity</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                {weather.humidity}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Wind className="w-3.5 h-3.5 text-teal-500" />
                <span>Wind</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white font-mono tabular-nums truncate">
                {formatWindSpeed(weather.windSpeed, windUnit)}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                {windDirName} ({weather.windDirection}°)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                <span>Pressure</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                {weather.pressure} hPa
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Eye className="w-3.5 h-3.5 text-amber-500" />
                <span>Visibility</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                {formatVisibility(weather.visibility, visibilityUnit)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
