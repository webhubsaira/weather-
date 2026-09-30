import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  LucideProps,
} from 'lucide-react';
import { getWeatherInfo } from '../utils/weatherCodes';

interface WeatherIconProps extends LucideProps {
  code: number;
  isDay?: boolean;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  className = '',
  size = 24,
  ...props
}) => {
  const info = getWeatherInfo(code, isDay);

  switch (info.iconName) {
    case 'Sun':
      return <Sun size={size} className={`text-amber-500 shrink-0 ${className}`} {...props} />;
    case 'Moon':
      return <Moon size={size} className={`text-indigo-400 shrink-0 ${className}`} {...props} />;
    case 'CloudSun':
      return <CloudSun size={size} className={`text-amber-400 shrink-0 ${className}`} {...props} />;
    case 'CloudMoon':
      return <CloudMoon size={size} className={`text-indigo-300 shrink-0 ${className}`} {...props} />;
    case 'Cloud':
      return <Cloud size={size} className={`text-slate-400 shrink-0 ${className}`} {...props} />;
    case 'CloudFog':
      return <CloudFog size={size} className={`text-slate-400 shrink-0 ${className}`} {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle size={size} className={`text-cyan-400 shrink-0 ${className}`} {...props} />;
    case 'CloudRain':
      return <CloudRain size={size} className={`text-sky-500 shrink-0 ${className}`} {...props} />;
    case 'CloudSnow':
      return <CloudSnow size={size} className={`text-sky-300 shrink-0 ${className}`} {...props} />;
    case 'Snowflake':
      return <Snowflake size={size} className={`text-cyan-300 shrink-0 ${className}`} {...props} />;
    case 'CloudLightning':
      return <CloudLightning size={size} className={`text-amber-400 shrink-0 ${className}`} {...props} />;
    default:
      return isDay ? (
        <Sun size={size} className={`text-amber-500 shrink-0 ${className}`} {...props} />
      ) : (
        <Moon size={size} className={`text-indigo-400 shrink-0 ${className}`} {...props} />
      );
  }
};
