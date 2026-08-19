import React, { useState } from 'react';
import { POEQuizData } from '../types';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface POEQuizProps {
  quiz: POEQuizData;
  unitId: string;
}

export const POEQuiz: React.FC<POEQuizProps> = ({ quiz, unitId }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Reset selection when unitId changes
  React.useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
  }, [unitId]);

  const handleSelect = (optId: string) => {
    if (submitted) return;
    setSelectedOption(optId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    setSubmitted(true);
    const chosen = quiz.options.find(o => o.id === selectedOption);
    if (chosen?.isCorrect) {
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  return (
    <section
      aria-labelledby="poe-quiz-heading"
      className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800 text-base leading-relaxed text-slate-700 dark:text-slate-300"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="space-y-1 block">
            <h2
              id="poe-quiz-heading"
              className="text-base font-semibold text-slate-900 dark:text-slate-100"
            >
              Vprašanje za razmislek: {quiz.question}
            </h2>
            {quiz.prompt && (
              <p className="text-base text-slate-600 dark:text-slate-400">
                {quiz.prompt}
              </p>
            )}
          </legend>

          {/* Options List */}
          <div className="space-y-2 pt-2" role="radiogroup" aria-labelledby="poe-quiz-heading">
            {quiz.options.map(option => {
              const isSelected = selectedOption === option.id;

              let optionStyle =
                'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300';

              if (isSelected && !submitted) {
                optionStyle =
                  'border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium';
              }

              if (submitted) {
                if (option.isCorrect) {
                  optionStyle =
                    'border-emerald-600 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-100';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle =
                    'border-rose-500 dark:border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-950 dark:text-rose-100';
                } else {
                  optionStyle =
                    'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600';
                }
              }

              return (
                <label
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-base transition-all cursor-pointer select-none ${optionStyle}`}
                >
                  <input
                    type="radio"
                    name="poe-quiz-option"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => handleSelect(option.id)}
                    disabled={submitted}
                    className="sr-only"
                  />
                  <div className="mt-1 shrink-0">
                    {submitted && option.isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : submitted && isSelected && !option.isCorrect ? (
                      <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block">{option.text}</span>
                    {submitted && isSelected && (
                      <p className="mt-2 text-base text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-2">
                        {option.explanation}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Submit action */}
        {!submitted ? (
          <button
            type="submit"
            disabled={!selectedOption}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span>Preveri odgovor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <div className="pt-2 space-y-2 animate-in fade-in">
            <div className="text-base text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                Ugotovitev:
              </span>
              {quiz.insight}
            </div>

            {quiz.followUpExperiment && (
              <p className="text-base text-slate-600 dark:text-slate-400">
                Naloga na platnu: {quiz.followUpExperiment}
              </p>
            )}
          </div>
        )}
      </form>
    </section>
  );
};
