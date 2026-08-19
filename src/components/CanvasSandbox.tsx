import React, { useRef, useEffect, useState } from 'react';
import { UnitConfig } from '../types';
import { SimulationManager } from '../simulations/simulationRegistry';
import { CueBanner } from './CueBanner';
import { ActionHUD } from './ActionHUD';
import { ThemeId, THEMES } from '../utils/themeConfig';

interface CanvasSandboxProps {
  unit: UnitConfig;
  simManager: SimulationManager;
  currentTheme: ThemeId;
}

export const CanvasSandbox: React.FC<CanvasSandboxProps> = ({
  unit,
  simManager,
  currentTheme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

  // Synchronize unit & theme
  useEffect(() => {
    simManager.setUnit(unit.id);
    simManager.setTheme(THEMES[currentTheme] || THEMES.indigo);
    setIsAutoRunning(false);
  }, [unit.id, currentTheme, simManager]);

  // Canvas loop & high-DPI sizing
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = container.clientWidth;
          const height = container.clientHeight;
          const dpr = window.devicePixelRatio || 1;

          if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
          }

          ctx.save();
          ctx.scale(dpr, dpr);
          simManager.update();
          simManager.render(ctx, width, height);
          ctx.restore();
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [simManager]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    simManager.handleCanvasClick(x, y, rect.width, rect.height);
  };

  const handleAddSample = (count: number) => {
    simManager.addSample(count);
  };

  const handleToggleAuto = () => {
    const running = simManager.toggleAuto();
    setIsAutoRunning(running);
  };

  const handleReset = () => {
    simManager.resetCurrent();
    setIsAutoRunning(false);
  };

  const cueText = unit.cueBannerText || 'Izberite [+1 Vzorec] ali kliknite na platno za interakcijo.';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-slate-950/90 overflow-hidden select-none flex items-center justify-center"
    >
      {/* Floating Pedagogical Instruction Cue */}
      <CueBanner cueText={cueText} />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-crosshair active:cursor-grabbing block"
      />

      {/* Floating Action HUD Dock */}
      <ActionHUD
        onAddSample={handleAddSample}
        onToggleAuto={handleToggleAuto}
        onReset={handleReset}
        isAutoRunning={isAutoRunning}
        sampleButtonLabel="+1 Vzorec"
      />
    </div>
  );
};
