import React from 'react';
import { Sparkles, ExternalLink, Coffee } from 'lucide-react';

export const SponsorBanner: React.FC = () => {
  return (
    <aside
      aria-label="Sponsor and Community Support"
      className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-r from-sky-50/80 via-white to-blue-50/80 dark:from-slate-900/90 dark:via-slate-900/95 dark:to-slate-800/80 p-4 sm:p-5 shadow-xs transition-all"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded-md">
                Support WeatherNow
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">100% Free & Fast</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
              Enjoying ad-free, hyper-local forecasts and live Doppler radar?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Coffee className="w-4 h-4" />
            <span>Buy Me a Coffee</span>
          </a>
          <a
            href="mailto:sairainfinityfree@gmail.com?subject=WeatherNow%20Sponsorship%20Inquiry"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <span>Advertise Here</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
