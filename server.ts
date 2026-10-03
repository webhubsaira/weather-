import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Security hardening headers - hide server software fingerprint and prevent sniffing
  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json());

  // =========================================================================
  // SECURE SERVER-SIDE API PROXIES
  // Shields all external endpoints, API providers, tokens, and query logic
  // Clients only interact with local relative /api/* paths
  // =========================================================================

  // 1. Weather Forecast Proxy
  app.get('/api/weather', async (req, res) => {
    try {
      const lat = parseFloat(req.query.latitude as string);
      const lon = parseFloat(req.query.longitude as string);
      const tz = (req.query.timezone as string) || 'auto';

      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return res.status(400).json({ error: 'Coordinates out of bounds' });
      }

      const upstreamUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,is_day,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=${encodeURIComponent(
        tz
      )}&forecast_days=8`;

      const response = await fetch(upstreamUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'WeatherNow-SecureGateway/1.0',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Meteorological feed unavailable' });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(data);
    } catch (err: any) {
      console.error('Weather proxy error:', err?.message);
      return res.status(500).json({ error: 'Internal meteorological proxy failure' });
    }
  });

  // 2. Air Quality Proxy
  app.get('/api/air-quality', async (req, res) => {
    try {
      const lat = parseFloat(req.query.latitude as string);
      const lon = parseFloat(req.query.longitude as string);
      const tz = (req.query.timezone as string) || 'auto';

      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return res.status(400).json({ error: 'Coordinates out of bounds' });
      }

      const upstreamUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=${encodeURIComponent(
        tz
      )}`;

      const response = await fetch(upstreamUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'WeatherNow-SecureGateway/1.0',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Air quality feed unavailable' });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=600');
      return res.json(data);
    } catch (err: any) {
      console.error('Air quality proxy error:', err?.message);
      return res.status(500).json({ error: 'Internal air quality proxy failure' });
    }
  });

  // 3. Geocoding / Location Search Proxy
  app.get('/api/geocoding', async (req, res) => {
    try {
      const query = ((req.query.query || req.query.name) as string || '').trim();
      if (!query || query.length < 2) {
        return res.json({ results: [] });
      }

      // Sanitize search query input
      const sanitized = query.slice(0, 80).replace(/[^\p{L}\p{N}\s,.-]/gu, '');

      const upstreamUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        sanitized
      )}&count=8&language=en&format=json`;

      const response = await fetch(upstreamUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'WeatherNow-SecureGateway/1.0',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Geocoding query unavailable' });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.json(data);
    } catch (err: any) {
      console.error('Geocoding proxy error:', err?.message);
      return res.status(500).json({ error: 'Internal geocoding proxy failure' });
    }
  });

  // 4. Reverse Geocoding Proxy
  app.get('/api/reverse-geocoding', async (req, res) => {
    try {
      const lat = parseFloat(req.query.latitude as string);
      const lon = parseFloat(req.query.longitude as string);

      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      const upstreamUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

      const response = await fetch(upstreamUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'WeatherNow-SecureGateway/1.0',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Reverse geocode unavailable' });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.json(data);
    } catch (err: any) {
      console.error('Reverse geocoding error:', err?.message);
      return res.status(500).json({ error: 'Internal reverse geocode failure' });
    }
  });

  // 5. Radar Metadata Proxy (RainViewer live frames)
  app.get('/api/radar-meta', async (_req, res) => {
    try {
      const response = await fetch('https://api.rainviewer.com/public/weather-maps.json', {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'WeatherNow-SecureGateway/1.0',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Radar frames unavailable' });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(data);
    } catch (err: any) {
      console.error('Radar metadata error:', err?.message);
      return res.status(500).json({ error: 'Internal radar frame failure' });
    }
  });

  // SEO & Monetization root endpoints
  app.get('/robots.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
  });

  app.get('/sitemap.xml', (_req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
  });

  app.get('/ads.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.join(__dirname, 'public', 'ads.txt'));
  });

  // Vite integration: serve static assets in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WeatherNow secure gateway running on port ${PORT}`);
  });
}

startServer().catch(console.error);
