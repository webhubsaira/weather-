/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GeoLocation,
  TempUnit,
  ThemeMode,
  UnitPreferences,
  WeatherDataBundle,
} from './types/weather';
import {
  DEFAULT_LOCATION,
  fetchWeatherData,
  reverseGeocode,
  searchLocations,
} from './services/weatherApi';
import {
  addRecentSearch,
  clearRecentSearches,
  getLastLocation,
  getRecentSearches,
  getSavedFavorites,
  getSavedTheme,
  getSavedUnits,
  saveFavorites,
  saveLastLocation,
  saveTheme,
  saveUnits,
} from './utils/localStorage';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { DynamicWeatherBackground } from './components/DynamicWeatherBackground';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { WeatherDetails } from './components/WeatherDetails';
import { SunriseSunsetCard } from './components/SunriseSunsetCard';
import { WeatherCharts } from './components/WeatherCharts';
import { AirQualityCard } from './components/AirQualityCard';
import { WeatherMap } from './components/WeatherMap';
import { WeatherAlerts } from './components/WeatherAlerts';
import { FavoriteLocations } from './components/FavoriteLocations';
import { ApiConfigModal } from './components/ApiConfigModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorMessage } from './components/ErrorMessage';
import { MapPin, Globe } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  // User Preferences
  const [theme, setTheme] = useState<ThemeMode>(getSavedTheme);
  const [units, setUnits] = useState<UnitPreferences>(getSavedUnits);
  const [favorites, setFavorites] = useState<GeoLocation[]>(getSavedFavorites);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches);

  // Weather & Location State (restores last viewed location or falls back to default)
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>(() => getLastLocation() || DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<WeatherDataBundle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

  // UI state
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  // Section references for smooth scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const hourlyRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const airQualityRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Apply dark theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  // Load weather data for a location
  const loadWeather = useCallback(async (location: GeoLocation, isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);

    setError(null);
    setLocationError(null);

    try {
      const bundle = await fetchWeatherData(location);
      setWeatherData(bundle);
      setCurrentLocation(bundle.location);
      saveLastLocation(bundle.location);
    } catch (err: any) {
      console.error('Failed to load weather:', err);
      setError(err?.message || 'Unable to retrieve weather data. Please check connection and try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load: uses last viewed location or default
  useEffect(() => {
    const initialLocation = getLastLocation() || DEFAULT_LOCATION;
    loadWeather(initialLocation);
  }, [loadWeather]);

  // Handle location selection from search or favorites
  const handleSelectLocation = (loc: GeoLocation) => {
    setRecentSearches(addRecentSearch(loc.name));
    loadWeather(loc);
  };

  // Handle "Use My Location" via Browser Geolocation API
  const handleUseMyLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please search manually.');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const resolved = await reverseGeocode(latitude, longitude);
          setRecentSearches(addRecentSearch(resolved.name));
          await loadWeather(resolved);
        } catch (err) {
          console.error('Failed reverse geocoding current location:', err);
          setLocationError('Unable to identify your city name from coordinates. Showing approximate weather.');
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (geoError) => {
        setIsLoadingLocation(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setLocationError('Location access was denied. You can search for your city manually.');
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          setLocationError('Location information is currently unavailable. Please try searching manually.');
        } else if (geoError.code === geoError.TIMEOUT) {
          setLocationError('Location request timed out. Please try searching manually.');
        } else {
          setLocationError('Could not determine current location. You can search for your city manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Toggle favorite status
  const isCurrentFavorite = favorites.some(
    (f) =>
      f.name.toLowerCase() === currentLocation.name.toLowerCase() &&
      f.country.toLowerCase() === currentLocation.country.toLowerCase()
  );

  const handleToggleFavorite = () => {
    let updated: GeoLocation[];
    if (isCurrentFavorite) {
      updated = favorites.filter(
        (f) =>
          !(
            f.name.toLowerCase() === currentLocation.name.toLowerCase() &&
            f.country.toLowerCase() === currentLocation.country.toLowerCase()
          )
      );
    } else {
      updated = [currentLocation, ...favorites];
    }
    setFavorites(updated);
    saveFavorites(updated);
  };

  const handleRemoveFavorite = (loc: GeoLocation) => {
    const updated = favorites.filter(
      (f) =>
        !(
          f.name.toLowerCase() === loc.name.toLowerCase() &&
          f.country.toLowerCase() === loc.country.toLowerCase()
        )
    );
    setFavorites(updated);
    saveFavorites(updated);
  };

  // Navigation scroll handling
  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;

    switch (sectionId) {
      case 'overview':
        targetRef = overviewRef;
        break;
      case 'hourly':
        targetRef = hourlyRef;
        break;
      case 'forecast':
        targetRef = forecastRef;
        break;
      case 'details':
        targetRef = detailsRef;
        break;
      case 'charts':
        targetRef = chartsRef;
        break;
      case 'radar':
        targetRef = radarRef;
        break;
      case 'airquality':
        targetRef = airQualityRef;
        break;
      case 'favorites':
        targetRef = favoritesRef;
        break;
      case 'about':
        targetRef = aboutRef;
        break;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Theme & Unit switching
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleTempUnit = () => {
    const nextUnit: TempUnit = units.temperature === 'C' ? 'F' : 'C';
    const updatedUnits = { ...units, temperature: nextUnit };
    setUnits(updatedUnits);
    saveUnits(updatedUnits);
  };

  const handleUpdateUnits = (newUnits: UnitPreferences) => {
    setUnits(newUnits);
    saveUnits(newUnits);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Dynamic weather background reflecting condition, day/night, and dark mode */}
      <DynamicWeatherBackground
        weatherCode={weatherData?.current.weatherCode ?? 0}
        isDay={weatherData?.current.isDay ?? true}
        isDarkTheme={theme === 'dark'}
      />

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        tempUnit={units.temperature}
        onToggleTempUnit={handleToggleTempUnit}
        onOpenSettings={() => setShowSettingsModal(true)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setShowFavoritesModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Search Bar Section with Quick Switch Chips */}
        <section className="relative z-30" aria-label="Search and Geolocation">
          <SearchBar
            onSelectLocation={handleSelectLocation}
            onUseMyLocation={handleUseMyLocation}
            isLoadingLocation={isLoadingLocation}
            recentSearches={recentSearches}
            onSelectRecentSearch={async (query) => {
              try {
                const results = await searchLocations(query);
                if (results.length > 0) {
                  handleSelectLocation(results[0]);
                }
              } catch (e) {
                console.error(e);
              }
            }}
            onClearRecentSearches={() => {
              clearRecentSearches();
              setRecentSearches([]);
            }}
            locationError={locationError}
            currentLocation={currentLocation}
          />
        </section>

        {/* Severe Weather Alerts Banner */}
        {weatherData && weatherData.alerts.length > 0 && (
          <WeatherAlerts alerts={weatherData.alerts} />
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {!isLoading && error && (
          <ErrorMessage
            message={error}
            onRetry={() => loadWeather(currentLocation)}
            onSearchDefault={() => loadWeather(DEFAULT_LOCATION)}
          />
        )}

        {/* Loaded Weather Presentation */}
        {!isLoading && weatherData && (
          <>
            {/* Overview / Hero Card */}
            <div ref={overviewRef} className="scroll-mt-20">
              <CurrentWeatherCard
                weather={weatherData.current}
                location={weatherData.location}
                tempUnit={units.temperature}
                windUnit={units.wind}
                visibilityUnit={units.visibility}
                isFavorite={isCurrentFavorite}
                onToggleFavorite={handleToggleFavorite}
                onRefresh={() => loadWeather(currentLocation, true)}
                isRefreshing={isRefreshing}
              />
            </div>

            {/* Hourly Forecast */}
            <div ref={hourlyRef} className="scroll-mt-20">
              <HourlyForecast
                hourly={weatherData.hourly}
                tempUnit={units.temperature}
              />
            </div>

            {/* Split Grid: 7-Day Forecast & Sunrise/Sunset (Both match height seamlessly without dead space) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* 7-Day Forecast (8 cols on large screens) */}
              <div ref={forecastRef} className="lg:col-span-8 scroll-mt-20 h-full">
                <DailyForecast
                  daily={weatherData.daily}
                  tempUnit={units.temperature}
                  windUnit={units.wind}
                />
              </div>

              {/* Sunrise, Sunset & Daylight Insights (4 cols on large screens, matching height) */}
              <div className="lg:col-span-4 h-full">
                <SunriseSunsetCard
                  sunrise={weatherData.current.sunrise}
                  sunset={weatherData.current.sunset}
                  daylightDuration={weatherData.current.daylightDuration}
                  timezone={weatherData.location.timezone}
                  uvIndex={weatherData.current.uvIndex}
                  isDay={weatherData.current.isDay}
                />
              </div>
            </div>

            {/* Dedicated Weather Details Grid */}
            <div ref={detailsRef} className="scroll-mt-20">
              <WeatherDetails
                weather={weatherData.current}
                windUnit={units.wind}
                visibilityUnit={units.visibility}
              />
            </div>

            {/* Interactive Trend Charts */}
            <div ref={chartsRef} className="scroll-mt-20">
              <WeatherCharts
                hourly={weatherData.hourly}
                tempUnit={units.temperature}
                windUnit={units.wind}
              />
            </div>

            {/* Air Quality Section */}
            <div ref={airQualityRef} className="scroll-mt-20">
              <AirQualityCard airQuality={weatherData.airQuality} />
            </div>

            {/* Interactive Weather Map with RainViewer Radar */}
            <div ref={radarRef} className="scroll-mt-20">
              <WeatherMap location={weatherData.location} />
            </div>

            {/* Saved Locations Section */}
            <div ref={favoritesRef} className="scroll-mt-20">
              <FavoriteLocations
                favorites={favorites}
                currentLocation={currentLocation}
                onSelectLocation={handleSelectLocation}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </div>

            {/* Advanced Coordinates & Location Details */}
            <div className="rounded-xl p-3.5 bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>
                  Coordinates: {weatherData.location.latitude.toFixed(4)}°N,{' '}
                  {weatherData.location.longitude.toFixed(4)}°E
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>Timezone: {weatherData.location.timezone}</span>
              </div>
              <div>
                <span>Last updated: {weatherData.current.localTime}</span>
              </div>
            </div>

            {/* About & Privacy Section */}
            <div ref={aboutRef} className="scroll-mt-20">
              <AboutSection />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectSection={handleSelectSection} />

      {/* Settings & API Config Modal */}
      <ApiConfigModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        units={units}
        onUpdateUnits={handleUpdateUnits}
      />

      {/* Saved Locations Modal (if opened from navbar) */}
      {showFavoritesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <FavoriteLocations
              favorites={favorites}
              currentLocation={currentLocation}
              onSelectLocation={(loc) => {
                handleSelectLocation(loc);
                setShowFavoritesModal(false);
              }}
              onRemoveFavorite={handleRemoveFavorite}
              onClose={() => setShowFavoritesModal(false)}
            />
          </div>
        </div>
      )}

      {/* Vercel Speed Insights */}
      <SpeedInsights />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
