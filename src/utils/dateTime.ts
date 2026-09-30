/**
 * Helpers for formatting local date, time, and daylight arc using location timezone
 */

export function getLocalTimeString(dateInput: Date | string | number, timezone: string): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    const d = new Date(dateInput);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
}

export function getLocalDateString(dateInput: Date | string | number, timezone: string): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(d);
  } catch {
    const d = new Date(dateInput);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
}

export function getLocalDayName(dateString: string, timezone: string): string {
  try {
    const d = new Date(dateString + 'T12:00:00Z');
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
    }).format(d);
  } catch {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }
}

export function formatDaylightDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

/**
 * Calculates current sun progress along the daylight arc (0 = sunrise, 1 = sunset, or night)
 */
export function calculateSunPosition(
  sunriseIso: string,
  sunsetIso: string,
  currentTime = new Date()
): {
  progress: number; // 0 to 1
  isDaytime: boolean;
  message: string;
} {
  const sunrise = new Date(sunriseIso).getTime();
  const sunset = new Date(sunsetIso).getTime();
  const now = currentTime.getTime();

  if (now < sunrise) {
    const diffMin = Math.round((sunrise - now) / (1000 * 60));
    return {
      progress: 0,
      isDaytime: false,
      message: `Sunrise in ${Math.floor(diffMin / 60)}h ${diffMin % 60}m`,
    };
  }

  if (now > sunset) {
    return {
      progress: 1,
      isDaytime: false,
      message: 'Sun has set',
    };
  }

  const total = sunset - sunrise;
  const elapsed = now - sunrise;
  const progress = Math.min(1, Math.max(0, elapsed / total));
  const diffMin = Math.round((sunset - now) / (1000 * 60));

  return {
    progress,
    isDaytime: true,
    message: `Sunset in ${Math.floor(diffMin / 60)}h ${diffMin % 60}m`,
  };
}
