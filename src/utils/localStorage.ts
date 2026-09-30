import { GeoLocation, TempUnit, ThemeMode, UnitPreferences } from '../types/weather';

const STORAGE_KEYS = {
  THEME: 'weathernow_theme',
  UNITS: 'weathernow_units',
  FAVORITES: 'weathernow_favorites',
  RECENT_SEARCHES: 'weathernow_recent_searches',
  LAST_LOCATION: 'weathernow_last_location',
  API_KEY: 'weathernow_api_key',
};

export const DEFAULT_UNITS: UnitPreferences = {
  temperature: 'C',
  wind: 'km/h',
  visibility: 'km',
  pressure: 'hPa',
};

export function getSavedTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.warn('Could not read theme from localStorage:', e);
  }
  return 'light';
}

export function saveTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.warn('Could not save theme:', e);
  }
}

export function getSavedUnits(): UnitPreferences {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.UNITS);
    if (saved) {
      return { ...DEFAULT_UNITS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read units from localStorage:', e);
  }
  return DEFAULT_UNITS;
}

export function saveUnits(units: UnitPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(units));
  } catch (e) {
    console.warn('Could not save units:', e);
  }
}

export function getSavedFavorites(): GeoLocation[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not read favorites from localStorage:', e);
  }
  return [
    {
      name: 'Lahore',
      admin1: 'Punjab',
      country: 'Pakistan',
      latitude: 31.5497,
      longitude: 74.3436,
      timezone: 'Asia/Karachi',
    },
    {
      name: 'Islamabad',
      admin1: 'Islamabad Capital Territory',
      country: 'Pakistan',
      latitude: 33.6844,
      longitude: 73.0479,
      timezone: 'Asia/Karachi',
    },
    {
      name: 'London',
      admin1: 'England',
      country: 'United Kingdom',
      latitude: 51.5074,
      longitude: -0.1278,
      timezone: 'Europe/London',
    },
    {
      name: 'Tokyo',
      admin1: 'Tokyo',
      country: 'Japan',
      latitude: 35.6762,
      longitude: 139.6503,
      timezone: 'Asia/Tokyo',
    },
  ];
}

export function saveFavorites(favorites: GeoLocation[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (e) {
    console.warn('Could not save favorites:', e);
  }
}

export function getRecentSearches(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not read recent searches:', e);
  }
  return ['Lahore', 'Islamabad', 'Karachi', 'London', 'New York'];
}

export function addRecentSearch(search: string): string[] {
  const current = getRecentSearches();
  const trimmed = search.trim();
  if (!trimmed) return current;

  const filtered = current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
  const updated = [trimmed, ...filtered].slice(0, 8);
  try {
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save recent search:', e);
  }
  return updated;
}

export function clearRecentSearches(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  } catch (e) {
    console.warn('Could not clear recent searches:', e);
  }
}

export function getLastLocation(): GeoLocation | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Could not read last location:', e);
  }
  return null;
}

export function saveLastLocation(loc: GeoLocation): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(loc));
  } catch (e) {
    console.warn('Could not save last location:', e);
  }
}

export function getCustomApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  } catch {
    return '';
  }
}

export function saveCustomApiKey(key: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
  } catch (e) {
    console.warn('Could not save api key:', e);
  }
}
