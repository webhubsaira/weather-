import React, { useState } from 'react';
import { Sun, Moon, Settings, Menu, X, CloudSun, Bookmark } from 'lucide-react';
import { TempUnit, ThemeMode } from '../types/weather';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  tempUnit: TempUnit;
  onToggleTempUnit: () => void;
  onOpenSettings: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  tempUnit,
  onToggleTempUnit,
  onOpenSettings,
  activeSection,
  onSelectSection,
  favoritesCount,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'hourly', label: 'Hourly' },
    { id: 'forecast', label: '7-Day' },
    { id: 'details', label: 'Details' },
    { id: 'charts', label: 'Trends' },
    { id: 'radar', label: 'Radar' },
    { id: 'airquality', label: 'Air Quality' },
    { id: 'faq', label: 'FAQ' },
    { id: 'guide', label: 'Guide' },
  ];

  const handleLinkClick = (id: string) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/90 dark:border-slate-800/90 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4 w-full">
        {/* Zone 1: Wordmark Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl py-1 px-1 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="WeatherNow Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xs shadow-sky-500/30">
              <CloudSun className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              Weather<span className="text-sky-500">Now</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Saved, Unit Switch, Theme Switch, Settings, Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Bookmark / Saved Button */}
          <button
            type="button"
            onClick={onOpenFavorites}
            className="flex items-center gap-1.5 h-9 px-2 sm:px-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            title="Saved Locations"
            aria-label={`View ${favoritesCount} saved locations`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span className="hidden sm:inline">Saved</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {favoritesCount}
            </span>
          </button>

          {/* Temperature Unit Segmented Switch */}
          <div
            className="flex items-center h-9 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-semibold shadow-xs"
            role="group"
            aria-label="Temperature Unit Switch"
          >
            <button
              type="button"
              onClick={() => tempUnit !== 'C' && onToggleTempUnit()}
              className={`h-full px-2 sm:px-2.5 rounded-lg transition-all cursor-pointer ${
                tempUnit === 'C'
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={tempUnit === 'C'}
              aria-label="Switch to Celsius"
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => tempUnit !== 'F' && onToggleTempUnit()}
              className={`h-full px-2 sm:px-2.5 rounded-lg transition-all cursor-pointer ${
                tempUnit === 'F'
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={tempUnit === 'F'}
              aria-label="Switch to Fahrenheit"
            >
              °F
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all shadow-xs cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Settings / Preferences Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all shadow-xs cursor-pointer"
            aria-label="Display and unit preferences"
            title="Preferences & Units"
          >
            <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all shadow-xs cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              onOpenFavorites();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500" />
              Saved Locations
            </span>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
              {favoritesCount}
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
