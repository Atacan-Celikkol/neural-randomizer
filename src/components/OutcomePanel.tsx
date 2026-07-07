/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { Copy, Check, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { LogEntry, LogCategory, DecisionOutcome } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface OutcomePanelProps {
  outcome: DecisionOutcome | null;
  isDeciding: boolean;
  logs: LogEntry[];
  onFlushBuffer: () => void;
  onReDecide?: () => void;
  addLog: (text: string, category: LogCategory) => void;
}

export default function OutcomePanel(props: OutcomePanelProps) {
  const { outcome, isDeciding, logs, onFlushBuffer, onReDecide, addLog } = props;
  const { t } = useLanguage();
  const logEndRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto scroll logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleCopy = () => {
    if (!outcome) return;
    navigator.clipboard.writeText(outcome.value);
    setCopied(true);
    
    const logMsg = t.logCopied.replace('{val}', outcome.value);
    addLog(logMsg, LogCategory.SYSTEM);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat: LogCategory) => {
    switch (cat) {
      case LogCategory.SYSTEM:
        return 'text-peloka-blue bg-peloka-blue/10 border-peloka-blue/20';
      case LogCategory.PATHWAY:
        return 'text-peloka-primary bg-peloka-primary/10 border-peloka-primary/20';
      case LogCategory.CALCULATION:
        return 'text-peloka-teal bg-peloka-teal/10 border-peloka-teal/20';
      case LogCategory.NODE:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case LogCategory.ERROR:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="flex flex-col h-full border border-peloka-surface-high/60 rounded-2xl bg-peloka-surface-container-low/90 backdrop-blur-md overflow-hidden relative shadow-xl">
      {/* Glow effect at top corners */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-peloka-primary/40 to-transparent" />
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-peloka-surface-high/50 bg-peloka-bg-dark/20 select-none">
        <span className="font-geist text-xs font-bold tracking-widest text-peloka-on-surface-variant uppercase flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-peloka-primary animate-pulse" />
          {t.outcomeNode}
        </span>
        {outcome && !isDeciding && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
              {t.calibrated}
            </span>
          </div>
        )}
      </div>

      {/* Main Display Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[220px] md:min-h-[280px] relative overflow-hidden bg-peloka-bg-dark/15">
        {/* Subtle decorative background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,183,125,0.03)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {isDeciding ? (
          /* DECIDING LOADING SIMULATION */
          <div className="flex flex-col items-center justify-center w-full h-full relative z-10 animate-fade-in">
            {/* Holographic Glowing Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-peloka-primary/20 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-2 rounded-full border border-peloka-blue/30 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-peloka-primary/10 to-transparent flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-peloka-primary animate-spin" style={{ animationDuration: '1.5s' }} />
              </div>
            </div>

            <span className="font-display text-lg font-bold tracking-wide text-peloka-primary animate-pulse-glow">
              {t.resolvingSynapses}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-peloka-on-surface-variant/60 mt-1 uppercase">
              {t.entropyMatching}
            </span>

            {/* Scanning Line overlay */}
            <div className="absolute left-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-peloka-primary to-transparent animate-scan opacity-60 pointer-events-none" />
          </div>
        ) : outcome ? (
          /* DECISION COMPLETED RESOLVED STATE */
          <div className="flex flex-col items-center justify-center text-center w-full z-10 animate-fade-in">
            {/* Visual glow backdrop */}
            <div className="absolute w-40 h-40 bg-peloka-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-12 h-12 rounded-xl bg-peloka-primary/10 border border-peloka-primary/35 flex items-center justify-center mb-4 text-peloka-primary animate-bounce shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>

            <span className="font-mono text-[10px] tracking-widest text-peloka-on-surface-variant/70 uppercase mb-2">
              {t.resolvedOutput}
            </span>

            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-peloka-primary px-4 py-2 bg-gradient-to-b from-white to-peloka-primary/90 bg-clip-text text-transparent break-all max-w-full drop-shadow">
              {outcome.value}
            </h3>

            {outcome.additionalInfo && (
              <p className="font-sans text-xs text-peloka-on-surface-variant mt-2 max-w-[280px] leading-relaxed italic border-t border-peloka-surface-high/30 pt-2 bg-peloka-bg-dark/10 px-3 py-1.5 rounded-lg">
                {outcome.additionalInfo}
              </p>
            )}

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleCopy}
                className="px-4 py-1.5 rounded-lg text-xs font-sans font-medium bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/60 text-peloka-on-surface hover:text-peloka-primary transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copy}</span>
                  </>
                )}
              </button>

              {onReDecide && (
                <button
                  onClick={onReDecide}
                  className="px-4 py-1.5 rounded-lg text-xs font-sans font-medium bg-peloka-primary/10 hover:bg-peloka-primary/20 border border-peloka-primary/25 text-peloka-primary transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.decideAgain}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* AWAITING SIGNAL INITIAL STATE */
          <div className="flex flex-col items-center justify-center text-center z-10">
            {/* Gentle ambient pulsing dot */}
            <div className="relative w-12 h-12 flex items-center justify-center mb-5">
              <div className="absolute w-12 h-12 rounded-full border border-peloka-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute w-8 h-8 rounded-full border border-peloka-primary/40 animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-peloka-primary animate-pulse" />
            </div>

            <h3 className="font-display text-xl md:text-2xl font-bold tracking-wide text-peloka-on-surface">
              {t.awaitingSignal}
            </h3>
            <p className="font-sans text-xs text-peloka-on-surface-variant/70 mt-1 max-w-[220px]">
              {t.awaitingSignalDesc}
            </p>
          </div>
        )}
      </div>

      {/* integrated Neural Log Terminal */}
      <div className="border-t border-peloka-surface-high/60 bg-peloka-bg-dark/30 flex flex-col h-[200px] shrink-0">
        <div className="flex items-center justify-between px-4 py-2 border-b border-peloka-surface-high/40 bg-peloka-bg-dark/10 select-none">
          <span className="font-mono text-[9px] tracking-widest text-peloka-on-surface-variant/80 uppercase font-semibold">
            {t.neuralLog}
          </span>
          <button
            onClick={onFlushBuffer}
            className="font-mono text-[9px] text-peloka-on-surface-variant hover:text-rose-400 transition-colors uppercase cursor-pointer hover:underline bg-transparent border-none py-0.5"
          >
            {t.flushBuffer}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed flex flex-col gap-1.5 select-text">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 animate-fade-in break-all">
              <span className="text-peloka-on-surface-variant/40 shrink-0">[{log.timestamp}]</span>
              <span className={`text-[9px] font-bold px-1 rounded border shrink-0 uppercase tracking-wider scale-95 ${getCategoryColor(log.category)}`}>
                {log.category}
              </span>
              <span className="text-peloka-on-surface/90 flex-1">
                {log.text}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
