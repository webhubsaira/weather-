import React from 'react';
import { CloudSun, Heart } from 'lucide-react';

interface FooterProps {
  onSelectSection: (sectionId: string) => void;
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSection }) => {
  return (
    <footer className="mt-8 border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-md bg-sky-500 flex items-center justify-center text-white">
                <CloudSun className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white font-sans">
                Weather<span className="text-sky-500">Now</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your simple and reliable weather companion.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onSelectSection('overview')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onSelectSection('hourly')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Hourly
            </button>
            <button
              onClick={() => onSelectSection('forecast')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              7-Day Forecast
            </button>
            <button
              onClick={() => onSelectSection('radar')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Radar Map
            </button>
            <button
              onClick={() => onSelectSection('favorites')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Saved Locations
            </button>
            <button
              onClick={() => onSelectSection('about')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About & Privacy
            </button>
          </nav>
        </div>

        {/* Legal and attribution row */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Weather data provided by{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:underline"
            >
              Open-Meteo
            </a>
            {' · '}
            Radar by{' '}
            <a
              href="https://www.rainviewer.com"
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:underline"
            >
              RainViewer
            </a>
            {' · '}
            Maps ©{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:underline"
            >
              OpenStreetMap
            </a>
          </p>
        </div>

        <p className="mt-2 text-[11px] text-center text-slate-400 dark:text-slate-500 italic">
          Meteorological data is for informational purposes only and is not guaranteed to be free of forecasting variance.
        </p>
      </div>
    </footer>
  );
};
