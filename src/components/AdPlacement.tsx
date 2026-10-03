import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

/**
 * Monetization Ad Unit compliant with Google AdSense and Coalition for Better Ads policies.
 * Includes official "ADVERTISEMENT" labeling, responsive sizing, and high-converting fallback.
 */
export const AdPlacement: React.FC<AdPlacementProps> = ({
  slotId = 'default-ad-slot',
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
        Advertisement
      </span>

      {/* Ad Container Box */}
      <div
        id={`ad-container-${slotId}`}
        className={`w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-xs flex items-center justify-center ${
          format === 'horizontal'
            ? 'min-h-[90px] sm:min-h-[100px] max-w-4xl p-3 sm:p-4'
            : 'min-h-[250px] max-w-sm p-4'
        }`}
      >
        {/*
          To connect your Google AdSense or programmatic ad network:
          1. Add your Google AdSense script to index.html: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
          2. Replace this fallback block with your <ins className="adsbygoogle" ... /> tag
        */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                WeatherNow Sponsorship Network
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Reach thousands of daily outdoor enthusiasts, travelers, and meteorology planners.
              </p>
            </div>
          </div>

          <a
            href="mailto:sairainfinityfree@gmail.com?subject=WeatherNow%20Ad%20Placement%20Inquiry"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>Promote Your Brand</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
