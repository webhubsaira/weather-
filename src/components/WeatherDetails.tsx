import React from 'react';
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  SunMedium,
  Cloud,
  CloudRain,
  Compass,
} from 'lucide-react';
import { CurrentWeather, TempUnit, VisibilityUnit, WindUnit } from '../types/weather';
import {
  formatVisibility,
  formatWindSpeed,
  getUvCategory,
  getWindDirectionName,
} from '../utils/conversions';

interface WeatherDetailsProps {
  weather: CurrentWeather;
  windUnit: WindUnit;
  visibilityUnit: VisibilityUnit;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weather,
  windUnit,
  visibilityUnit,
}) => {
  const windDirName = getWindDirectionName(weather.windDirection);
  const uvInfo = getUvCategory(weather.uvIndex);

  // Pressure quality
  const getPressureLabel = (p: number) => {
    if (p < 1000) return 'Low (Stormy / Unsettled)';
    if (p <= 1020) return 'Normal (Standard Atmosphere)';
    return 'High (Stable / Clear)';
  };

  // Visibility quality
  const getVisibilityLabel = (km: number) => {
    if (km < 2) return 'Poor (Haze or Mist)';
    if (km < 6) return 'Moderate Visibility';
    if (km < 10) return 'Good Visibility';
    return 'Excellent (Clear Horizon)';
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Weather Details
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Atmospheric instruments and ambient conditions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Humidity Card with visual progress */}
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Humidity
            </span>
            <Droplets className="w-4 h-4 text-sky-500" />
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {weather.humidity}%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {weather.humidity > 65
                ? 'High moisture in the air'
                : weather.humidity < 30
                ? 'Dry ambient conditions'
                : 'Comfortable humidity level'}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, weather.humidity)}%` }}
            />
          </div>
        </div>

        {/* 2. Wind Card with Compass Dial */}
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Wind & Gusts
            </span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>

          <div className="my-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {formatWindSpeed(weather.windSpeed, windUnit)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Direction: <strong className="text-slate-800 dark:text-slate-200">{windDirName}</strong> ({weather.windDirection}°)
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                Gusts up to {formatWindSpeed(weather.windGusts, windUnit)}
              </div>
            </div>

            {/* Visual Compass Needle */}
            <div className="relative w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              <span className="absolute top-0.5 text-[9px] font-bold text-slate-400">N</span>
              <span className="absolute bottom-0.5 text-[9px] font-bold text-slate-400">S</span>
              <span className="absolute left-1 text-[9px] font-bold text-slate-400">W</span>
              <span className="absolute right-1 text-[9px] font-bold text-slate-400">E</span>
              <div
                className="w-8 h-8 flex items-center justify-center transition-transform duration-700"
                style={{ transform: `rotate(${weather.windDirection}deg)` }}
                aria-label={`Wind direction ${weather.windDirection} degrees`}
              >
                <div className="w-1.5 h-7 bg-transparent relative flex flex-col items-center justify-between">
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-b-8 border-b-rose-500" />
                  <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-600" />
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-slate-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            {weather.windSpeed < 15 ? 'Gentle breeze' : weather.windSpeed < 40 ? 'Moderate wind' : 'Strong wind caution'}
          </div>
        </div>

        {/* 3. Atmospheric Pressure Card */}
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pressure
            </span>
            <Gauge className="w-4 h-4 text-indigo-500" />
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {weather.pressure} <span className="text-lg font-normal text-slate-400">hPa</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {getPressureLabel(weather.pressure)}
            </p>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            {/* Normalize 960 hPa - 1040 hPa */}
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(5, Math.min(100, ((weather.pressure - 960) / 80) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* 4. Visibility Card */}
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Visibility
            </span>
            <Eye className="w-4 h-4 text-amber-500" />
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {formatVisibility(weather.visibility, visibilityUnit)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {getVisibilityLabel(weather.visibility)}
            </p>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (weather.visibility / 10) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* 5. UV Index Card with Category Scale */}
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              UV Index
            </span>
            <SunMedium className="w-4 h-4 text-orange-500" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {Math.round(weather.uvIndex)}
              </span>
              <span className={`text-sm font-semibold ${uvInfo.color}`}>
                {uvInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {weather.uvIndex >= 6
                ? 'Sun protection recommended during midday'
                : 'Minimal danger for the average person'}
            </p>
          </div>

          {/* 5-step UV scale */}
          <div className="w-full grid grid-cols-5 gap-1 h-2 rounded-full overflow-hidden">
            <div className={`rounded-sm ${weather.uvIndex >= 0 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`rounded-sm ${weather.uvIndex >= 3 ? 'bg-yellow-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`rounded-sm ${weather.uvIndex >= 6 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`rounded-sm ${weather.uvIndex >= 8 ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <div className={`rounded-sm ${weather.uvIndex >= 11 ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
          </div>
        </div>

        {/* 6. Cloud Coverage & Precipitation */}
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Clouds & Precipitation
            </span>
            <Cloud className="w-4 h-4 text-slate-500" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                  {weather.cloudCover}%
                </span>
                <span className="text-xs text-slate-400 ml-1.5">Cloud Cover</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                  {weather.precipitation.toFixed(1)} mm
                </span>
                <span className="text-[11px] text-slate-400 block">Precipitation</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {weather.cloudCover > 80
                ? 'Overcast skies'
                : weather.cloudCover > 30
                ? 'Scattered clouds'
                : 'Mostly clear skies'}
            </p>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-slate-500 dark:bg-slate-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, weather.cloudCover)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
