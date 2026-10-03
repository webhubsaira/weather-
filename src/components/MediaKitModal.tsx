import React from 'react';
import { X, Download, Image as ImageIcon, Sparkles, ExternalLink } from 'lucide-react';

interface MediaKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaKitModal: React.FC<MediaKitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Product Images & Media Kit</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">High-resolution assets for your Gumroad listing and promotion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Square Thumbnail 600x600 */}
          <div className="flex flex-col bg-slate-50 dark:bg-slate-850/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Square Thumbnail (600×600)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">1:1 Ratio</span>
            </div>
            <div className="aspect-square w-full rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-700 bg-slate-950 flex items-center justify-center mb-3 shadow-inner">
              <img
                src="/gumroad-thumbnail-600x600.jpg"
                alt="WeatherNow 600x600 Gumroad Thumbnail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Best for the primary Gumroad product tile, catalog display, and social profile previews.
            </p>
            <div className="mt-auto flex items-center gap-2">
              <a
                href="/gumroad-thumbnail-600x600.jpg"
                download="WeatherNow_Thumbnail_600x600.jpg"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download 600×600
              </a>
              <a
                href="/gumroad-thumbnail-600x600.jpg"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Open full size in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 16:9 Cover Banner */}
          <div className="flex flex-col bg-slate-50 dark:bg-slate-850/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Cover Banner (16:9)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">16:9 Ratio</span>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-700 bg-slate-950 flex items-center justify-center mb-3 shadow-inner">
              <img
                src="/gumroad-cover-banner.jpg"
                alt="WeatherNow 16:9 Gumroad Cover Banner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Best for the Gumroad product header banner, CodeCanyon preview, and Twitter/OpenGraph cards.
            </p>
            <div className="mt-auto flex items-center gap-2">
              <a
                href="/gumroad-cover-banner.jpg"
                download="WeatherNow_Cover_Banner.jpg"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg shadow-sm border border-slate-300 dark:border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download Cover Banner
              </a>
              <a
                href="/gumroad-cover-banner.jpg"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Open full size in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Tip: You can right-click any image above and choose <strong>"Save Image As..."</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
