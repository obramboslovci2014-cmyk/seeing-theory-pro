import React from 'react';
import { ExplanationLevels, ExplanationDepth, MnemonicCard } from '../types';

interface TextbookDepthCardProps {
  wisdom?: ExplanationLevels;
  explanationLevels?: ExplanationLevels;
  mnemonic: MnemonicCard;
  depth: ExplanationDepth;
  onSelectDepth: (depth: ExplanationDepth) => void;
}

export const TextbookDepthCard: React.FC<TextbookDepthCardProps> = ({
  wisdom,
  explanationLevels,
  mnemonic,
  depth,
  onSelectDepth,
}) => {
  const levels = explanationLevels || wisdom || {
    simpleQuote: 'Preprosta razlaga za vsakogar brez zapletenih formul.',
    simpleExplanation: mnemonic.eli5,
    practicalInsight: 'Uporabno pri delu s podatki in sprejemanju odločitev.',
    mathematicalTheory: 'Formalna definicija in analitične lastnosti.',
  };

  const depthTabs: { id: ExplanationDepth; label: string }[] = [
    { id: 'simple', label: 'Razlaga' },
    { id: 'deep', label: 'Uporaba v praksi' },
    { id: 'math', label: 'Matematična teorija' },
  ];

  return (
    <div className="space-y-6 select-text text-base leading-relaxed text-slate-700 dark:text-slate-300">
      {/* 1. Preklopnik globine (enotna velikost in stil) */}
      <nav aria-label="Globina razlage" className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {depthTabs.map(tab => {
          const isActive = depth === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectDepth(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* RAZLAGA KONCEPTA - popolnoma enotna velikost pisave in jasen pomen */}
      {depth === 'simple' && (
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Kaj je to in zakaj je pomembno
            </h2>
            {levels.simpleQuote && (
              <p className="text-base text-slate-900 dark:text-slate-100">
                {levels.simpleQuote}
              </p>
            )}
            <p className="text-base text-slate-700 dark:text-slate-300">
              {levels.simpleExplanation || mnemonic.eli5}
            </p>
          </section>

          {mnemonic.eli5 && (
            <section className="space-y-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Primer iz vsakdanjega življenja
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300">
                {mnemonic.eli5}
              </p>
              {mnemonic.anchor && (
                <p className="text-base text-slate-600 dark:text-slate-400">
                  Miselno sidro: {mnemonic.anchor}
                </p>
              )}
            </section>
          )}

          {mnemonic.fallacyWarning && (
            <section className="space-y-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Na kaj moramo paziti ({mnemonic.fallacyWarning.name})
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300">
                {mnemonic.fallacyWarning.description}
              </p>
            </section>
          )}
        </div>
      )}

      {/* UPORABA V PRAKSI */}
      {depth === 'deep' && (
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Pomen za odločanje in delo s podatki
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300">
              {levels.practicalInsight ||
                'V praksi ta koncept določa, koliko podatkov potrebujemo za zanesljivo statistično sklepanje.'}
            </p>
          </section>

          <section className="space-y-2 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Kje se to neposredno uporablja
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-base text-slate-700 dark:text-slate-300">
              <li>Pri anketiranju javnega mnenja (izbira ustrezne velikosti vzorca).</li>
              <li>Pri kliničnih testiranjih zdravil (izločanje vpliva naključja).</li>
              <li>V igralništvu in zavarovalništvu za natančen izračun tveganj.</li>
            </ul>
          </section>
        </div>
      )}

      {/* MATEMATIČNA TEORIJA */}
      {depth === 'math' && (
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Formalna matematična definicija
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300">
              {levels.mathematicalTheory ||
                'Formalna matematična opredelitev verjetnostnih prostorov in konvergence naključnih spremenljivk.'}
            </p>
          </section>

          <p className="text-base text-slate-600 dark:text-slate-400 pt-6 border-t border-slate-100 dark:border-slate-800">
            Podrobno analitično izpeljavo z enačbami po korakih si lahko ogledate v spodnjem razdelku »Matematične enačbe & izpeljava«.
          </p>
        </div>
      )}
    </div>
  );
};
