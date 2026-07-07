/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Zap, Disc, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface QuickDecideTabProps {
  onQuickDecide: (type: 'yesno' | 'coin' | 'custom_binary', data?: any) => void;
  isDeciding: boolean;
  addLog: (text: string, category: any) => void;
}

export default function QuickDecideTab(props: QuickDecideTabProps) {
  const { onQuickDecide, isDeciding, addLog } = props;
  const { t, language } = useLanguage();
  
  // Set placeholders based on language
  const defaultAlpha = language === 'tr' ? 'Seçenek A' : 'Option Left';
  const defaultBeta = language === 'tr' ? 'Seçenek B' : 'Option Right';
  
  const [choiceA, setChoiceA] = useState(defaultAlpha);
  const [choiceB, setChoiceB] = useState(defaultBeta);

  const triggerYesNo = () => {
    addLog(t.logOracleQuery, 'SYS');
    onQuickDecide('yesno');
  };

  const triggerCoinFlip = () => {
    addLog(t.logCoinFlipQuery, 'SYS');
    onQuickDecide('coin');
  };

  const triggerCustomBinary = () => {
    if (!choiceA.trim() || !choiceB.trim()) {
      addLog(t.logValidationErrorBinary, 'ERROR');
      return;
    }
    const logMsg = t.logCustomBinaryCollision
      .replace('{choiceA}', choiceA)
      .replace('{choiceB}', choiceB);
    addLog(logMsg, 'SYS');
    onQuickDecide('custom_binary', { choiceA, choiceB });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Oracle YES/NO */}
      <div className="p-4 rounded-xl bg-peloka-bg-dark/40 border border-peloka-surface-highest/30 hover:border-peloka-primary/30 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-peloka-primary/10 border border-peloka-primary/30 flex items-center justify-center text-peloka-primary group-hover:scale-110 transition-transform duration-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-peloka-on-surface">{t.oracleTitle}</h4>
            <p className="font-sans text-xs text-peloka-on-surface-variant/70">{t.oracleDesc}</p>
          </div>
        </div>
        <button
          onClick={triggerYesNo}
          disabled={isDeciding}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-display text-xs font-semibold uppercase tracking-wider text-peloka-on-primary bg-peloka-primary hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-peloka-primary/10"
        >
          <Zap className="w-3.5 h-3.5" />
          {t.askOracle}
        </button>
      </div>

      {/* Coin Flip */}
      <div className="p-4 rounded-xl bg-peloka-bg-dark/40 border border-peloka-surface-highest/30 hover:border-peloka-blue/30 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-peloka-blue/10 border border-peloka-blue/30 flex items-center justify-center text-peloka-blue group-hover:scale-110 transition-transform duration-300">
            <Disc className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-peloka-on-surface">{t.headsTailsTitle}</h4>
            <p className="font-sans text-xs text-peloka-on-surface-variant/70">{t.headsTailsDesc}</p>
          </div>
        </div>
        <button
          onClick={triggerCoinFlip}
          disabled={isDeciding}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-display text-xs font-semibold uppercase tracking-wider text-peloka-blue-dark bg-peloka-blue hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-peloka-blue/10"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {t.flipCoin}
        </button>
      </div>

      {/* Custom Binary Confrontation */}
      <div className="p-4 rounded-xl bg-peloka-bg-dark/40 border border-peloka-surface-highest/30 hover:border-peloka-bronze/30 transition-all duration-300 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-1 border-b border-peloka-surface-highest/20">
          <span className="font-geist text-[10px] font-semibold tracking-wider text-peloka-on-surface-variant uppercase flex items-center gap-2">
            <ArrowRightLeft className="w-3.5 h-3.5 text-peloka-bronze" />
            {t.customBinaryTitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[9px] text-peloka-on-surface-variant uppercase">{t.nodeAlpha}</span>
            <input
              type="text"
              value={choiceA}
              onChange={(e) => setChoiceA(e.target.value)}
              disabled={isDeciding}
              placeholder="e.g., Option Alpha"
              className="px-3 py-2.5 rounded-lg bg-peloka-bg-dark border border-peloka-surface-highest text-peloka-on-surface font-sans text-xs placeholder-peloka-on-surface-variant/30 outline-none focus:border-peloka-bronze/60 focus:ring-1 focus:ring-peloka-bronze/30 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[9px] text-peloka-on-surface-variant uppercase">{t.nodeBeta}</span>
            <input
              type="text"
              value={choiceB}
              onChange={(e) => setChoiceB(e.target.value)}
              disabled={isDeciding}
              placeholder="e.g., Option Beta"
              className="px-3 py-2.5 rounded-lg bg-peloka-bg-dark border border-peloka-surface-highest text-peloka-on-surface font-sans text-xs placeholder-peloka-on-surface-variant/30 outline-none focus:border-peloka-bronze/60 focus:ring-1 focus:ring-peloka-bronze/30 transition-all"
            />
          </div>
        </div>

        <button
          onClick={triggerCustomBinary}
          disabled={isDeciding}
          className="w-full mt-1 py-3 rounded-lg font-display text-xs font-bold uppercase tracking-wider text-peloka-on-primary bg-gradient-to-r from-peloka-bronze to-peloka-primary hover:brightness-110 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <span>{t.collideNodes}</span>
        </button>
      </div>
    </div>
  );
}
