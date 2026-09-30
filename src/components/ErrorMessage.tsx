import React from 'react';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  onSearchDefault?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onSearchDefault,
}) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60 p-8 text-center max-w-lg mx-auto shadow-sm my-8">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
        Unable to Load Weather
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
        {message}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        {onSearchDefault && (
          <button
            type="button"
            onClick={onSearchDefault}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-sky-500" />
            <span>Load Default (Lahore)</span>
          </button>
        )}
      </div>
    </div>
  );
};
