import React from 'react';
import { Wind, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { AirQualityData } from '../types/weather';

interface AirQualityCardProps {
  airQuality: AirQualityData | null;
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  if (!airQuality) return null;

  // AQI color scale marker position (0 to 300+)
  const clampedAqi = Math.min(300, Math.max(0, airQuality.usAqi));
  const pointerPercent = (clampedAqi / 300) * 100;

  const getStatusIcon = (aqi: number) => {
    if (aqi <= 50) return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (aqi <= 100) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    if (aqi <= 150) return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <AlertOctagon className="w-5 h-5 text-rose-500" />;
  };

  return (
    <section className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
            <span>Air Quality Index (AQI)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time atmospheric composition and pollution levels
          </p>
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {getStatusIcon(airQuality.usAqi)}
          <span className={`text-sm font-bold ${airQuality.color}`}>
            {airQuality.category}
          </span>
        </div>
      </div>

      {/* Main AQI Bar Gauge */}
      <div className="my-4">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {airQuality.usAqi}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              US AQI
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            European AQI: <span className="font-semibold text-slate-700 dark:text-slate-300">{airQuality.europeanAqi}</span>
          </div>
        </div>

        {/* Multi-color gradient track with pointer */}
        <div className="relative pt-2 pb-1">
          <div className="h-3 w-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-amber-500 via-rose-500 to-purple-700 relative shadow-inner overflow-hidden" />
          {/* Pointer indicator */}
          <div
            className="absolute top-0 transform -translate-x-1/2 transition-all duration-700"
            style={{ left: `${Math.max(2, Math.min(98, pointerPercent))}%` }}
          >
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
          <span>0 (Good)</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>300+ (Hazardous)</span>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {airQuality.description}
        </p>
      </div>

      {/* Pollutants Breakdown Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            PM2.5
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {airQuality.pm25}
          </span>
          <span className="text-[10px] text-slate-400 block">μg/m³</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            PM10
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {airQuality.pm10}
          </span>
          <span className="text-[10px] text-slate-400 block">μg/m³</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            O₃ (Ozone)
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {airQuality.o3}
          </span>
          <span className="text-[10px] text-slate-400 block">μg/m³</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            NO₂
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {airQuality.no2}
          </span>
          <span className="text-[10px] text-slate-400 block">μg/m³</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            SO₂
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {airQuality.so2}
          </span>
          <span className="text-[10px] text-slate-400 block">μg/m³</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            CO
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {airQuality.co}
          </span>
          <span className="text-[10px] text-slate-400 block">μg/m³</span>
        </div>
      </div>
    </section>
  );
};
