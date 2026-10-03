import React from 'react';
import { CloudSun, Shield, Compass, HeartHandshake, ExternalLink } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-6 sm:p-8 transition-all">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
              About WeatherNow
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simple, reliable, and privacy-first atmospheric intelligence
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
          WeatherNow provides current weather conditions, 24-hour hourly projections, 7-day extended forecasts,
          interactive meteorological radar, and air quality indices in a clean, distraction-free interface.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/60">
            <Compass className="w-5 h-5 text-sky-500 mb-2" />
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Precision Data</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              High-resolution forecasts calculated by global numerical meteorological observation models.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/60">
            <Shield className="w-5 h-5 text-emerald-500 mb-2" />
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Privacy & Security</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Protected by isolated server proxies. Coordinates are processed in memory and never tracked or sold.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/60">
            <HeartHandshake className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Direct Meteorological Grid</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Live radar, satellite infrared scans, and atmospheric indices refreshed continuously.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Protected Meteorological Data Gateway</span>
          <span className="italic">
            Notice: Weather forecasts are calculated for planning guidance and outdoor safety.
          </span>
        </div>
      </div>
    </section>
  );
};
