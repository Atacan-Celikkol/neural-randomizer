/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sliders, Shuffle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface RangeTabProps {
  onDecideRange: (min: number, max: number, count: number, decimal: boolean, allowDuplicates: boolean) => void;
  isDeciding: boolean;
  addLog: (text: string, category: any) => void;
}

export default function RangeTab(props: RangeTabProps) {
  const { onDecideRange, isDeciding, addLog } = props;
  const { t } = useLanguage();
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(1);
  const [decimal, setDecimal] = useState<boolean>(false);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);

  const triggerDecision = () => {
    // Basic validations
    if (min >= max) {
      addLog(t.logValidationErrorRange, 'ERROR');
      return;
    }
    if (count < 1 || count > 100) {
      addLog(t.logValidationErrorCount, 'ERROR');
      return;
    }
    // If not allowing duplicates and not decimal, verify range is large enough
    if (!decimal && !allowDuplicates && (max - min + 1) < count) {
      addLog(t.logValidationSpace, 'ERROR');
      return;
    }

    onDecideRange(min, max, count, decimal, allowDuplicates);
  };

  const handleShortcut = (shMin: number, shMax: number, shCount: number) => {
    setMin(shMin);
    setMax(shMax);
    setCount(shCount);
    setDecimal(false);
    
    const logMsg = t.logPresetRange
      .replace('{min}', shMin.toString())
      .replace('{max}', shMax.toString())
      .replace('{count}', shCount.toString());
    addLog(logMsg, 'SYS');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Parameters Form */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-geist text-[10px] font-bold tracking-wider text-peloka-on-surface-variant uppercase">
            {t.minLimit}
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            disabled={isDeciding}
            className="w-full px-3 py-2.5 rounded-lg bg-peloka-bg-dark border border-peloka-surface-highest/60 focus:border-peloka-primary focus:ring-1 focus:ring-peloka-primary text-peloka-on-surface font-mono text-base md:text-sm outline-none transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-geist text-[10px] font-bold tracking-wider text-peloka-on-surface-variant uppercase">
            {t.maxLimit}
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            disabled={isDeciding}
            className="w-full px-3 py-2.5 rounded-lg bg-peloka-bg-dark border border-peloka-surface-highest/60 focus:border-peloka-primary focus:ring-1 focus:ring-peloka-primary text-peloka-on-surface font-mono text-base md:text-sm outline-none transition-all duration-300"
          />
        </div>
      </div>

      {/* Synaptic Threshold Header */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-peloka-bg-dark/40 border border-peloka-surface-highest/30">
        <span className="font-geist text-[10px] font-semibold tracking-wider text-peloka-on-surface-variant uppercase flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-peloka-blue" />
          {t.synapticThreshold}
        </span>

        {/* Outputs Count */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs font-medium text-peloka-on-surface">
              {t.vectorDimensions}
            </span>
            <span className="font-sans text-[10px] text-peloka-on-surface-variant/70">
              {t.outputsToGenerate}
            </span>
          </div>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            disabled={isDeciding}
            className="w-16 px-2 py-1 font-mono text-center text-base md:text-xs bg-peloka-bg-dark border border-peloka-surface-highest text-peloka-primary rounded outline-none"
          />
        </div>

        {/* Synaptic Precision Toggle */}
        <div className="flex items-center justify-between pt-2.5 border-t border-peloka-surface-highest/10">
          <div className="flex flex-col">
            <span className="font-sans text-xs font-medium text-peloka-on-surface">{t.synapticPrecision}</span>
            <span className="font-sans text-[10px] text-peloka-on-surface-variant/70">{t.generateFloat}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={decimal}
              onChange={(e) => setDecimal(e.target.checked)}
              disabled={isDeciding}
              className="sr-only"
            />
            <div className={`w-9 h-5 rounded-full transition-all duration-300 ${
              decimal ? 'bg-peloka-primary' : 'bg-peloka-surface-highest/80'
            }`} />
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-peloka-surface transition-transform duration-300 shadow-sm ${
              decimal ? 'translate-x-4 bg-peloka-on-primary' : 'translate-x-0'
            }`} />
          </label>
        </div>

        {/* Duplicate Selection Toggle (Only shows if count > 1 and not decimal) */}
        {count > 1 && !decimal && (
          <div className="flex items-center justify-between pt-2.5 border-t border-peloka-surface-highest/10 animate-fade-in">
            <div className="flex flex-col">
              <span className="font-sans text-xs font-medium text-peloka-on-surface">{t.allowOverlap}</span>
              <span className="font-sans text-[10px] text-peloka-on-surface-variant/70">{t.allowDuplicates}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                disabled={isDeciding}
                className="sr-only"
              />
              <div className={`w-9 h-5 rounded-full transition-all duration-300 ${
                allowDuplicates ? 'bg-peloka-primary' : 'bg-peloka-surface-highest/80'
              }`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-peloka-surface transition-transform duration-300 shadow-sm ${
                allowDuplicates ? 'translate-x-4 bg-peloka-on-primary' : 'translate-x-0'
              }`} />
            </label>
          </div>
        )}
      </div>

      {/* Shortcuts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] text-peloka-on-surface-variant/60 uppercase mr-1">{t.shortcuts}</span>
        <button
          onClick={() => handleShortcut(1, 10, 1)}
          disabled={isDeciding}
          className="px-2 py-0.5 text-[11px] font-mono rounded bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/50 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-200 cursor-pointer"
        >
          1 - 10
        </button>
        <button
          onClick={() => handleShortcut(1, 100, 1)}
          disabled={isDeciding}
          className="px-2 py-0.5 text-[11px] font-mono rounded bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/50 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-200 cursor-pointer"
        >
          1 - 100
        </button>
        <button
          onClick={() => handleShortcut(1, 6, 1)}
          disabled={isDeciding}
          className="px-2 py-0.5 text-[11px] font-mono rounded bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/50 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-200 cursor-pointer"
        >
          1 - 6 (D6)
        </button>
        <button
          onClick={() => handleShortcut(1, 20, 1)}
          disabled={isDeciding}
          className="px-2 py-0.5 text-[11px] font-mono rounded bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/50 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-200 cursor-pointer"
        >
          1 - 20 (D20)
        </button>
      </div>

      {/* Decide Button */}
      <button
        onClick={triggerDecision}
        disabled={isDeciding}
        className="w-full mt-2 py-4 rounded-xl font-display font-bold text-sm text-peloka-on-primary bg-gradient-to-r from-peloka-primary to-peloka-bronze hover:brightness-110 active:brightness-95 disabled:opacity-40 disabled:brightness-100 transition-all duration-300 shadow-md hover:shadow-lg glow-orange flex items-center justify-center gap-2 uppercase tracking-wider relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Shuffle className="w-4 h-4 animate-pulse group-hover:rotate-180 transition-transform duration-500" />
        <span>{t.decideRangeButton}</span>
      </button>
    </div>
  );
}
