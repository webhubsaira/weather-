import React, { useState } from 'react';
import { X, Key, Check, Info, Sliders, ShieldCheck } from 'lucide-react';
import { PressureUnit, UnitPreferences, VisibilityUnit, WindUnit } from '../types/weather';
import { getCustomApiKey, saveCustomApiKey } from '../utils/localStorage';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: UnitPreferences;
  onUpdateUnits: (units: UnitPreferences) => void;
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  units,
  onUpdateUnits,
}) => {
  const [apiKey, setApiKey] = useState(getCustomApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [localUnits, setLocalUnits] = useState<UnitPreferences>(units);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomApiKey(apiKey);
    onUpdateUnits(localUnits);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-dialog-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/80">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-sky-500" />
            <h2 id="settings-dialog-title" className="text-base font-bold text-slate-900 dark:text-white">
              Preferences & API Configuration
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Unit Settings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Measurement Units
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Wind Speed
                </label>
                <select
                  value={localUnits.wind}
                  onChange={(e) =>
                    setLocalUnits({ ...localUnits, wind: e.target.value as WindUnit })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="km/h">Kilometers per hour (km/h)</option>
                  <option value="mph">Miles per hour (mph)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Visibility
                </label>
                <select
                  value={localUnits.visibility}
                  onChange={(e) =>
                    setLocalUnits({ ...localUnits, visibility: e.target.value as VisibilityUnit })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="km">Kilometers (km)</option>
                  <option value="miles">Miles (mi)</option>
                </select>
              </div>
            </div>
          </div>

          {/* API Configuration & Guidance */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              API Integration
            </h3>

            {/* Default Status Badge */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Live Open-Meteo Integration Active</span>
                <span>
                  The app is fully functioning with high-accuracy worldwide data from Open-Meteo,
                  RainViewer radar, and OpenStreetMap. No proprietary API key is required to use this application!
                </span>
              </div>
            </div>

            {/* Optional Custom API Key input */}
            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Optional Custom Weather API Key (<code className="font-mono text-[11px]">WEATHER_API_KEY</code>)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="WEATHER_API_KEY (optional)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Stored safely in browser localStorage or injected via server environment.
              </p>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
