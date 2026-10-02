import React from 'react';
import { getWeatherInfo } from '../utils/weatherCodes';

interface DynamicWeatherBackgroundProps {
  weatherCode: number;
  isDay: boolean;
  isDarkTheme: boolean;
}

export const DynamicWeatherBackground: React.FC<DynamicWeatherBackgroundProps> = ({
  weatherCode,
  isDay,
  isDarkTheme,
}) => {
  const info = getWeatherInfo(weatherCode, isDay);

  // When user is in light mode, ALWAYS provide a clean, high-contrast, fully light background
  if (!isDarkTheme) {
    return (
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-all duration-500 overflow-hidden bg-gradient-to-b from-sky-50 via-slate-50 to-slate-100"
        aria-hidden="true"
      >
        {/* Soft ambient daytime atmospheric glow */}
        <div className="absolute -top-24 right-10 w-[550px] h-[550px] bg-sky-200/35 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-slate-200/40 rounded-full blur-[120px]" />

        {/* Rain or cloudy subtle accents in light theme */}
        {(info.category === 'rain' || info.category === 'drizzle') && (
          <div className="absolute inset-0 bg-blue-100/20 backdrop-blur-[0.5px]" />
        )}
        {info.category === 'cloudy' && (
          <div className="absolute top-0 inset-x-0 h-[400px] bg-slate-200/40 blur-[80px]" />
        )}
      </div>
    );
  }

  // Dark mode: Celestial stars & deep atmospheric glow
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 transition-all duration-500 overflow-hidden bg-gradient-to-b from-[#030712] via-[#0b1329] to-[#020617]"
      aria-hidden="true"
    >
      {/* Subtle star field dots */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#93c5fd_1.5px,transparent_1.5px)] [background-size:64px_64px]" />

      {/* Deep celestial atmospheric lights */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[130px]" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[400px] rounded-full bg-blue-700/10 blur-[140px]" />

      {/* Thunderstorm ambient lightning highlight */}
      {info.category === 'thunderstorm' && (
        <div className="absolute top-0 inset-x-0 h-[500px] bg-purple-900/25 blur-[100px]" />
      )}
    </div>
  );
};
