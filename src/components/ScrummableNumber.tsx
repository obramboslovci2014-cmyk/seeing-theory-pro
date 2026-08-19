import React, { useState, useRef, useEffect } from 'react';

interface ScrummableNumberProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  format?: (val: number) => string;
  onChange: (newVal: number) => void;
  label?: string;
  unit?: string;
}

export const ScrummableNumber: React.FC<ScrummableNumberProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  format,
  onChange,
  label,
  unit = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startValRef = useRef<number>(value);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startXRef.current;
      const range = max - min;
      const deltaVal = (dx / 150) * range;
      let rawVal = startValRef.current + deltaVal;

      // Snap to step
      const stepsCount = Math.round((rawVal - min) / step);
      const steppedVal = Math.max(min, Math.min(max, min + stepsCount * step));
      onChange(Number(steppedVal.toFixed(2)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, min, max, step, onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startValRef.current = value;
  };

  const displayText = format ? format(value) : `${value}${unit}`;

  return (
    <span
      onMouseDown={handleMouseDown}
      className={`inline-flex items-center gap-0.5 px-2 py-0.5 mx-1 rounded-md font-mono text-xs font-semibold cursor-ew-resize select-none border transition-all duration-150 ${
        isDragging
          ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-500/50 shadow-md scale-105'
          : 'bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 border-indigo-500/30 hover:border-indigo-400/80 shadow-sm'
      }`}
      title="Povleci levo/desno za spremembo vrednosti"
    >
      {label && <span className="opacity-75 mr-0.5">{label}:</span>}
      <span className="underline decoration-dotted underline-offset-2">{displayText}</span>
      <span className="text-[10px] opacity-60 ml-0.5">↔</span>
    </span>
  );
};
