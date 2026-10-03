import React, { useState } from 'react';
import { BookOpen, Radio, Wind, Sun, Gauge, ShieldAlert } from 'lucide-react';

export const WeatherGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'radar' | 'aqi' | 'uv' | 'pressure'>('radar');

  return (
    <section
      id="guide"
      aria-label="Meteorological Knowledge Base and Weather Guide"
      className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-6 sm:p-8 transition-all"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                Atmospheric Science & Weather Guide
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Educational reference for Doppler radar, air quality indices, and barometric pressure trends
              </p>
            </div>
          </div>

          {/* Guide navigation pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 text-xs font-semibold overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'radar'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Doppler Radar
            </button>
            <button
              onClick={() => setActiveTab('aqi')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'aqi'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Air Quality (AQI)
            </button>
            <button
              onClick={() => setActiveTab('uv')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'uv'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              UV Index
            </button>
            <button
              onClick={() => setActiveTab('pressure')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'pressure'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Barometric Pressure
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'radar' && (
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <Radio className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  How Doppler Weather Radar Tracks Precipitation
                </h3>
                <p className="mt-1 leading-relaxed">
                  Doppler radar emits electromagnetic microwave pulses into the atmosphere and measures how much energy reflects back from water droplets, hail, or snowflakes. Reflectivity is measured in decibels relative to Z (dBZ).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Light Rain (15–30 dBZ)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Gentle mist, sprinkles, or light steady rain. Usually safe for outdoor activities without severe impacts.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  Moderate Rain (30–45 dBZ)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Steady, noticeable showers with umbrella requirement. Road spray may decrease driving visibility.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                  Heavy Storm / Hail (45–65+ dBZ)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Torrential downpours, localized flash flooding, lightning, and possible hail stones. Seek indoor shelter.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aqi' && (
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <Wind className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Understanding the Air Quality Index (AQI)
                </h3>
                <p className="mt-1 leading-relaxed">
                  The Air Quality Index summarizes ground-level air pollution based on fine particulate matter (PM2.5, PM10), Nitrogen Dioxide (NO2), Carbon Monoxide (CO), and Ozone (O3).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block">0–50: Good</span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">Ideal for all outdoor sports and exercise.</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80">
                <span className="font-bold text-amber-700 dark:text-amber-400 block">51–100: Moderate</span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">Acceptable air quality for majority of people.</span>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/80">
                <span className="font-bold text-orange-700 dark:text-orange-400 block">101–150: Sensitive</span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">Asthma and respiratory patients should take precautions.</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80">
                <span className="font-bold text-rose-700 dark:text-rose-400 block">151+: Unhealthy</span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">General public may experience irritation. Limit outdoor exertion.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'uv' && (
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  UV Index Scale & Dermatological Safety
                </h3>
                <p className="mt-1 leading-relaxed">
                  The Global Solar UV Index measures the strength of sunburn-producing ultraviolet radiation at solar noon. Peak radiation occurs between 11:00 AM and 4:00 PM.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">UV 1–2 (Low)</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Minimal protection required. You can safely stay outside without sun protection.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">UV 3–7 (Moderate to High)</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Wear SPF 30+ sunscreen, sunglasses, and a wide-brim hat. Seek shade during midday.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="font-bold text-purple-600 dark:text-purple-400 uppercase">UV 8–11+ (Very High to Extreme)</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Unprotected skin can burn in under 15 minutes. Avoid direct midday sun exposure.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pressure' && (
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <Gauge className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Barometric Pressure & Storm Forecasting
                </h3>
                <p className="mt-1 leading-relaxed">
                  Atmospheric pressure indicates the weight of the air column overhead. Rapid shifts in barometric pressure are the earliest indicators of approaching weather fronts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="font-bold text-sky-600 dark:text-sky-400 uppercase">Falling Pressure (&lt; 1013 hPa)</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Signals approaching low-pressure storm systems, increasing cloudiness, wind, and precipitation.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">Rising Pressure (&gt; 1013 hPa)</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Indicates building high-pressure ridge, resulting in clearing skies, calmer winds, and stable dry weather.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
