export interface GeoLocation {
  id?: number;
  name: string;
  admin1?: string; // State / Region / Province
  country: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  elevation?: number;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  condition: string;
  weatherCode: number;
  isDay: boolean;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  pressure: number;
  visibility: number; // in km
  cloudCover: number; // in %
  uvIndex: number;
  uvCategory: string;
  precipitation: number; // in mm
  sunrise: string;
  sunset: string;
  daylightDuration: number; // in seconds
  localTime: string;
  localDate: string;
  dayOfWeek: string;
}

export interface HourlyForecastItem {
  time: string;
  timestamp: number;
  formattedHour: string;
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  condition: string;
  precipitationProbability: number;
  precipitation: number;
  relativeHumidity: number;
  windSpeed: number;
  uvIndex: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  formattedDate: string;
  weatherCode: number;
  condition: string;
  maxTemp: number;
  minTemp: number;
  apparentMaxTemp?: number;
  apparentMinTemp?: number;
  precipitationProbability: number;
  precipitationSum: number;
  uvIndexMax: number;
  windSpeedMax: number;
  sunrise: string;
  sunset: string;
}

export interface AirQualityData {
  europeanAqi: number;
  usAqi: number;
  category: string;
  color: string;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
  description: string;
}

export interface WeatherAlert {
  id: string;
  title: string;
  severity: 'advisory' | 'watch' | 'warning' | 'emergency';
  headline: string;
  description: string;
  startTime: string;
  endTime: string;
  source: string;
}

export type TempUnit = 'C' | 'F';
export type WindUnit = 'km/h' | 'mph';
export type VisibilityUnit = 'km' | 'miles';
export type PressureUnit = 'hPa' | 'inHg';

export interface UnitPreferences {
  temperature: TempUnit;
  wind: WindUnit;
  visibility: VisibilityUnit;
  pressure: PressureUnit;
}

export type ThemeMode = 'light' | 'dark';

export interface WeatherDataBundle {
  location: GeoLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality: AirQualityData | null;
  alerts: WeatherAlert[];
  fetchedAt: number;
}
