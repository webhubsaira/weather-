import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How accurate is the WeatherNow live forecast?',
    answer:
      'WeatherNow processes high-resolution meteorological models across international observation grids. Forecasts are refreshed continuously, providing down-to-the-hour accuracy for temperature, precipitation probability, humidity, and wind gusts.',
  },
  {
    question: 'How does the live weather radar map work?',
    answer:
      'The interactive radar map streams composite Doppler radar imagery and high-altitude infrared satellite cloud layers. You can track real-time rain storms, snowfall tracks, and cloud formations across any region.',
  },
  {
    question: 'What is the Air Quality Index (AQI) and how should I use it?',
    answer:
      'The Air Quality Index measures fine particulate matter (PM2.5, PM10), Carbon Monoxide (CO), Nitrogen Dioxide (NO2), Sulphur Dioxide (SO2), and ground-level Ozone (O3). Ratings from 0–50 indicate clean air, 51–100 moderate, and 101+ advise sensitive groups or general populations to limit strenuous outdoor activity.',
  },
  {
    question: 'How frequently is the hourly weather forecast updated?',
    answer:
      'Hourly predictions are updated on every request and re-indexed every 15 to 30 minutes from global satellite feeds and ground observation stations.',
  },
  {
    question: 'How do severe weather alerts work on WeatherNow?',
    answer:
      'WeatherNow constantly analyzes meteorological risk indicators—including extreme wind gusts (>55 km/h), torrential precipitation (>15mm), thunderstorm cells, freezing frost conditions, and excessive heat indices (>40°C)—to display instant prominent advisories and safety guidance.',
  },
];

export const WeatherFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions about Weather, Radar, and Air Quality"
      className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-xs p-6 sm:p-8 transition-all"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
              Frequently Asked Weather Questions & Forecast Guide
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Reliable guidance on reading Doppler radar, Air Quality Index (AQI), and weather predictions
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left px-4 sm:px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/40 dark:border-slate-700/40">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
