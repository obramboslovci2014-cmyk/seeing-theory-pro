import React, { useState } from 'react';
import { MiniJupyterConfig } from '../types';
import { Terminal, Play, RotateCcw, Check, Copy } from 'lucide-react';

interface MiniJupyterProps {
  config: MiniJupyterConfig;
  onSyncSimulation?: (params: Record<string, any>) => void;
}

export const MiniJupyter: React.FC<MiniJupyterProps> = ({ config, onSyncSimulation }) => {
  const [activeLang, setActiveLang] = useState<'python' | 'r'>('python');
  const [code, setCode] = useState<string>(config.defaultCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Update default code when config changes
  React.useEffect(() => {
    setCode(activeLang === 'python' ? config.defaultCode : config.rCode || config.defaultCode);
    setOutput('');
  }, [config, activeLang]);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      try {
        const result = config.runCode(code);
        setOutput(result.output);
        if (result.simState && onSyncSimulation) {
          onSyncSimulation(result.simState);
        }
      } catch (err: any) {
        setOutput(`Error: ${err.message || String(err)}`);
      } finally {
        setIsRunning(false);
      }
    }, 150);
  };

  const handleReset = () => {
    setCode(activeLang === 'python' ? config.defaultCode : config.rCode || config.defaultCode);
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg font-mono text-xs">
      {/* Jupyter Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold text-slate-200 font-sans">
            Mini-Jupyter Sandbox
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
            {activeLang.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {config.rCode && (
            <div className="flex rounded-md bg-slate-800 p-0.5 text-[11px] font-sans">
              <button
                onClick={() => setActiveLang('python')}
                className={`px-2 py-0.5 rounded ${activeLang === 'python' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveLang('r')}
                className={`px-2 py-0.5 rounded ${activeLang === 'r' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              >
                R
              </button>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Kopiraj kodo"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Ponastavi kodo"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] font-sans shadow transition-colors"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Zaženi</span>
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="p-3 bg-slate-950/90 relative">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={Math.max(4, code.split('\n').length)}
          className="w-full bg-transparent text-emerald-300 focus:outline-none resize-none leading-relaxed font-mono selection:bg-emerald-900/50"
          spellCheck={false}
        />
      </div>

      {/* Output Console */}
      {output && (
        <div className="border-t border-slate-800/80 bg-slate-900/60 p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1 font-sans">
            Izhod konzole [Out]:
          </div>
          <pre className="text-slate-200 font-mono whitespace-pre-wrap leading-tight text-[11px]">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};
