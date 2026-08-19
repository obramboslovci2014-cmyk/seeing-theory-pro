import React, { useState } from 'react';
import {
  ArrowLeft,
  Sun,
  Moon,
  Type,
  Sliders,
  Palette,
  Keyboard,
  RotateCcw,
  Check,
  Sparkles,
  Layout,
  BookOpen,
  GraduationCap,
  Award,
  Flame,
  CheckCircle2,
  Download,
  Share2,
} from 'lucide-react';
import { ThemeId, THEMES } from '../utils/themeConfig';
import { ViewLayoutMode } from './Header';

export type FontFamilyId = 'jakarta' | 'inter' | 'lexend' | 'nunito' | 'lora' | 'fira';
export type FontSizeId = 'compact' | 'normal' | 'large';

interface SettingsViewProps {
  onBack: () => void;
  fontFamily: FontFamilyId;
  onSelectFont: (font: FontFamilyId) => void;
  fontSize: FontSizeId;
  onSelectFontSize: (size: FontSizeId) => void;
  isDark: boolean;
  onToggleDark: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  viewMode: ViewLayoutMode;
  onSelectViewMode: (mode: ViewLayoutMode) => void;
  completedUnitsCount: number;
  totalUnitsCount: number;
  xp: number;
  streak: number;
  onResetProgress?: () => void;
}

type SettingsTab = 'appearance' | 'typography' | 'layout' | 'shortcuts' | 'progress';

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBack,
  fontFamily,
  onSelectFont,
  fontSize,
  onSelectFontSize,
  isDark,
  onToggleDark,
  currentTheme,
  onSelectTheme,
  viewMode,
  onSelectViewMode,
  completedUnitsCount,
  totalUnitsCount,
  xp,
  streak,
  onResetProgress,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [copiedLink, setCopiedLink] = useState(false);

  const fontOptions: { id: FontFamilyId; name: string; desc: string; sample: string; cssClass: string }[] = [
    {
      id: 'jakarta',
      name: 'Plus Jakarta Sans',
      desc: 'Sodobna, čista & geometrična tipografija',
      sample: 'Zakon velikih števil in verjetnost 123',
      cssClass: 'font-jakarta',
    },
    {
      id: 'inter',
      name: 'Inter',
      desc: 'Nevtralna tehnična pisava z visoko berljivostjo',
      sample: 'Zakon velikih števil in verjetnost 123',
      cssClass: 'font-inter',
    },
    {
      id: 'lexend',
      name: 'Lexend',
      desc: 'Tipografija, optimizirana za hitrejše branje in učenje',
      sample: 'Zakon velikih števil in verjetnost 123',
      cssClass: 'font-lexend',
    },
    {
      id: 'nunito',
      name: 'Nunito',
      desc: 'Prijazna, mehka in zaobljena oblika črk',
      sample: 'Zakon velikih števil in verjetnost 123',
      cssClass: 'font-nunito',
    },
    {
      id: 'lora',
      name: 'Lora Serif',
      desc: 'Eleganten knjižni serif za udobno zvezno branje',
      sample: 'Zakon velikih števil in verjetnost 123',
      cssClass: 'font-lora',
    },
    {
      id: 'fira',
      name: 'Fira Code',
      desc: 'Programerska pisava fiksne širine za matematične izraze',
      sample: 'P(A|B) = [P(B|A) * P(A)] / P(B)',
      cssClass: 'font-fira',
    },
  ];

  const fontSizeOptions: { id: FontSizeId; label: string; px: string; desc: string }[] = [
    { id: 'compact', label: 'Kompaktna', px: '14px', desc: 'Več vsebine na zaslonu' },
    { id: 'normal', label: 'Standardna', px: '16px', desc: 'Optimalno razmerje' },
    { id: 'large', label: 'Udobna', px: '18px', desc: 'Povečana berljivost' },
  ];

  const themeList = Object.values(THEMES);

  const tabs: { id: SettingsTab; label: string; icon: any; desc: string }[] = [
    { id: 'appearance', label: 'Videz & Barve', icon: Palette, desc: 'Svetla/temna tema in poudarki' },
    { id: 'typography', label: 'Tipografija', icon: Type, desc: 'Pisava in velikost besedila' },
    { id: 'layout', label: 'Način prikaza', icon: Layout, desc: 'Privzeta postavitev učilnice' },
    { id: 'shortcuts', label: 'Bližnjice', icon: Keyboard, desc: 'Hitre tipke za simulacijo' },
    { id: 'progress', label: 'Podatki & Napredek', icon: Award, desc: 'Statistika in ponastavitev' },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* Top Navigation Bar */}
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
              Nastavitve & Prilagoditve
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prilagodi učno izkušnjo svojemu načinu dela
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors"
            title="Kopiraj neposredno povezavo do nastavitev"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Kopirano!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Deli povezavo</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Settings Content Area (2-column layout on desktop) */}
      <div className="flex-1 flex overflow-hidden max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 gap-6">
        {/* Left Settings Sidebar */}
        <aside className="w-64 shrink-0 hidden md:flex flex-col gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xs">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Kategorije nastavitev
          </div>

          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <div className="min-w-0">
                  <div className="truncate">{tab.label}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal truncate">
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}

          <div className="mt-auto p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">
              Samodejno shranjevanje
            </span>
            <p>Vse spremembe se samodejno shranijo v vaš brskalnik.</p>
          </div>
        </aside>

        {/* Mobile Tab Selector */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-2 shrink-0 border-b border-slate-200 dark:border-slate-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Active Panel */}
        <main className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-xs">
          {/* TAB 1: APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="space-y-8 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Videz & Svetlost zaslona
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Izberi med svetlo temo z visokim kontrastom ali nočno temno temo.
                </p>
              </div>

              {/* Theme Mode selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => isDark && onToggleDark()}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    !isDark
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Sun className="h-5 w-5" />
                    </div>
                    {!isDark && (
                      <span className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                        <Check className="h-4 w-4" /> Aktivno
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Svetla tema (Priporočeno)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Čista, zračna podlaga z optimalnim kontrastom za dnevno učenje in branje.
                  </p>
                </button>

                <button
                  onClick={() => !isDark && onToggleDark()}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isDark
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-indigo-400">
                      <Moon className="h-5 w-5" />
                    </div>
                    {isDark && (
                      <span className="flex items-center gap-1 text-xs font-bold text-indigo-400">
                        <Check className="h-4 w-4" /> Aktivno
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Temna tema
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Prijetna za oči v temnejših prostorih in pri nočnem delu.
                  </p>
                </button>
              </div>

              {/* Accent Color Palette */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Barvni poudarki aplikacije
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Izberi primarno barvo za gumbe, grafe in vizualne elemente.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themeList.map(t => (
                    <button
                      key={t.name}
                      onClick={() => onSelectTheme(t.name)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all ${
                        currentTheme === t.name
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="h-4 w-4 rounded-full border border-black/10 dark:border-white/20 shadow-xs"
                          style={{ backgroundColor: t.primary }}
                        />
                        <span className="text-slate-900 dark:text-slate-100">{t.label}</span>
                      </div>
                      {currentTheme === t.name && (
                        <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeTab === 'typography' && (
            <div className="space-y-8 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Tipografija & Velikost besedila
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Prilagodi pisavo in velikost za najbolj udobno bralno izkušnjo.
                </p>
              </div>

              {/* Font Size Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Velikost besedila
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {fontSizeOptions.map(size => (
                    <button
                      key={size.id}
                      onClick={() => onSelectFontSize(size.id)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        fontSize === size.id
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/10'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">{size.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{size.desc} ({size.px})</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family Selector */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Izbira pisave
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fontOptions.map(font => (
                    <button
                      key={font.id}
                      onClick={() => onSelectFont(font.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        fontFamily === font.id
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {font.name}
                        </span>
                        {fontFamily === font.id && (
                          <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                        {font.desc}
                      </p>
                      <div className={`text-xs p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 truncate ${font.cssClass}`}>
                        {font.sample}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LAYOUT & VIEW MODE */}
          {activeTab === 'layout' && (
            <div className="space-y-8 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Način prikaza učilnice
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Izberi svojo najljubšo strukturo za učenje konceptov in interakcijo s simulacijami.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => onSelectViewMode('unified')}
                  className={`w-full p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    viewMode === 'unified'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        1. Enoten pogled (Privzeto & Priporočeno)
                      </h3>
                      {viewMode === 'unified' && (
                        <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Zvezno tekoča lekcija brez razdeljenih oken. Interaktivno platno je nameščeno neposredno pod razlago za naravno in sproščeno učenje.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onSelectViewMode('canvas')}
                  className={`w-full p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    viewMode === 'canvas'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Layout className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        2. Samo celozaslonsko platno
                      </h3>
                      {viewMode === 'canvas' && (
                        <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Celoten zaslon je namenjen izključno interaktivni fizikalni simulaciji, zbirki vzorcev in vizualizacijam.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onSelectViewMode('split')}
                  className={`w-full p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    viewMode === 'split'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        3. Deljen pogled 50 / 50
                      </h3>
                      {viewMode === 'split' && (
                        <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Klasični pogled z dvema stolpcema (levo teorija, desno simulacija) za tiste z zelo širokimi monitorji.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: KEYBOARD SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-6 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Bližnjice na tipkovnici
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uporabljaj hitre tipke za nemoteno eksperimentiranje in navigacijo.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Dodaj poskus na platnu (+1 met / vzorec)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Takoj sproži nov poskus na trenutnem simulacijskem platnu.
                    </span>
                  </div>
                  <kbd className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold shadow-xs">
                    Preslednica (Space)
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Ponastavi simulacijo
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Počisti zbrane točke in vrne platno na začetno stanje.
                    </span>
                  </div>
                  <kbd className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold shadow-xs">
                    R
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Prejšnja / Naslednja lekcija
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Hitro premikanje po zaporednih učnih enotah kurikuluma.
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <kbd className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold shadow-xs">
                      Ctrl ←
                    </kbd>
                    <kbd className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold shadow-xs">
                      Ctrl →
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Prikaži / Skrij stranski učni načrt
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Povečaj delovni prostor s skrivanjem levega seznama lekcij.
                    </span>
                  </div>
                  <kbd className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold shadow-xs">
                    Ctrl B
                  </kbd>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROGRESS & DATA */}
          {activeTab === 'progress' && (
            <div className="space-y-8 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Učni napredek & Upravljanje podatkov
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pregled tvoje statistike učenja in možnosti ponastavitve.
                </p>
              </div>

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono text-indigo-900 dark:text-indigo-100">
                    {completedUnitsCount} / {totalUnitsCount}
                  </div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-300 mt-0.5">
                    Opravljenih lekcij
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center">
                  <Flame className="h-5 w-5 text-amber-500 mx-auto mb-1 fill-amber-500" />
                  <div className="text-xl font-bold font-mono text-amber-900 dark:text-amber-100">
                    {streak} dni
                  </div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                    Učni niz (Streak)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                  <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono text-emerald-900 dark:text-emerald-100">
                    {xp} XP
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-0.5">
                    Točk razumevanja
                  </div>
                </div>
              </div>

              {/* Reset Section */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">
                    Nevarno območje: Ponastavitev
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Če želiš začeti učenje znova od začetka, lahko ponastaviš celoten napredek.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Ali ste prepričani, da želite ponastaviti ves napredek in točke?')) {
                      localStorage.removeItem('seeing_theory_completed');
                      localStorage.removeItem('seeing_theory_xp');
                      if (onResetProgress) onResetProgress();
                      window.location.reload();
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Ponastavi ves napredek (0 XP in 1. lekcija)</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
