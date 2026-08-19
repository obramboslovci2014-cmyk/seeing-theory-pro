import React from 'react';
import { ALL_CHAPTERS } from '../data/curriculumData';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
  Flame,
} from 'lucide-react';

interface CurriculumViewProps {
  onBack: () => void;
  onSelectUnit: (unitId: string) => void;
  completedUnits: string[];
  currentUnitId: string;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  onBack,
  onSelectUnit,
  completedUnits,
  currentUnitId,
}) => {
  const totalUnits = ALL_CHAPTERS.reduce((acc, ch) => acc + ch.units.length, 0);
  const completedCount = completedUnits.length;
  const progressPercent = Math.round((completedCount / Math.max(1, totalUnits)) * 100);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-xs"
          >
            <ArrowLeft className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>Nazaj v učilnico</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:border-slate-800" />

          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Celoten učni načrt statistike
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Uvod + 6 poglavij · {totalUnits} interaktivnih lekcij od osnov do regresije
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-mono">
            {completedCount} / {totalUnits} ({progressPercent}%)
          </span>
          <div className="w-24 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Roadmap Container */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl w-full mx-auto space-y-8">
        {ALL_CHAPTERS.map(chapter => {
          const chapterCompleted = chapter.units.every(u => completedUnits.includes(u.id));
          const chapterCompletedCount = chapter.units.filter(u => completedUnits.includes(u.id)).length;

          return (
            <div
              key={chapter.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white font-bold text-sm shadow-xs"
                    style={{ backgroundColor: chapter.color || '#4f46e5' }}
                  >
                    {chapter.chapterNumber === 0 ? '0' : chapter.chapterNumber}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {chapter.chapterNumber === 0 ? 'Uvodni modul' : `Poglavje ${chapter.chapterNumber}`}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {chapter.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {chapterCompleted ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Opravljeno (3/3)
                    </span>
                  ) : (
                    <span>{chapterCompletedCount} / {chapter.units.length} lekcij</span>
                  )}
                </div>
              </div>

              {/* Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {chapter.units.map(unit => {
                  const isDone = completedUnits.includes(unit.id);
                  const isCurrent = unit.id === currentUnitId;

                  return (
                    <button
                      key={unit.id}
                      onClick={() => {
                        onSelectUnit(unit.id);
                        onBack();
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-full group ${
                        isCurrent
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 ring-2 ring-indigo-500/10'
                          : isDone
                          ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 hover:border-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {unit.unitNumber}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                          )}
                        </div>

                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                          {unit.title}
                        </h3>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {unit.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        <span>Začni lekcijo</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
