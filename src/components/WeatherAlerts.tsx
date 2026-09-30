import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  const [expandedId, setExpandedId] = useState<string | null>(alerts?.[0]?.id || null);

  if (!alerts || alerts.length === 0) return null;

  const getSeverityStyle = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'emergency':
        return {
          wrapper: 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200',
          badge: 'bg-red-600 text-white',
          icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />,
        };
      case 'warning':
        return {
          wrapper: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
          badge: 'bg-amber-600 text-white',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
        };
      default:
        return {
          wrapper: 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200',
          badge: 'bg-sky-600 text-white',
          icon: <ShieldAlert className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />,
        };
    }
  };

  return (
    <div className="space-y-3" role="region" aria-label="Weather Alerts">
      {alerts.map((alert) => {
        const style = getSeverityStyle(alert.severity);
        const isExpanded = expandedId === alert.id;

        return (
          <div
            key={alert.id}
            className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-xs ${style.wrapper}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {style.icon}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm sm:text-base">
                      {alert.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium mt-1 opacity-90">
                    {alert.headline}
                  </p>

                  <div className="mt-1 text-xs opacity-75 font-mono">
                    <span>{alert.startTime}</span>
                    <span className="mx-1.5">·</span>
                    <span>{alert.endTime}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label={isExpanded ? 'Collapse alert details' : 'Expand alert details'}
                aria-expanded={isExpanded}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-xs sm:text-sm leading-relaxed opacity-95">
                <p>{alert.description}</p>
                <div className="mt-2 text-[11px] opacity-75 font-mono">
                  Issued by {alert.source}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
