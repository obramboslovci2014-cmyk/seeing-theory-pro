import React, { useState } from 'react';
import { UnitConfig, ExplanationDepth } from '../types';
import { SimulationManager } from '../simulations/simulationRegistry';
import { ThemeId } from '../utils/themeConfig';
import { CanvasSandbox } from './CanvasSandbox';
import { TextbookDepthCard } from './TextbookDepthCard';
import { POEQuiz } from './POEQuiz';
import { MiniJupyter } from './MiniJupyter';
import { MathView } from './MathView';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sigma,
} from 'lucide-react';

interface UnifiedLessonViewProps {
  unit: UnitConfig;
  simManager: SimulationManager;
  currentTheme: ThemeId;
  onNextUnit: () => void;
  hasNextUnit: boolean;
  onSyncSimulation?: (params: Record<string, any>) => void;
}

export const UnifiedLessonView: React.FC<UnifiedLessonViewProps> = ({
  unit,
  simManager,
  currentTheme,
  onNextUnit,
  hasNextUnit,
  onSyncSimulation,
}) => {
  const [depth, setDepth] = useState<ExplanationDepth>('simple');
  const [openMathProof, setOpenMathProof] = useState<boolean>(false);

  const mnemonic = unit.mnemonic || {
    eli5: 'Preprosta razlaga koncepta z vsakdanjim primerom.',
    anchor: 'Miselno sidro za trajno razumevanje.',
    fallacyWarning: {
      name: 'Past razmišljanja',
      description: 'Tipična napačna intuicija pri interpretaciji.',
      example: 'Pazi na napačno posploševanje majhnih vzorcev.',
    },
  };

  const wisdom = unit.explanationLevels || unit.textbookWisdom || {
    simpleQuote: 'Preprosta razlaga za vsakogar brez zapletenih formul.',
    simpleExplanation: unit.leadParagraph || mnemonic.eli5,
    practicalInsight: 'Uporabno pri delu s podatki in sprejemanju odločitev.',
    mathematicalTheory: 'Formalna definicija in analitične lastnosti.',
  };

  const mathProof = unit.mathProof || {
    summaryLatex: '',
    steps: [],
  };

  return (
    <main className="h-full overflow-y-auto bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 sm:py-16 px-6 sm:px-12 scroll-smooth">
      <div className="max-w-2xl mx-auto space-y-10 pb-24 text-base leading-relaxed">
        {/* 1. Header with uniform, calm typography */}
        <header className="space-y-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <p className="text-base text-slate-500 dark:text-slate-400">
            Lekcija {unit.unitNumber}
          </p>

          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            {unit.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-400">
            {unit.subtitle}
          </p>
        </header>

        {/* 2. Cohesive, unified conceptual explanation */}
        <section aria-label="Razlaga koncepta">
          <TextbookDepthCard
            wisdom={wisdom}
            explanationLevels={wisdom}
            mnemonic={mnemonic}
            depth={depth}
            onSelectDepth={setDepth}
          />
        </section>

        {/* 3. Interactive Simulation Canvas (Shown when simulation is present) */}
        {unit.hasSimulation !== false && (
          <section aria-label="Interaktivno platno" className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span>Interaktivna simulacija</span>
              <span className="font-mono">60 FPS</span>
            </div>

            <div className="h-[460px] sm:h-[520px] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative bg-slate-950">
              <CanvasSandbox
                unit={unit}
                simManager={simManager}
                currentTheme={currentTheme}
              />
            </div>
          </section>
        )}

        {/* 4. POE Self-Check Question */}
        {unit.poeQuiz && (
          <POEQuiz quiz={unit.poeQuiz} unitId={unit.id} />
        )}

        {/* 5. Optional Python Sandbox */}
        {unit.miniJupyter && (
          <section aria-label="Programska koda" className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <MiniJupyter config={unit.miniJupyter} onSyncSimulation={onSyncSimulation} />
          </section>
        )}

        {/* 6. Optional Mathematical Derivations */}
        {mathProof.steps && mathProof.steps.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setOpenMathProof(!openMathProof)}
              className="w-full flex items-center justify-between py-2 text-left text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sigma className="h-4 w-4 text-slate-400" />
                <span className="text-base font-semibold">
                  Matematične enačbe & formalni dokaz (neobvezno)
                </span>
              </div>
              {openMathProof ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {openMathProof && (
              <div className="pt-6 pb-2 space-y-4 animate-in fade-in">
                {mathProof.summaryLatex && (
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto">
                    <MathView math={mathProof.summaryLatex} block={true} />
                  </div>
                )}
                {mathProof.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <span className="text-base font-semibold text-slate-700 dark:text-slate-300 block">
                      {step.title}
                    </span>
                    <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto">
                      <MathView math={step.latex} block={true} />
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 7. Bottom Navigation to Next Lesson */}
        {hasNextUnit && (
          <nav aria-label="Nadaljevanje" className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={onNextUnit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-medium text-sm transition-all"
            >
              <span>Nadaljuj na naslednjo lekcijo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
};
