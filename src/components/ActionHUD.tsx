import React from 'react';
import { Plus, Play, Pause, RotateCcw, FastForward } from 'lucide-react';

interface ActionHUDProps {
  onAddSample: (count: number) => void;
  onToggleAuto: () => void;
  onReset: () => void;
  isAutoRunning: boolean;
  sampleButtonLabel?: string;
}

export const ActionHUD: React.FC<ActionHUDProps> = ({
  onAddSample,
  onToggleAuto,
  onReset,
  isAutoRunning,
  sampleButtonLabel = '+1 Vzorec',
}) => {
  return (
    <div
      role="toolbar"
      aria-label="Kontrole simulacije"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 text-white shadow-lg backdrop-blur-md border border-slate-800"
    >
      {/* Add 1 Sample */}
      <button
        type="button"
        onClick={() => onAddSample(1)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-100 active:scale-95 font-semibold text-xs transition-all shadow-xs"
        title="Dodaj 1 vzorec"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>{sampleButtonLabel}</span>
      </button>

      {/* Add 10 Batch */}
      <button
        type="button"
        onClick={() => onAddSample(10)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-semibold text-xs transition-all"
        title="Dodaj 10 vzorcev"
      >
        <FastForward className="h-3 w-3 text-slate-400" />
        <span>+10</span>
      </button>

      {/* Toggle Auto Stream */}
      <button
        type="button"
        onClick={onToggleAuto}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all active:scale-95 ${
          isAutoRunning
            ? 'bg-slate-100 text-slate-900 ring-1 ring-white/50'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
        }`}
        title={isAutoRunning ? 'Ustavi samodejno vzorčenje' : 'Zaženi samodejno vzorčenje'}
      >
        {isAutoRunning ? (
          <Pause className="h-3 w-3" />
        ) : (
          <Play className="h-3 w-3 text-slate-400" />
        )}
        <span>{isAutoRunning ? 'Premor' : 'Samodejno'}</span>
      </button>

      <div className="h-4 w-px bg-slate-800 mx-0.5" />

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-400 hover:text-slate-200 transition-all"
        title="Ponastavi simulacijo"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
