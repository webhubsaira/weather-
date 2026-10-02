import React, { useState, useEffect, useRef, startTransition } from 'react';
import { Search, MapPin, X, Clock, Loader2, Navigation, Sparkles } from 'lucide-react';
import { GeoLocation } from '../types/weather';
import { searchLocations } from '../services/weatherApi';

interface SearchBarProps {
  onSelectLocation: (loc: GeoLocation) => void;
  onUseMyLocation: () => void;
  isLoadingLocation: boolean;
  recentSearches: string[];
  onSelectRecentSearch: (query: string) => void;
  onClearRecentSearches: () => void;
  locationError?: string | null;
  currentLocation?: GeoLocation;
}

const POPULAR_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'London',
  'New York',
  'Dubai',
  'Tokyo',
  'Paris',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectLocation,
  onUseMyLocation,
  isLoadingLocation,
  recentSearches,
  onSelectRecentSearch,
  onClearRecentSearches,
  locationError,
  currentLocation,
}) => {
  const [query, setQuery] = useState(
    currentLocation ? `${currentLocation.name}${currentLocation.country ? `, ${currentLocation.country}` : ''}` : ''
  );
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [searchError, setSearchError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Sync search input when current location changes externally (e.g. from favorites or geolocation)
  useEffect(() => {
    if (currentLocation && document.activeElement !== inputRef.current) {
      setQuery(
        `${currentLocation.name}${currentLocation.country ? `, ${currentLocation.country}` : ''}`
      );
    }
  }, [currentLocation]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Debounced autocomplete search
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setSearchError(null);
      setIsSearching(false);
      return;
    }

    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    setIsSearching(true);
    setSearchError(null);

    debounceTimerRef.current = window.setTimeout(async () => {
      try {
        // Strip country code if present from previous selection
        const cleanQuery = trimmed.includes(',') ? trimmed.split(',')[0].trim() : trimmed;
        const results = await searchLocations(cleanQuery || trimmed);
        startTransition(() => {
          setSuggestions(results);
          setSelectedIndex(-1);
          if (results.length === 0) {
            setSearchError('Location not found. Please check spelling.');
          } else {
            setSearchError(null);
          }
        });
      } catch (err) {
        console.error('Search error:', err);
        setSearchError('Network error while searching. Please try again.');
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const handleSelect = (loc: GeoLocation) => {
    onSelectLocation(loc);
    setQuery(`${loc.name}${loc.country ? `, ${loc.country}` : ''}`);
    setIsOpen(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    setSearchError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // If user explicitly navigated down using arrow keys
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelect(suggestions[selectedIndex]);
      return;
    }

    // Direct search for the exact query string typed
    setIsSearching(true);
    setSearchError(null);
    try {
      const cleanQuery = trimmed.includes(',') ? trimmed.split(',')[0].trim() : trimmed;
      const results = await searchLocations(cleanQuery || trimmed);
      if (results && results.length > 0) {
        handleSelect(results[0]);
      } else {
        setSearchError(`No weather station found for "${trimmed}". Please check the spelling.`);
        setIsOpen(true);
      }
    } catch {
      setSearchError('Could not reach weather search service. Please check connection.');
      setIsOpen(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2.5" ref={containerRef}>
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
            ) : (
              <Search className="w-5 h-5 group-focus-within:text-sky-500 transition-colors" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSuggestions([]); // Clear stale suggestions immediately
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search city, region, or country (e.g. Lahore, London, New York)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-xs"
            autoComplete="off"
            spellCheck={false}
            aria-autocomplete="list"
            aria-controls="location-suggestions-list"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setSearchError(null);
                inputRef.current?.focus();
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          disabled={!query.trim() || isSearching}
          className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 shadow-xs shrink-0 cursor-pointer"
        >
          Search
        </button>

        {/* Use My Location Button */}
        <button
          type="button"
          onClick={onUseMyLocation}
          disabled={isLoadingLocation}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-3 rounded-xl bg-white/95 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition-all shadow-xs shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          title="Use current GPS location"
          aria-label="Use My Location"
        >
          {isLoadingLocation ? (
            <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 text-sky-500 shrink-0" />
          )}
          <span className="hidden md:inline whitespace-nowrap">My Location</span>
        </button>
      </form>

      {/* Quick Switch City Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 flex items-center gap-1 text-[11px]">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Quick Switch:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={async () => {
              setQuery(city);
              setIsOpen(false);
              try {
                const results = await searchLocations(city);
                if (results.length > 0) {
                  handleSelect(results[0]);
                }
              } catch (e) {
                console.error(e);
              }
            }}
            className="px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shrink-0 shadow-2xs font-medium cursor-pointer"
          >
            {city}
          </button>
        ))}
      </div>

      {/* Geolocation or Search Error Banner */}
      {(locationError || (isOpen && searchError)) && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <span className="font-semibold shrink-0">Note:</span>
          <span>{locationError || searchError}</span>
        </div>
      )}

      {/* Suggestions and Recent Searches Popover */}
      {isOpen && (
        <div
          id="location-suggestions-list"
          role="listbox"
          className="absolute z-50 w-full max-w-3xl mt-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-sm divide-y divide-slate-100 dark:divide-slate-800"
        >
          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-1.5">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Matching Locations ({suggestions.length})
              </div>
              {suggestions.map((loc, idx) => (
                <button
                  key={`${loc.name}-${loc.latitude}-${loc.longitude}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(loc)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    selectedIndex === idx
                      ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                  role="option"
                  aria-selected={selectedIndex === idx}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-white truncate">
                      {loc.name}
                    </span>
                    {(loc.admin1 || loc.country) && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {loc.admin1 ? `${loc.admin1}, ` : ''}
                        {loc.country}
                      </span>
                    )}
                  </div>
                  {loc.countryCode && (
                    <span className="text-xs font-mono text-slate-400 uppercase ml-2 shrink-0">
                      {loc.countryCode}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && suggestions.length === 0 && !isSearching && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500">
                <span className="font-semibold uppercase tracking-wider">Recent Searches</span>
                <button
                  type="button"
                  onClick={onClearRecentSearches}
                  className="hover:text-rose-500 transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 px-2 py-1">
                {recentSearches.map((term, i) => (
                  <button
                    key={`${term}-${i}`}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      onSelectRecentSearch(term);
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
