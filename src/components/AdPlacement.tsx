import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

/**
 * Clean Monetization Ad Unit compliant with IAB and Better Ads standards.
 * Pure placeholder that serves zero external or inappropriate ad scripts.
 */
export const AdPlacement: React.FC<AdPlacementProps> = ({
  slotId = 'top-leaderboard',
  format = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center ${className}`}
      aria-label="Advertisement Banner"
    >
      {/* Required Publisher Policy Label */}
      <span className="text-[10px] tracking-widest font-semibold uppercase text-slate-400 dark:text-slate-500 mb-1.5 select-none">
        Partner Sponsor
      </span>

      {/* Clean Container Box */}
      <div
        id={`ad-box-${slotId}`}
        className={`w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 p-4 text-center sm:text-left`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              WeatherNow Sponsorship Network
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Clean, verified partner placements for weather, travel, and outdoor enthusiasts.
            </p>
          </div>
        </div>

        <a
          href="mailto:sairainfinityfree@gmail.com?subject=WeatherNow%20Direct%20Ad%20Sponsorship"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <span>Promote Your Brand</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
