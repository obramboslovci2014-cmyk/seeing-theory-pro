import React from 'react';
import { ChapterConfig, UnitConfig } from '../types';
import { ALL_UNITS } from '../data/curriculumData';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  SlidersHorizontal,
  Sun,
  Moon,
  Sparkles,
  Layout,
  MonitorPlay,
  Layers,
} from 'lucide-react';

export type ViewLayoutMode = 'unified' | 'canvas' | 'split';

interface HeaderProps {
  currentUnit: UnitConfig;
  currentChapter: ChapterConfig;
  onSelectUnit: (unitId: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  viewMode: ViewLayoutMode;
  onSelectViewMode: (mode: ViewLayoutMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUnit,
  currentChapter,
  onSelectUnit,
  isDark,
  onToggleDark,
  isSidebarOpen,
  onToggleSidebar,
  onOpenSettings,
  viewMode,
  onSelectViewMode,
}) => {
  const currentIndex = ALL_UNITS.findIndex(u => u.id === currentUnit.id);
  const prevUnit = currentIndex > 0 ? ALL_UNITS[currentIndex - 1] : null;
  const nextUnit = currentIndex < ALL_UNITS.length - 1 ? ALL_UNITS[currentIndex + 1] : null;

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Logo & Open Curriculum Button */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isSidebarOpen
              ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
          title={`Odpri celoten seznam vseh ${ALL_UNITS.length} lekcij`}
        >
          <Menu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>Učni načrt</span>
          <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">
            {ALL_UNITS.length}
          </span>
        </button>

        {/* Current Lesson Badge */}
        <div className="hidden sm:flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {currentUnit.unitNumber}
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[180px] lg:max-w-[280px]">
            {currentUnit.title}
          </span>
        </div>
      </div>

      {/* Center: Stepper 1 / 18 */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl p-1 shadow-xs">
        <button
          onClick={() => prevUnit && onSelectUnit(prevUnit.id)}
          disabled={!prevUnit}
          className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Prejšnja lekcija"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="px-2 text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
          {currentIndex + 1} / {ALL_UNITS.length}
        </span>

        <button
          onClick={() => nextUnit && onSelectUnit(nextUnit.id)}
          disabled={!nextUnit}
          className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Naslednja lekcija"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Right: Layout Switcher & Settings */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Layout Modes */}
        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl p-0.5">
          <button
            onClick={() => onSelectViewMode('unified')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'unified'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
            title="Čist enoten pogled z vgrajenim platnom"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Enoten</span>
          </button>

          <button
            onClick={() => onSelectViewMode('canvas')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'canvas'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
            title="Samo celozaslonsko simulacijsko platno"
          >
            <MonitorPlay className="h-3.5 w-3.5" />
            <span>Platno</span>
          </button>

          <button
            onClick={() => onSelectViewMode('split')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
            title="Deljen pogled (teorija levo, simulacija desno)"
          >
            <Layout className="h-3.5 w-3.5" />
            <span>Deljeno</span>
          </button>
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={onToggleDark}
          className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shadow-xs"
          title={isDark ? 'Preklopi na svetlo temo' : 'Preklopi na temno temo'}
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700" />
          )}
        </button>

        {/* Dedicated Settings Page Link */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
          title="Odpre nastavitve teme, pisave in bližnjic"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden sm:inline">Nastavitve</span>
        </button>
      </div>
    </header>
  );
};
