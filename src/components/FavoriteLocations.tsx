import React from 'react';
import { Star, MapPin, Trash2, ArrowUpRight, X } from 'lucide-react';
import { GeoLocation } from '../types/weather';

interface FavoriteLocationsProps {
  favorites: GeoLocation[];
  currentLocation: GeoLocation;
  onSelectLocation: (loc: GeoLocation) => void;
  onRemoveFavorite: (loc: GeoLocation) => void;
  onClose?: () => void;
}

export const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
  favorites,
  currentLocation,
  onSelectLocation,
  onRemoveFavorite,
  onClose,
}) => {
  return (
    <section className="rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Saved Locations</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Quickly jump between your bookmarked cities
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close saved locations view"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
          <Star className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="font-medium text-slate-700 dark:text-slate-300">No saved locations yet</p>
          <p className="text-xs mt-1">Click the star button on any city card to bookmark it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {favorites.map((fav) => {
            const isCurrent =
              fav.name.toLowerCase() === currentLocation.name.toLowerCase() &&
              fav.country.toLowerCase() === currentLocation.country.toLowerCase();

            return (
              <div
                key={`${fav.name}-${fav.latitude}-${fav.longitude}`}
                className={`group relative flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800'
                    : 'bg-slate-50/70 dark:bg-slate-700/30 border-slate-100 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-700/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectLocation(fav)}
                  className="flex-1 text-left min-w-0 pr-2 focus:outline-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {fav.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block truncate">
                    {fav.admin1 ? `${fav.admin1}, ` : ''}
                    {fav.country}
                  </span>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(fav);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 opacity-60 hover:opacity-100 transition-opacity"
                    title={`Remove ${fav.name} from saved`}
                    aria-label={`Remove ${fav.name} from saved`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectLocation(fav)}
                    className="p-1.5 rounded-lg text-slate-400 group-hover:text-sky-500 transition-colors"
                    aria-label={`View weather for ${fav.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
