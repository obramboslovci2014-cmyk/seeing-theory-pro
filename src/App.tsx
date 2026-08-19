import { useState, useEffect, useMemo, useCallback } from 'react';
import { ALL_CHAPTERS, ALL_UNITS, getUnitById, getNextUnit, getPrevUnit } from './data/curriculumData';
import { Header, ViewLayoutMode } from './components/Header';
import { CourseSidebar } from './components/CourseSidebar';
import { UnitContent } from './components/UnitContent';
import { CanvasSandbox } from './components/CanvasSandbox';
import { UnifiedLessonView } from './components/UnifiedLessonView';
import { SettingsView, FontFamilyId, FontSizeId } from './components/SettingsView';
import { CurriculumView } from './components/CurriculumView';
import { SimulationManager } from './simulations/simulationRegistry';
import { ThemeId, THEMES } from './utils/themeConfig';
import { BookOpen, MonitorPlay } from 'lucide-react';

type AppPage = 'classroom' | 'settings' | 'curriculum';

export default function App() {
  // Navigation & Page state
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'settings') return 'settings';
    if (hash === 'curriculum') return 'curriculum';
    return 'classroom';
  });

  const [currentUnitId, setCurrentUnitId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('unit-')) return hash;
    const saved = localStorage.getItem('seeing_theory_last_unit');
    return saved || 'unit-0-1';
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeId>('indigo');

  // Light theme by default
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('seeing_theory_theme_mode');
    return saved === 'dark';
  });

  // Sidebar closed by default for a clean, non-cluttered start
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [fontFamily, setFontFamily] = useState<FontFamilyId>(() => {
    const saved = localStorage.getItem('seeing_theory_font');
    return (saved as FontFamilyId) || 'jakarta';
  });

  const [fontSize, setFontSize] = useState<FontSizeId>(() => {
    const saved = localStorage.getItem('seeing_theory_font_size');
    return (saved as FontSizeId) || 'normal';
  });

  // Default to unified single-column flow (no split screen confusion)
  const [viewMode, setViewMode] = useState<ViewLayoutMode>(() => {
    const saved = localStorage.getItem('seeing_theory_view_mode');
    return (saved as ViewLayoutMode) || 'unified';
  });

  const [mobileTab, setMobileTab] = useState<'theory' | 'sandbox'>('theory');

  // Gamification stats
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('seeing_theory_xp');
    return saved ? parseInt(saved, 10) : 150;
  });
  const [streak] = useState<number>(3);
  const [completedUnits, setCompletedUnits] = useState<string[]>(() => {
    const saved = localStorage.getItem('seeing_theory_completed');
    return saved ? JSON.parse(saved) : ['unit-1-1'];
  });

  // URL Hash Synchronizer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'settings') {
        setCurrentPage('settings');
      } else if (hash === 'curriculum') {
        setCurrentPage('curriculum');
      } else if (hash.startsWith('unit-')) {
        setCurrentUnitId(hash);
        setCurrentPage('classroom');
      } else {
        setCurrentPage('classroom');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppPage, unitId?: string) => {
    setCurrentPage(page);
    if (page === 'settings') {
      window.location.hash = '#settings';
    } else if (page === 'curriculum') {
      window.location.hash = '#curriculum';
    } else {
      const targetUnit = unitId || currentUnitId;
      window.location.hash = `#${targetUnit}`;
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setCurrentUnitId(unitId);
    localStorage.setItem('seeing_theory_last_unit', unitId);
    navigateTo('classroom', unitId);
  };

  const handleSelectViewMode = (mode: ViewLayoutMode) => {
    setViewMode(mode);
    localStorage.setItem('seeing_theory_view_mode', mode);
  };

  const currentUnit = useMemo(() => {
    return getUnitById(currentUnitId) || ALL_UNITS[0];
  }, [currentUnitId]);

  const currentChapter = useMemo(() => {
    return ALL_CHAPTERS.find(ch => ch.units.some(u => u.id === currentUnit.id)) || ALL_CHAPTERS[0];
  }, [currentUnit]);

  // Simulation Manager instance
  const simManager = useMemo(() => {
    return new SimulationManager(THEMES[currentTheme] || THEMES.indigo);
  }, []);

  // Theme & Dark mode effects
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('seeing_theory_theme_mode', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('seeing_theory_theme_mode', 'light');
    }
  }, [isDark]);

  // Dynamic Font family & size application
  useEffect(() => {
    const fontMap: Record<FontFamilyId, string> = {
      jakarta: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      inter: "'Inter', system-ui, -apple-system, sans-serif",
      lexend: "'Lexend', system-ui, sans-serif",
      nunito: "'Nunito', system-ui, sans-serif",
      lora: "'Lora', Georgia, serif",
      fira: "'Fira Code', monospace",
    };
    const sizeMap: Record<FontSizeId, string> = {
      compact: '14px',
      normal: '16px',
      large: '18px',
    };

    document.documentElement.style.setProperty('--app-font-family', fontMap[fontFamily] || fontMap.jakarta);
    document.documentElement.style.setProperty('--app-font-size', sizeMap[fontSize] || sizeMap.normal);

    localStorage.setItem('seeing_theory_font', fontFamily);
    localStorage.setItem('seeing_theory_font_size', fontSize);
  }, [fontFamily, fontSize]);

  useEffect(() => {
    simManager.setTheme(THEMES[currentTheme] || THEMES.indigo);
  }, [currentTheme, simManager]);

  // Next / Prev unit handlers
  const handleNextUnit = useCallback(() => {
    const next = getNextUnit(currentUnitId);
    if (next) {
      if (!completedUnits.includes(currentUnitId)) {
        const updated = [...completedUnits, currentUnitId];
        setCompletedUnits(updated);
        localStorage.setItem('seeing_theory_completed', JSON.stringify(updated));
      }
      handleSelectUnit(next.id);
    }
  }, [currentUnitId, completedUnits]);

  const handlePrevUnit = useCallback(() => {
    const prev = getPrevUnit(currentUnitId);
    if (prev) {
      handleSelectUnit(prev.id);
    }
  }, [currentUnitId]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        simManager.addSample(1);
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        simManager.resetCurrent();
      } else if (e.code === 'ArrowRight' && (e.ctrlKey || e.metaKey || e.altKey)) {
        e.preventDefault();
        handleNextUnit();
      } else if (e.code === 'ArrowLeft' && (e.ctrlKey || e.metaKey || e.altKey)) {
        e.preventDefault();
        handlePrevUnit();
      } else if (e.code === 'KeyB' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      } else if (e.code === 'Comma' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        navigateTo(currentPage === 'settings' ? 'classroom' : 'settings');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [simManager, handleNextUnit, handlePrevUnit, currentPage]);

  const handleSyncSimulation = (params: Record<string, any>) => {
    if (params.p !== undefined && simManager.engine1_1) {
      simManager.engine1_1.p = params.p;
      simManager.engine1_1.addFlip(params.p, 10);
    }
    if (params.samples !== undefined && simManager.engine4_1) {
      simManager.engine4_1.addSample(params.samples);
    }
  };

  const hasNext = getNextUnit(currentUnitId) !== null;

  // SUBPAGE 1: DEDICATED SETTINGS PAGE
  if (currentPage === 'settings') {
    return (
      <SettingsView
        onBack={() => navigateTo('classroom')}
        fontFamily={fontFamily}
        onSelectFont={setFontFamily}
        fontSize={fontSize}
        onSelectFontSize={setFontSize}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        viewMode={viewMode}
        onSelectViewMode={handleSelectViewMode}
        completedUnitsCount={completedUnits.length}
        totalUnitsCount={ALL_UNITS.length}
        xp={xp}
        streak={streak}
        onResetProgress={() => {
          setCompletedUnits([]);
          setXp(0);
          setCurrentUnitId('unit-1-1');
        }}
      />
    );
  }

  // SUBPAGE 2: DEDICATED FULL ROADMAP / CURRICULUM PAGE
  if (currentPage === 'curriculum') {
    return (
      <CurriculumView
        onBack={() => navigateTo('classroom')}
        onSelectUnit={handleSelectUnit}
        completedUnits={completedUnits}
        currentUnitId={currentUnitId}
      />
    );
  }

  // MAIN CLASSROOM VIEW: Sleek, single top bar, no clutter
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* 1. Only ONE Single, Clean Top Bar */}
      <Header
        currentUnit={currentUnit}
        currentChapter={currentChapter}
        onSelectUnit={handleSelectUnit}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenSettings={() => navigateTo('settings')}
        viewMode={viewMode}
        onSelectViewMode={handleSelectViewMode}
      />

      {/* 2. Slide-over Curriculum Drawer */}
      <CourseSidebar
        chapters={ALL_CHAPTERS}
        currentUnit={currentUnit}
        onSelectUnit={handleSelectUnit}
        completedUnits={completedUnits}
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(false)}
        xp={xp}
        streak={streak}
        onOpenSettings={() => navigateTo('settings')}
      />

      {/* 3. Main Learning Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* MODE 1 (DEFAULT): Unified Single-Column Flow */}
        {viewMode === 'unified' && (
          <div className="flex-1 overflow-hidden">
            <UnifiedLessonView
              unit={currentUnit}
              simManager={simManager}
              currentTheme={currentTheme}
              onNextUnit={handleNextUnit}
              hasNextUnit={hasNext}
              onSyncSimulation={handleSyncSimulation}
            />
          </div>
        )}

        {/* MODE 2: Pure Canvas Fullscreen */}
        {viewMode === 'canvas' && (
          <div className="flex-1 h-full relative overflow-hidden bg-slate-100/70 dark:bg-slate-950 p-4 sm:p-6">
            <div className="h-full w-full max-w-6xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs bg-white dark:bg-slate-900">
              <CanvasSandbox
                unit={currentUnit}
                simManager={simManager}
                currentTheme={currentTheme}
              />
            </div>
          </div>
        )}

        {/* MODE 3: Classic 50/50 Split Screen (Only when simulation is present; otherwise clean full single-column) */}
        {viewMode === 'split' && (
          currentUnit.hasSimulation === false ? (
            <div className="flex-1 overflow-hidden">
              <UnifiedLessonView
                unit={currentUnit}
                simManager={simManager}
                currentTheme={currentTheme}
                onNextUnit={handleNextUnit}
                hasNextUnit={hasNext}
                onSyncSimulation={handleSyncSimulation}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Mobile Tab Switcher */}
              <div className="flex md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shrink-0">
                <button
                  onClick={() => setMobileTab('theory')}
                  className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold transition-colors ${
                    mobileTab === 'theory'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>1. Razlaga & Kviz</span>
                </button>
                <button
                  onClick={() => setMobileTab('sandbox')}
                  className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold transition-colors ${
                    mobileTab === 'sandbox'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <MonitorPlay className="h-3.5 w-3.5" />
                  <span>2. Interaktivno Platno</span>
                </button>
              </div>

              {/* Split Workspace */}
              <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                <div
                  className={`w-full md:w-1/2 h-full bg-white dark:bg-slate-900/30 border-r border-slate-200 dark:border-slate-800 overflow-hidden ${
                    mobileTab === 'theory' ? 'block' : 'hidden md:block'
                  }`}
                >
                  <UnitContent
                    unit={currentUnit}
                    onNextUnit={handleNextUnit}
                    hasNextUnit={hasNext}
                    onSyncSimulation={handleSyncSimulation}
                  />
                </div>

                <div
                  className={`w-full md:w-1/2 h-full relative overflow-hidden bg-slate-100/70 dark:bg-slate-950 ${
                    mobileTab === 'sandbox' ? 'block' : 'hidden md:block'
                  }`}
                >
                  <CanvasSandbox
                    unit={currentUnit}
                    simManager={simManager}
                    currentTheme={currentTheme}
                  />
                </div>
              </main>
            </div>
          )
        )}
      </div>
    </div>
  );
}
