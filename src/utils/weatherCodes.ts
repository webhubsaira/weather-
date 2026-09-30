export interface WeatherCodeInfo {
  label: string;
  iconName: string;
  category: 'clear' | 'partlyCloudy' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  backgroundGradient: {
    day: string;
    night: string;
  };
}

// WMO Weather interpretation codes (WW)
export const WMO_CODE_MAP: Record<number, WeatherCodeInfo> = {
  0: {
    label: 'Clear Sky',
    iconName: 'Sun',
    category: 'clear',
    backgroundGradient: {
      day: 'from-amber-500/10 via-sky-500/10 to-blue-500/5',
      night: 'from-indigo-950/40 via-slate-900/60 to-slate-950',
    },
  },
  1: {
    label: 'Mainly Clear',
    iconName: 'Sun',
    category: 'clear',
    backgroundGradient: {
      day: 'from-amber-400/10 via-sky-500/10 to-blue-600/5',
      night: 'from-indigo-950/40 via-slate-900/60 to-slate-950',
    },
  },
  2: {
    label: 'Partly Cloudy',
    iconName: 'CloudSun',
    category: 'partlyCloudy',
    backgroundGradient: {
      day: 'from-sky-400/15 via-blue-500/10 to-slate-500/5',
      night: 'from-slate-900/60 via-slate-900/40 to-slate-950',
    },
  },
  3: {
    label: 'Overcast',
    iconName: 'Cloud',
    category: 'cloudy',
    backgroundGradient: {
      day: 'from-slate-400/20 via-zinc-400/10 to-slate-500/10',
      night: 'from-slate-950 via-zinc-900/70 to-slate-950',
    },
  },
  45: {
    label: 'Foggy',
    iconName: 'CloudFog',
    category: 'fog',
    backgroundGradient: {
      day: 'from-slate-300/25 via-zinc-300/15 to-slate-400/10',
      night: 'from-slate-900/70 via-zinc-900/60 to-slate-950',
    },
  },
  48: {
    label: 'Depositing Rime Fog',
    iconName: 'CloudFog',
    category: 'fog',
    backgroundGradient: {
      day: 'from-cyan-200/20 via-slate-300/15 to-slate-400/10',
      night: 'from-slate-900/80 via-zinc-900/70 to-slate-950',
    },
  },
  51: {
    label: 'Light Drizzle',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    backgroundGradient: {
      day: 'from-cyan-500/15 via-blue-500/10 to-slate-500/10',
      night: 'from-cyan-950/30 via-slate-900/60 to-slate-950',
    },
  },
  53: {
    label: 'Moderate Drizzle',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    backgroundGradient: {
      day: 'from-cyan-500/20 via-blue-500/15 to-slate-500/10',
      night: 'from-cyan-950/40 via-slate-900/70 to-slate-950',
    },
  },
  55: {
    label: 'Dense Drizzle',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    backgroundGradient: {
      day: 'from-cyan-600/25 via-blue-600/15 to-slate-600/10',
      night: 'from-cyan-950/50 via-slate-900/80 to-slate-950',
    },
  },
  56: {
    label: 'Light Freezing Drizzle',
    iconName: 'CloudSnow',
    category: 'drizzle',
    backgroundGradient: {
      day: 'from-cyan-300/20 via-sky-400/15 to-blue-500/10',
      night: 'from-sky-950/50 via-slate-900/80 to-slate-950',
    },
  },
  57: {
    label: 'Dense Freezing Drizzle',
    iconName: 'CloudSnow',
    category: 'drizzle',
    backgroundGradient: {
      day: 'from-cyan-300/25 via-sky-400/20 to-blue-600/15',
      night: 'from-sky-950/60 via-slate-900/80 to-slate-950',
    },
  },
  61: {
    label: 'Slight Rain',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: {
      day: 'from-blue-500/15 via-sky-500/10 to-slate-500/10',
      night: 'from-blue-950/40 via-slate-900/70 to-slate-950',
    },
  },
  63: {
    label: 'Moderate Rain',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: {
      day: 'from-blue-600/20 via-sky-600/15 to-slate-600/15',
      night: 'from-blue-950/50 via-slate-900/80 to-slate-950',
    },
  },
  65: {
    label: 'Heavy Rain',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: {
      day: 'from-blue-700/25 via-indigo-700/20 to-slate-700/20',
      night: 'from-blue-950/70 via-indigo-950/60 to-slate-950',
    },
  },
  66: {
    label: 'Light Freezing Rain',
    iconName: 'CloudSnow',
    category: 'rain',
    backgroundGradient: {
      day: 'from-cyan-400/20 via-blue-500/15 to-slate-600/15',
      night: 'from-cyan-950/60 via-slate-900/80 to-slate-950',
    },
  },
  67: {
    label: 'Heavy Freezing Rain',
    iconName: 'CloudSnow',
    category: 'rain',
    backgroundGradient: {
      day: 'from-cyan-500/25 via-blue-600/20 to-slate-700/20',
      night: 'from-cyan-950/70 via-slate-900/90 to-slate-950',
    },
  },
  71: {
    label: 'Slight Snow Fall',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: {
      day: 'from-sky-200/20 via-indigo-200/15 to-slate-300/10',
      night: 'from-slate-800/50 via-slate-900/80 to-slate-950',
    },
  },
  73: {
    label: 'Moderate Snow Fall',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: {
      day: 'from-sky-200/30 via-indigo-200/20 to-slate-300/20',
      night: 'from-slate-800/60 via-slate-900/80 to-slate-950',
    },
  },
  75: {
    label: 'Heavy Snow Fall',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: {
      day: 'from-sky-100/40 via-indigo-100/30 to-slate-200/30',
      night: 'from-slate-800/70 via-slate-900/90 to-slate-950',
    },
  },
  77: {
    label: 'Snow Grains',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: {
      day: 'from-sky-200/20 via-indigo-200/15 to-slate-300/10',
      night: 'from-slate-800/50 via-slate-900/80 to-slate-950',
    },
  },
  80: {
    label: 'Slight Rain Showers',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: {
      day: 'from-blue-400/20 via-sky-400/15 to-slate-500/10',
      night: 'from-blue-950/40 via-slate-900/70 to-slate-950',
    },
  },
  81: {
    label: 'Moderate Rain Showers',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: {
      day: 'from-blue-500/25 via-sky-500/20 to-slate-600/15',
      night: 'from-blue-950/50 via-slate-900/80 to-slate-950',
    },
  },
  82: {
    label: 'Violent Rain Showers',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: {
      day: 'from-blue-700/30 via-indigo-700/25 to-slate-700/25',
      night: 'from-blue-950/80 via-indigo-950/70 to-slate-950',
    },
  },
  85: {
    label: 'Slight Snow Showers',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: {
      day: 'from-sky-200/25 via-indigo-200/20 to-slate-300/15',
      night: 'from-slate-800/60 via-slate-900/80 to-slate-950',
    },
  },
  86: {
    label: 'Heavy Snow Showers',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: {
      day: 'from-sky-100/35 via-indigo-100/25 to-slate-200/25',
      night: 'from-slate-800/70 via-slate-900/90 to-slate-950',
    },
  },
  95: {
    label: 'Thunderstorm',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    backgroundGradient: {
      day: 'from-amber-600/20 via-purple-700/20 to-slate-800/20',
      night: 'from-purple-950/70 via-indigo-950/70 to-slate-950',
    },
  },
  96: {
    label: 'Thunderstorm with Slight Hail',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    backgroundGradient: {
      day: 'from-amber-600/25 via-purple-700/25 to-slate-800/25',
      night: 'from-purple-950/80 via-indigo-950/80 to-slate-950',
    },
  },
  99: {
    label: 'Thunderstorm with Heavy Hail',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    backgroundGradient: {
      day: 'from-rose-600/25 via-purple-800/30 to-slate-900/30',
      night: 'from-purple-950/90 via-slate-950 to-slate-950',
    },
  },
};

export function getWeatherInfo(code: number, isDay = true): WeatherCodeInfo {
  const match = WMO_CODE_MAP[code];
  if (match) {
    if (!isDay && (code === 0 || code === 1)) {
      return {
        ...match,
        label: code === 0 ? 'Clear Night' : 'Mainly Clear Night',
        iconName: 'Moon',
      };
    }
    if (!isDay && code === 2) {
      return {
        ...match,
        iconName: 'CloudMoon',
      };
    }
    return match;
  }
  return {
    label: 'Partly Cloudy',
    iconName: isDay ? 'Sun' : 'Moon',
    category: 'partlyCloudy',
    backgroundGradient: {
      day: 'from-sky-400/10 via-blue-500/5 to-slate-500/5',
      night: 'from-slate-900/60 via-slate-900/40 to-slate-950',
    },
  };
}
