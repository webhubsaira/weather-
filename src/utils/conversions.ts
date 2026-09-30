import { AirQualityData, TempUnit, VisibilityUnit, WindUnit } from '../types/weather';

export function cToF(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function fToC(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export function formatTemp(celsius: number, unit: TempUnit): string {
  const val = unit === 'F' ? cToF(celsius) : Math.round(celsius);
  return `${val}°${unit}`;
}

export function formatTempNum(celsius: number, unit: TempUnit): number {
  return unit === 'F' ? cToF(celsius) : Math.round(celsius);
}

export function kmhToMph(kmh: number): number {
  return Math.round(kmh * 0.621371);
}

export function formatWindSpeed(kmh: number, unit: WindUnit): string {
  if (unit === 'mph') {
    return `${kmhToMph(kmh)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function formatVisibility(km: number, unit: VisibilityUnit): string {
  if (unit === 'miles') {
    const mi = (km * 0.621371).toFixed(1);
    return `${mi} mi`;
  }
  return `${km.toFixed(1)} km`;
}

export function getWindDirectionName(deg: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.round(((deg % 360) / 22.5)) % 16;
  return directions[index];
}

export function getUvCategory(uv: number): { label: string; color: string; level: number } {
  if (uv <= 2) return { label: 'Low', color: 'text-emerald-500', level: 1 };
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-500', level: 2 };
  if (uv <= 7) return { label: 'High', color: 'text-amber-500', level: 3 };
  if (uv <= 10) return { label: 'Very High', color: 'text-rose-500', level: 4 };
  return { label: 'Extreme', color: 'text-purple-500', level: 5 };
}

export function getAqiCategory(usAqi: number): {
  category: string;
  color: string;
  badgeBg: string;
  description: string;
} {
  if (usAqi <= 50) {
    return {
      category: 'Good',
      color: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    };
  }
  if (usAqi <= 100) {
    return {
      category: 'Moderate',
      color: 'text-yellow-500',
      badgeBg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
      description: 'Air quality is acceptable. Sensitive individuals may experience minor symptoms.',
    };
  }
  if (usAqi <= 150) {
    return {
      category: 'Unhealthy for Sensitive Groups',
      color: 'text-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      description: 'Members of sensitive groups may experience health effects. General public not likely affected.',
    };
  }
  if (usAqi <= 200) {
    return {
      category: 'Unhealthy',
      color: 'text-rose-500',
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
    };
  }
  if (usAqi <= 300) {
    return {
      category: 'Very Unhealthy',
      color: 'text-purple-500',
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      description: 'Health alert: The risk of health effects is increased for everyone.',
    };
  }
  return {
    category: 'Hazardous',
    color: 'text-red-700',
    badgeBg: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
  };
}
