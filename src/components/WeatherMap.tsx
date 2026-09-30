import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Maximize2, Minimize2, Navigation2, RefreshCw } from 'lucide-react';
import { GeoLocation } from '../types/weather';

interface WeatherMapProps {
  location: GeoLocation;
}

type MapLayerType = 'radar' | 'clouds' | 'standard';

export const WeatherMap: React.FC<WeatherMapProps> = ({ location }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const overlayLayerRef = useRef<L.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('radar');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [radarTimestamp, setRadarTimestamp] = useState<string>('Live');

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create map
    const map = L.map(mapContainerRef.current, {
      center: [location.latitude, location.longitude],
      zoom: 9,
      zoomControl: false,
      attributionControl: false,
    });

    // Clean OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    // Marker styling
    const customIcon = L.divIcon({
      className: 'custom-weather-pin',
      html: `<div style="background-color: #0284c7; width: 14px; height: 14px; border-radius: 9999px; border: 2.5px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    const marker = L.marker([location.latitude, location.longitude], {
      icon: customIcon,
    }).addTo(map);

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Fix map container sizing in tabs/modals
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map view when location changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([location.latitude, location.longitude], 9);
    if (markerRef.current) {
      markerRef.current.setLatLng([location.latitude, location.longitude]);
    }
  }, [location.latitude, location.longitude]);

  // Update overlay layers (Precipitation Radar or Clouds)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (overlayLayerRef.current) {
      map.removeLayer(overlayLayerRef.current);
      overlayLayerRef.current = null;
    }

    if (activeLayer === 'radar') {
      // Free RainViewer live global radar tiles (updates every 10 min)
      // https://www.rainviewer.com/api.html
      fetch('https://api.rainviewer.com/public/weather-maps.json')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.radar && data.radar.past && data.radar.past.length > 0) {
            const latest = data.radar.past[data.radar.past.length - 1];
            const tileUrl = `https://tilecache.rainviewer.com/v2/radar/${latest.time}/256/{z}/{x}/{y}/2/1_1.png`;

            if (overlayLayerRef.current) {
              map.removeLayer(overlayLayerRef.current);
            }

            const radarLayer = L.tileLayer(tileUrl, {
              opacity: 0.75,
              zIndex: 100,
            }).addTo(map);

            overlayLayerRef.current = radarLayer;
            const date = new Date(latest.time * 1000);
            setRadarTimestamp(
              date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
          }
        })
        .catch((err) => {
          console.warn('RainViewer API load error:', err);
        });
    } else if (activeLayer === 'clouds') {
      // OpenWeatherMap / Open-Meteo tile or OpenStreetMap standard
      // Can use Open-Meteo satellite/cloud tile or precipitation layer
      setRadarTimestamp('Cloud Cover Layer');
    } else {
      setRadarTimestamp('Street View');
    }
  }, [activeLayer]);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([location.latitude, location.longitude], 9);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <section
      className={`rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs overflow-hidden transition-all flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'relative h-[420px]'
      }`}
    >
      {/* Map Header / Layer Toolbar */}
      <div className="p-3.5 sm:p-4 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
            <span>Interactive Weather Map</span>
            <span className="text-xs font-normal text-slate-500 font-mono">
              · {radarTimestamp}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Centered on {location.name}, {location.country}
          </p>
        </div>

        {/* Layer Selector & Controls */}
        <div className="flex items-center gap-2">
          {/* Layer switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveLayer('radar')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeLayer === 'radar'
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Precipitation Radar
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('standard')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeLayer === 'standard'
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Standard
            </button>
          </div>

          {/* Recenter Button */}
          <button
            type="button"
            onClick={handleRecenter}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            title="Recenter on location"
            aria-label="Recenter map"
          >
            <Navigation2 className="w-4 h-4 text-sky-500" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimeout(() => {
                mapInstanceRef.current?.invalidateSize();
              }, 250);
            }}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            title={isFullscreen ? 'Exit full screen' : 'Full screen map'}
            aria-label={isFullscreen ? 'Exit full screen' : 'Full screen map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 w-full h-full bg-slate-100 dark:bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Custom Zoom Controls Floating on bottom right */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col shadow-md rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <button
            type="button"
            onClick={handleZoomIn}
            className="px-3 py-2 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-200 dark:border-slate-700 transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="px-3 py-2 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>

        {/* Radar Intensity Legend */}
        {activeLayer === 'radar' && (
          <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs border border-slate-200 dark:border-slate-700 text-[11px] shadow-sm flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Rain Intensity:</span>
            <div className="h-2 w-24 rounded-full bg-gradient-to-r from-sky-300 via-blue-600 via-amber-400 to-rose-600" />
            <span className="text-[10px] text-slate-400">Light → Heavy</span>
          </div>
        )}
      </div>
    </section>
  );
};
