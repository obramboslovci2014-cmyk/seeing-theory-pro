import React, { useState } from 'react';
import { ChapterConfig, UnitConfig } from '../types';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
  SlidersHorizontal,
  X,
  Map,
} from 'lucide-react';

interface CourseSidebarProps {
  chapters: ChapterConfig[];
  currentUnit: UnitConfig;
  onSelectUnit: (unitId: string) => void;
  completedUnits: string[];
  isOpen: boolean;
  onToggleSidebar: () => void;
  xp: number;
  streak: number;
  onOpenSettings: () => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  chapters,
  currentUnit,
  onSelectUnit,
  completedUnits,
  isOpen,
  onToggleSidebar,
  xp,
  onOpenSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    chapters.forEach(ch => {
      initial[ch.id] = ch.units.some(u => u.id === currentUnit.id);
    });
    return initial;
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const totalUnits = chapters.reduce((acc, ch) => acc + ch.units.length, 0);
  const completedCount = completedUnits.length;
  const progressPercent = Math.round((completedCount / Math.max(1, totalUnits)) * 100);

  const filteredChapters = chapters
    .map(ch => {
      if (!searchQuery.trim()) return ch;
      const q = searchQuery.toLowerCase();
      const matchesChapter =
        ch.title.toLowerCase().includes(q) || ch.description.toLowerCase().includes(q);
      const matchingUnits = ch.units.filter(
        u =>
          u.title.toLowerCase().includes(q) ||
          u.subtitle.toLowerCase().includes(q) ||
          u.unitNumber.includes(q) ||
          u.leadParagraph.toLowerCase().includes(q)
      );
      if (matchesChapter) return ch;
      return {
        ...ch,
        units: matchingUnits,
      };
    })
    .filter(ch => ch.units.length > 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent backdrop to easily close on click */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
        onClick={onToggleSidebar}
      />

      {/* Slide-over Drawer */}
      <aside className="fixed top-0 left-0 bottom-0 w-84 max-w-[85vw] h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl z-50 select-none animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs">
              ST
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                Učni načrt
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Uvod + 6 poglavij ({totalUnits} lekcij)
              </p>
            </div>
          </div>
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Zapri meni"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress & Full Map Link */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Opravljeno {completedCount} od {totalUnits}
            </span>
            <a
              href="#curriculum"
              onClick={onToggleSidebar}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Map className="h-3 w-3" />
              <span>Celoten zemljevid</span>
            </a>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Išči po lekcijah in konceptih..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Chapters Accordion */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredChapters.map(chapter => {
            const isExpanded = expandedChapters[chapter.id] ?? true;
            const chapterCompleted = chapter.units.every(u => completedUnits.includes(u.id));
            const chapterHasActive = chapter.units.some(u => u.id === currentUnit.id);

            return (
              <div key={chapter.id} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-xl transition-all ${
                    chapterHasActive
                      ? 'bg-slate-100 dark:bg-slate-800/70 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: chapter.color || '#6366f1' }}
                    />
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                        {chapter.chapterNumber === 0 ? 'Uvod:' : `P${chapter.chapterNumber}:`}
                      </span>
                      <span className="text-xs truncate">{chapter.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                    {chapterCompleted && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="pl-3 pr-1 py-0.5 space-y-0.5">
                    {chapter.units.map(unit => {
                      const isActive = unit.id === currentUnit.id;
                      const isDone = completedUnits.includes(unit.id);

                      return (
                        <button
                          key={unit.id}
                          onClick={() => {
                            onSelectUnit(unit.id);
                            onToggleSidebar();
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-all ${
                            isActive
                              ? 'bg-indigo-600 text-white font-bold shadow-xs'
                              : isDone
                              ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="shrink-0">
                            {isDone ? (
                              <CheckCircle2
                                className={`h-3.5 w-3.5 ${
                                  isActive ? 'text-indigo-200' : 'text-emerald-500'
                                }`}
                              />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'text-indigo-200'
                                    : 'text-slate-400 dark:text-slate-500'
                                }`}
                              >
                                {unit.unitNumber}
                              </span>
                              <span className="truncate">{unit.title}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between">
          <button
            onClick={() => {
              onToggleSidebar();
              onOpenSettings();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Odpri nastavitve</span>
          </button>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {xp} XP
          </span>
        </div>
      </aside>
    </>
  );
};
