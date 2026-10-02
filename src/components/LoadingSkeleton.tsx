import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-5 animate-pulse" aria-busy="true" aria-label="Loading weather information">
      {/* Hero Card Skeleton matching CurrentWeatherCard exactly */}
      <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 space-y-6 min-h-[220px]">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-52 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-36 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
          <div className="md:col-span-7 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 shrink-0" />
            <div className="space-y-2">
              <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800 rounded-md" />
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-18 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 p-3 space-y-2">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-5 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4">
        <div className="h-5 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-24 h-28 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
          ))}
        </div>
      </div>

      {/* 7-Day & Sun Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 h-80 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-6" />
        <div className="h-80 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-6" />
      </div>
    </div>
  );
};
