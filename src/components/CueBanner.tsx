import React from 'react';
import { MousePointerClick } from 'lucide-react';

interface CueBannerProps {
  cueText: string;
}

export const CueBanner: React.FC<CueBannerProps> = ({ cueText }) => {
  return (
    <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-slate-900/80 text-white text-xs backdrop-blur-md transition-all">
      <span className="font-medium text-slate-200 text-[12px]">{cueText}</span>
      <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono shrink-0">
        <MousePointerClick className="h-3 w-3 text-slate-400" />
        <span>Klikni na platno</span>
      </div>
    </div>
  );
};
