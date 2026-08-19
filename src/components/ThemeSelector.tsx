import React from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import { ThemeId, THEMES } from '../utils/themeConfig';

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  isDark,
  onToggleDark,
}) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeList = Object.values(THEMES);
  const activeTheme = THEMES[currentTheme] || THEMES.indigo;

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      {/* Light / Dark Mode Toggle */}
      <button
        onClick={onToggleDark}
        className="p-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        title={isDark ? 'Preklopi na svetli način' : 'Preklopi na temni način'}
      >
        {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
      </button>

      {/* Theme Palette Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          title="Izberi barvno temo"
        >
          <Palette className="h-3.5 w-3.5 text-indigo-400" />
          <span className="hidden sm:inline">{activeTheme.label}</span>
          <div
            className="h-2.5 w-2.5 rounded-full border border-white/20"
            style={{ backgroundColor: activeTheme.primary }}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-800 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95">
            <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
              Barvne Teme
            </div>
            <div className="mt-1 space-y-1">
              {themeList.map(t => (
                <button
                  key={t.name}
                  onClick={() => {
                    onSelectTheme(t.name);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    currentTheme === t.name
                      ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full border border-white/30"
                      style={{ backgroundColor: t.primary }}
                    />
                    <span>{t.label}</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: t.chart1 }} />
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: t.chart2 }} />
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: t.chart3 }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
