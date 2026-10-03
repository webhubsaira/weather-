import React, { useEffect, useRef } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

/**
 * Monetization Ad Unit for Adsterra Native Banner (NativeBanner_1)
 * ID: 4e2de2d859949903fb3ed450524bc00a
 */
export const AdPlacement: React.FC<AdPlacementProps> = ({
  slotId = 'top-leaderboard',
  format = 'horizontal',
  className = '',
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const isPrimarySlot = slotId === 'top-leaderboard';

  useEffect(() => {
    if (!isPrimarySlot) return;

    const scriptSrc = 'https://bauval.org/21/4e2de2d859949903fb3ed450524bc00a';
    const containerId = 'container-4e2de2d859949903fb3ed450524bc00a';

    // Ensure the container element is ready
    const targetElement = document.getElementById(containerId);
    if (!targetElement) return;

    // Load or execute the Adsterra script
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptSrc;
      document.body.appendChild(script);
    }
  }, [isPrimarySlot]);

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
        id={`ad-box-${slotId}`}
        className={`w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col items-center justify-center min-h-[90px] p-3 sm:p-4`}
      >
        {isPrimarySlot ? (
          <div className="w-full flex flex-col items-center justify-center">
            {/* Official Adsterra Native Banner Target Container */}
            <div
              id="container-4e2de2d859949903fb3ed450524bc00a"
              className="w-full min-h-[60px] flex items-center justify-center"
            ></div>

            {/* Direct Sponsorship fallback bar */}
            <div className="w-full mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-500" /> WeatherNow Verified Ad Partner
              </span>
              <a
                href="mailto:sairainfinityfree@gmail.com?subject=WeatherNow%20Direct%20Ad%20Sponsorship"
                className="hover:text-sky-500 transition-colors inline-flex items-center gap-1 font-medium"
              >
                Inquiries <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ) : (
          /* Secondary content ad placement / direct sponsor banner */
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  WeatherNow Advertising & Partner Network
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Reach outdoor enthusiasts, travelers, and daily meteorology planners.
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
        )}
      </div>
    </div>
  );
};
