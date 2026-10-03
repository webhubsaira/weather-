# WeatherNow - Production React Weather Dashboard & Live Doppler Radar

A turnkey, production-ready weather forecasting web application and interactive Doppler radar suite built with React 19, TypeScript, Tailwind CSS, Leaflet, and a zero-config backend proxy gateway.

---

## Key Features

- **Live Doppler Weather Radar**: Real-time precipitation and storm tracking with animated radar layers powered by RainViewer and OpenStreetMap Leaflet tiles.
- **Hyper-Local Forecasts**: Instant current weather, 24-hour hour-by-hour breakdown, and 7-day extended forecasts with high/low temperatures, precipitation probability, humidity, and wind trends.
- **Air Quality Index (AQI)**: Comprehensive European and US AQI calculations with individual breakdowns for PM2.5, PM10, Nitrogen Dioxide ($NO_2$), Carbon Monoxide ($CO$), and Ozone ($O_3$).
- **Sunrise, Sunset & Solar Daylight Tracker**: Visual daylight progress arc with exact solar noon, dawn, and dusk calculations.
- **Interactive Weather Trend Charts**: Dynamic hourly temperature and wind speed charts.
- **Zero Paid API Keys Required**: Pre-configured with a secure server-side proxy gateway delivering live meteorological data with $0/month in third-party API costs.
- **Monetization & AdSense Ready**: Includes IAB standard responsive ad slots (`728x90`, `300x250`, `320x100`) compliant with Google AdSense, pre-configured `public/ads.txt`, and direct sponsor inquiry integration.
- **Advanced SEO Suite**: Rich Schema.org JSON-LD structured data (`WebSite` with Google Search Action Sitelinks, `WebApplication`, `FAQPage`, `Organization`), `robots.txt`, and `sitemap.xml`.
- **Atmospheric Science Guide**: In-depth educational guide to radar reflectivity (dBZ), AQI health brackets, UV safety, and barometric pressure trends for high organic Google Search ranking and AdSense approval.
- **Responsive & Dark/Light Mode**: Smooth transitions with system theme detection and persistent local storage preferences.

---

## Quickstart

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### 1. Installation
Clone or extract the repository and install all dependencies:
```bash
npm install
```

### 2. Development Server
Start the local full-stack development environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Compile the client application and optimize production bundles:
```bash
npm run build
```

To run the production server:
```bash
npm start
```

---

## Connecting Your Google AdSense

1. Open `public/ads.txt` and replace the placeholder publisher ID:
   ```text
   google.com, pub-YOUR_PUBLISHER_ID_HERE, DIRECT, f08c47fec0942fa0
   ```
2. Open `index.html` and add your official AdSense script tag to the `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID_HERE" crossorigin="anonymous"></script>
   ```
3. Open `src/components/AdPlacement.tsx` to insert your `<ins className="adsbygoogle" ... />` unit codes.

---

## Deployment Options

### Deploy to Vercel
1. Push your code to a GitHub repository.
2. In the [Vercel Dashboard](https://vercel.com/), click **New Project** and import the repository.
3. Keep default settings (`Vite` framework preset) and click **Deploy**.
4. In Vercel Project Settings -> Domains, connect your custom domain (e.g. `yourweatherapp.com`).

### Deploy to Netlify / Cloudflare Pages
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Leaflet
- **Backend / Gateway**: Node.js, Express, TSX
- **Build Tool**: Vite
- **Data Providers**: Open-Meteo API, RainViewer API, BigDataCloud reverse geocoding

---

## License
Commercial & Personal Use License. You may customize, rebrand, and deploy this project for unlimited personal or client commercial projects.
