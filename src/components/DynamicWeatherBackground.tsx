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

  // Determine ambient background theme
  const isNightLook = !isDay || isDarkTheme;

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 transition-all duration-700 overflow-hidden ${
        isNightLook
          ? 'bg-gradient-to-b from-[#030712] via-[#0b1329] to-[#020617]'
          : 'bg-gradient-to-b from-sky-50 via-slate-50 to-white'
      }`}
      aria-hidden="true"
    >
      {/* Night Sky: Subtle stars and ambient glow */}
      {isNightLook && (
        <>
          {/* Subtle star field dots */}
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#93c5fd_1.5px,transparent_1.5px)] [background-size:64px_64px]" />

          {/* Deep celestial atmospheric nebula lights */}
          <div className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]" />
          <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[130px]" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[400px] rounded-full bg-blue-700/10 blur-[140px]" />
        </>
      )}

      {/* Daytime Sun & Weather Ambient */}
      {!isNightLook && (
        <>
          {info.category === 'clear' && (
            <>
              <div className="absolute -top-20 right-10 w-[550px] h-[550px] bg-amber-200/25 rounded-full blur-[100px]" />
              <div className="absolute top-40 left-10 w-[450px] h-[450px] bg-sky-200/25 rounded-full blur-[100px]" />
            </>
          )}

          {(info.category === 'rain' || info.category === 'drizzle') && (
            <div className="absolute inset-0 bg-slate-300/10 backdrop-blur-[0.5px]" />
          )}

          {info.category === 'cloudy' && (
            <div className="absolute top-0 inset-x-0 h-[400px] bg-slate-200/30 blur-[80px]" />
          )}
        </>
      )}

      {/* Thunderstorm ambient lightning highlight */}
      {info.category === 'thunderstorm' && (
        <div className="absolute top-0 inset-x-0 h-[500px] bg-purple-900/20 blur-[100px]" />
      )}
    </div>
  );
};
