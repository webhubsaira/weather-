import {
  AirQualityData,
  CurrentWeather,
  DailyForecastItem,
  GeoLocation,
  HourlyForecastItem,
  WeatherAlert,
  WeatherDataBundle,
} from '../types/weather';
import { getAqiCategory, getUvCategory } from '../utils/conversions';
import { getLocalDateString, getLocalDayName, getLocalTimeString } from '../utils/dateTime';
import { getWeatherInfo } from '../utils/weatherCodes';

// Default initial location if none requested
export const DEFAULT_LOCATION: GeoLocation = {
  id: 1172451,
  name: 'Lahore',
  admin1: 'Punjab',
  country: 'Pakistan',
  countryCode: 'PK',
  latitude: 31.5497,
  longitude: 74.3436,
  timezone: 'Asia/Karachi',
};

/**
 * Search locations using Open-Meteo Geocoding API
 */
export async function searchLocations(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=8&language=en&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Geocoding failed with status ${res.status}`);
    }
    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      admin1: item.admin1 || item.admin2 || '',
      country: item.country || '',
      countryCode: item.country_code || '',
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone || 'auto',
      elevation: item.elevation,
    }));
  } catch (error) {
    console.error('Failed to search locations:', error);
    throw error;
  }
}

/**
 * Reverse geocode latitude and longitude to get city and country names
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<GeoLocation> {
  try {
    // Free, client-friendly reverse geocoding
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const name = data.city || data.locality || data.principalSubdivision || 'Your Location';
      const admin1 = data.principalSubdivision || '';
      const country = data.countryName || '';
      const countryCode = data.countryCode || '';
      return {
        name,
        admin1,
        country,
        countryCode,
        latitude,
        longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto',
      };
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode error, falling back:', err);
  }

  // Fallback representation
  return {
    name: 'Current Location',
    admin1: '',
    country: '',
    latitude,
    longitude,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto',
  };
}

/**
 * Synthesizes alerts from severe weather triggers in forecast data
 */
function deriveWeatherAlerts(
  current: any,
  daily: any,
  hourly: any,
  timezone: string
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];

  // Wind warning
  if (current.wind_speed_10m >= 55 || current.wind_gusts_10m >= 70) {
    alerts.push({
      id: 'alert-wind',
      title: 'High Wind Warning',
      severity: current.wind_speed_10m >= 75 ? 'emergency' : 'warning',
      headline: `Gusts reaching up to ${Math.round(current.wind_gusts_10m || current.wind_speed_10m)} km/h.`,
      description: 'Strong gusts can break tree branches, dislodge loose outdoor objects, and create hazardous driving conditions for high-profile vehicles.',
      startTime: 'Active Now',
      endTime: 'Valid next 6 hours',
      source: 'Meteorological Detection Engine',
    });
  }

  // Thunderstorm / Severe Rain
  if ([95, 96, 99].includes(current.weather_code) || current.precipitation >= 15) {
    alerts.push({
      id: 'alert-storm',
      title: 'Severe Thunderstorm & Rainfall Alert',
      severity: 'warning',
      headline: 'Heavy downpours, localized lightning, and localized ponding expected.',
      description: 'Seek sturdy indoor shelter. Avoid driving through water-covered roads and keep away from open water and tall isolated trees.',
      startTime: 'Active Now',
      endTime: 'Valid next 4 hours',
      source: 'Severe Weather Warning System',
    });
  }

  // Extreme Heat Advisory
  if (current.temperature_2m >= 40 || current.apparent_temperature >= 42) {
    alerts.push({
      id: 'alert-heat',
      title: 'Excessive Heat Advisory',
      severity: 'warning',
      headline: `Heat index hovering near ${Math.round(current.apparent_temperature)}°C.`,
      description: 'Drink plenty of fluids, stay in an air-conditioned room, stay out of the sun, and check up on relatives and neighbors.',
      startTime: 'Active Now',
      endTime: 'Valid until late evening',
      source: 'Public Health & Meteorological Alert',
    });
  }

  // Freezing / Frost Warning
  if (current.temperature_2m <= 0 && current.precipitation > 0) {
    alerts.push({
      id: 'alert-ice',
      title: 'Freezing Precipitation & Icy Road Warning',
      severity: 'warning',
      headline: 'Sub-zero temperatures with precipitation creating slick icy conditions.',
      description: 'Exercise extreme caution when walking or driving. Black ice may form quickly on untreated overpasses, bridges, and shaded paths.',
      startTime: 'Active Now',
      endTime: 'Valid through tomorrow morning',
      source: 'Winter Weather Monitoring',
    });
  }

  return alerts;
}

/**
 * Fetch full weather data bundle for a given location
 */
export async function fetchWeatherData(location: GeoLocation): Promise<WeatherDataBundle> {
  const tz = location.timezone && location.timezone !== 'auto' ? location.timezone : 'auto';

  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,is_day,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=${encodeURIComponent(
    tz
  )}&forecast_days=8`;

  const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=${encodeURIComponent(
    tz
  )}`;

  // Parallel requests with resilient handling
  const [forecastRes, airRes] = await Promise.allSettled([
    fetch(forecastUrl),
    fetch(airQualityUrl),
  ]);

  if (forecastRes.status === 'rejected' || !forecastRes.value.ok) {
    throw new Error('Weather data service is currently unavailable. Please try again in a moment.');
  }

  const forecastData = await forecastRes.value.json();
  const resolvedTimezone = forecastData.timezone || location.timezone || 'UTC';

  // Process air quality
  let airQuality: AirQualityData | null = null;
  if (airRes.status === 'fulfilled' && airRes.value.ok) {
    try {
      const airData = await airRes.value.json();
      const curr = airData.current || {};
      const usAqi = Math.round(curr.us_aqi ?? curr.european_aqi ?? 35);
      const aqiInfo = getAqiCategory(usAqi);

      airQuality = {
        europeanAqi: Math.round(curr.european_aqi ?? 20),
        usAqi,
        category: aqiInfo.category,
        color: aqiInfo.color,
        description: aqiInfo.description,
        pm25: curr.pm2_5 ? Number(curr.pm2_5.toFixed(1)) : 12,
        pm10: curr.pm10 ? Number(curr.pm10.toFixed(1)) : 22,
        co: curr.carbon_monoxide ? Number(curr.carbon_monoxide.toFixed(1)) : 240,
        no2: curr.nitrogen_dioxide ? Number(curr.nitrogen_dioxide.toFixed(1)) : 18,
        so2: curr.sulphur_dioxide ? Number(curr.sulphur_dioxide.toFixed(1)) : 6,
        o3: curr.ozone ? Number(curr.ozone.toFixed(1)) : 45,
      };
    } catch (err) {
      console.warn('Failed parsing air quality data:', err);
    }
  }

  const currentRaw = forecastData.current || {};
  const dailyRaw = forecastData.daily || {};
  const hourlyRaw = forecastData.hourly || {};

  // Current weather
  const weatherCode = currentRaw.weather_code ?? 0;
  const isDay = currentRaw.is_day === 1;
  const weatherInfo = getWeatherInfo(weatherCode, isDay);

  const todaySunrise = dailyRaw.sunrise?.[0] || new Date().toISOString();
  const todaySunset = dailyRaw.sunset?.[0] || new Date().toISOString();
  const daylightDuration = Math.round(
    (new Date(todaySunset).getTime() - new Date(todaySunrise).getTime()) / 1000
  );

  const uvMax = dailyRaw.uv_index_max?.[0] ?? 5;
  const uvCat = getUvCategory(uvMax);

  // Approximate visibility from relative humidity and weather code (Open-Meteo surface visibility proxy)
  const relHumidity = currentRaw.relative_humidity_2m ?? 60;
  let estimatedVisibility = 10;
  if ([45, 48].includes(weatherCode)) {
    estimatedVisibility = 0.8;
  } else if ([51, 53, 55, 61, 63, 71].includes(weatherCode)) {
    estimatedVisibility = 4.5;
  } else if ([65, 82, 95, 99].includes(weatherCode)) {
    estimatedVisibility = 2.0;
  } else if (relHumidity > 85) {
    estimatedVisibility = 7.5;
  }

  const now = new Date();
  const current: CurrentWeather = {
    temperature: currentRaw.temperature_2m ?? 20,
    feelsLike: currentRaw.apparent_temperature ?? currentRaw.temperature_2m ?? 20,
    minTemp: dailyRaw.temperature_2m_min?.[0] ?? currentRaw.temperature_2m ?? 15,
    maxTemp: dailyRaw.temperature_2m_max?.[0] ?? currentRaw.temperature_2m ?? 25,
    condition: weatherInfo.label,
    weatherCode,
    isDay,
    humidity: relHumidity,
    windSpeed: currentRaw.wind_speed_10m ?? 10,
    windDirection: currentRaw.wind_direction_10m ?? 0,
    windGusts: currentRaw.wind_gusts_10m ?? currentRaw.wind_speed_10m ?? 12,
    pressure: Math.round(currentRaw.surface_pressure ?? currentRaw.pressure_msl ?? 1013),
    visibility: estimatedVisibility,
    cloudCover: currentRaw.cloud_cover ?? 20,
    uvIndex: uvMax,
    uvCategory: uvCat.label,
    precipitation: currentRaw.precipitation ?? 0,
    sunrise: todaySunrise,
    sunset: todaySunset,
    daylightDuration: daylightDuration > 0 ? daylightDuration : 43200,
    localTime: getLocalTimeString(now, resolvedTimezone),
    localDate: getLocalDateString(now, resolvedTimezone),
    dayOfWeek: getLocalDayName(now.toISOString().split('T')[0], resolvedTimezone),
  };

  // Hourly forecast: extract next 24-28 hours from current timestamp
  const hourly: HourlyForecastItem[] = [];
  if (hourlyRaw.time && Array.isArray(hourlyRaw.time)) {
    const currentIsoPrefix = currentRaw.time ? currentRaw.time.substring(0, 13) : '';
    let startIndex = hourlyRaw.time.findIndex((t: string) => t.startsWith(currentIsoPrefix));
    if (startIndex < 0) startIndex = 0;

    const count = Math.min(26, hourlyRaw.time.length - startIndex);
    for (let i = startIndex; i < startIndex + count; i++) {
      const timeStr = hourlyRaw.time[i];
      const hDate = new Date(timeStr);
      const hCode = hourlyRaw.weather_code?.[i] ?? 0;
      const hIsDay = hourlyRaw.is_day?.[i] === 1;
      const hInfo = getWeatherInfo(hCode, hIsDay);

      hourly.push({
        time: timeStr,
        timestamp: hDate.getTime(),
        formattedHour: getLocalTimeString(timeStr, resolvedTimezone),
        temperature: hourlyRaw.temperature_2m?.[i] ?? 0,
        feelsLike: hourlyRaw.apparent_temperature?.[i] ?? 0,
        weatherCode: hCode,
        condition: hInfo.label,
        precipitationProbability: hourlyRaw.precipitation_probability?.[i] ?? 0,
        precipitation: hourlyRaw.precipitation?.[i] ?? 0,
        relativeHumidity: hourlyRaw.relative_humidity_2m?.[i] ?? 50,
        windSpeed: hourlyRaw.wind_speed_10m?.[i] ?? 0,
        uvIndex: hourlyRaw.uv_index?.[i] ?? 0,
        isDay: hIsDay,
      });
    }
  }

  // Daily forecast: 7-8 days
  const daily: DailyForecastItem[] = [];
  if (dailyRaw.time && Array.isArray(dailyRaw.time)) {
    const dayCount = Math.min(8, dailyRaw.time.length);
    for (let i = 0; i < dayCount; i++) {
      const dateStr = dailyRaw.time[i];
      const dCode = dailyRaw.weather_code?.[i] ?? 0;
      const dInfo = getWeatherInfo(dCode, true);

      daily.push({
        date: dateStr,
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : getLocalDayName(dateStr, resolvedTimezone),
        formattedDate: new Intl.DateTimeFormat('en-US', {
          timeZone: resolvedTimezone,
          month: 'short',
          day: 'numeric',
        }).format(new Date(dateStr + 'T12:00:00Z')),
        weatherCode: dCode,
        condition: dInfo.label,
        maxTemp: dailyRaw.temperature_2m_max?.[i] ?? 20,
        minTemp: dailyRaw.temperature_2m_min?.[i] ?? 10,
        apparentMaxTemp: dailyRaw.apparent_temperature_max?.[i] ?? dailyRaw.temperature_2m_max?.[i],
        apparentMinTemp: dailyRaw.apparent_temperature_min?.[i] ?? dailyRaw.temperature_2m_min?.[i],
        precipitationProbability: dailyRaw.precipitation_probability_max?.[i] ?? 0,
        precipitationSum: dailyRaw.precipitation_sum?.[i] ?? 0,
        uvIndexMax: dailyRaw.uv_index_max?.[i] ?? 5,
        windSpeedMax: dailyRaw.wind_speed_10m_max?.[i] ?? 15,
        sunrise: dailyRaw.sunrise?.[i] || '',
        sunset: dailyRaw.sunset?.[i] || '',
      });
    }
  }

  // Detect active alerts
  const alerts = deriveWeatherAlerts(currentRaw, dailyRaw, hourlyRaw, resolvedTimezone);

  return {
    location: {
      ...location,
      timezone: resolvedTimezone,
    },
    current,
    hourly,
    daily,
    airQuality,
    alerts,
    fetchedAt: Date.now(),
  };
}
