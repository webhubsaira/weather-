import React, { useState } from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { HourlyForecastItem, TempUnit, WindUnit } from '../types/weather';
import { formatTemp, formatWindSpeed } from '../utils/conversions';

interface WeatherChartsProps {
  hourly: HourlyForecastItem[];
  tempUnit: TempUnit;
  windUnit: WindUnit;
}

type ChartType = 'temperature' | 'precipitation' | 'wind';

export const WeatherCharts: React.FC<WeatherChartsProps> = ({
  hourly,
  tempUnit,
  windUnit,
}) => {
  const [activeChart, setActiveChart] = useState<ChartType>('temperature');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Take the first 16 points for a crisp 16-hour chart
  const data = hourly.slice(0, 16);
  if (data.length < 2) return null;

  // Chart coordinate space
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  // Data value extraction
  const getValues = () => {
    switch (activeChart) {
      case 'temperature':
        return data.map((d) => (tempUnit === 'F' ? (d.temperature * 9) / 5 + 32 : d.temperature));
      case 'precipitation':
        return data.map((d) => d.precipitationProbability);
      case 'wind':
        return data.map((d) => (windUnit === 'mph' ? d.windSpeed * 0.621371 : d.windSpeed));
    }
  };

  const values = getValues();
  let minVal = Math.min(...values);
  let maxVal = Math.max(...values);

  // Buffer range
  if (activeChart === 'precipitation') {
    minVal = 0;
    maxVal = 100;
  } else {
    const delta = Math.max(2, maxVal - minVal);
    minVal = Math.floor(minVal - delta * 0.15);
    maxVal = Math.ceil(maxVal + delta * 0.15);
  }

  const range = Math.max(1, maxVal - minVal);

  // Compute points
  const points = data.map((item, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * chartWidth;
    const y = svgHeight - paddingY - ((values[idx] - minVal) / range) * chartHeight;
    return { x, y, value: values[idx], raw: item };
  });

  // Build SVG smooth path curve (Catmull-Rom or Bezier curve)
  const linePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, '');

  // Build area fill path
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  // Color schemes
  const getThemeColors = () => {
    switch (activeChart) {
      case 'temperature':
        return {
          stroke: '#f59e0b',
          gradientStart: '#f59e0b',
          gradientStop: '#f59e0b00',
          dot: '#f59e0b',
          unitLabel: `°${tempUnit}`,
        };
      case 'precipitation':
        return {
          stroke: '#0284c7',
          gradientStart: '#38bdf8',
          gradientStop: '#38bdf800',
          dot: '#0284c7',
          unitLabel: '%',
        };
      case 'wind':
        return {
          stroke: '#14b8a6',
          gradientStart: '#2dd4bf',
          gradientStop: '#2dd4bf00',
          dot: '#14b8a6',
          unitLabel: windUnit,
        };
    }
  };

  const theme = getThemeColors();

  return (
    <section className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Weather Forecast Trends
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            16-hour interactive trajectory
          </p>
        </div>

        {/* Tab Buttons (Temperature, Precipitation, Wind) */}
        <div
          className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 self-start sm:self-auto text-xs font-medium"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeChart === 'temperature'}
            onClick={() => {
              setActiveChart('temperature');
              setHoveredIndex(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeChart === 'temperature'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Temperature</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeChart === 'precipitation'}
            onClick={() => {
              setActiveChart('precipitation');
              setHoveredIndex(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeChart === 'precipitation'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Precipitation</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeChart === 'wind'}
            onClick={() => {
              setActiveChart('wind');
              setHoveredIndex(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeChart === 'wind'
                ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Wind</span>
          </button>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id={`chart-grad-${activeChart}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.gradientStart} stopOpacity="0.35" />
              <stop offset="100%" stopColor={theme.gradientStop} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.33, 0.66, 1].map((ratio) => {
            const y = svgHeight - paddingY - ratio * chartHeight;
            const refVal = Math.round(minVal + ratio * range);
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  className="stroke-slate-100 dark:stroke-slate-700/60"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono tabular-nums"
                >
                  {refVal}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#chart-grad-${activeChart})`} />

          {/* Line curve */}
          <path
            d={linePath}
            fill="none"
            stroke={theme.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points & Interactive hover zones */}
          {points.map((p, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Invisible wide hover target */}
              <rect
                x={p.x - 18}
                y={paddingY}
                width={36}
                height={chartHeight + 10}
                fill="transparent"
              />

              {/* Point circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === idx ? 6 : 3.5}
                fill={theme.dot}
                className="transition-all duration-150 stroke-white dark:stroke-slate-900"
                strokeWidth={hoveredIndex === idx ? 2.5 : 1.5}
              />

              {/* Time label under the axis */}
              {idx % 2 === 0 && (
                <text
                  x={p.x}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono tabular-nums"
                >
                  {idx === 0 ? 'Now' : p.raw.formattedHour.replace(':00', '')}
                </text>
              )}
            </g>
          ))}

          {/* Active tooltip indicator */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <g transform={`translate(${points[hoveredIndex].x}, ${points[hoveredIndex].y - 32})`}>
              {/* Vertical guide line */}
              <line
                x1={0}
                y1={32}
                x2={0}
                y2={svgHeight - paddingY - points[hoveredIndex].y}
                className="stroke-slate-400 dark:stroke-slate-500"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Tooltip bubble */}
              <rect
                x="-36"
                y="-18"
                width="72"
                height="24"
                rx="6"
                className="fill-slate-900 dark:fill-white shadow-md"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                className="text-[11px] font-bold fill-white dark:fill-slate-900 font-mono tabular-nums"
              >
                {Math.round(points[hoveredIndex].value)} {theme.unitLabel}
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  );
};
