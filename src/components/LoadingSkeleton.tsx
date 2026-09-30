import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading weather information">
      {/* Loading banner */}
      <div className="flex items-center justify-center gap-2.5 py-2 text-sm text-sky-600 dark:text-sky-400 font-medium">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Getting weather information...</span>
      </div>

      {/* Hero Card Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700/60 rounded-md" />
          </div>
          <div className="h-9 w-9 bg-slate-100 dark:bg-slate-700 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-2">
              <div className="h-12 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-4 w-36 bg-slate-100 dark:bg-slate-700/60 rounded-md" />
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-slate-100 dark:bg-slate-700/40 p-3 space-y-2">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-5 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6 space-y-4">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-24 h-32 rounded-xl bg-slate-100 dark:bg-slate-700/40 shrink-0" />
          ))}
        </div>
      </div>

      {/* 7-Day & Details Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6" />
        <div className="h-80 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6" />
      </div>
    </div>
  );
};
