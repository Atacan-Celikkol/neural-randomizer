/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Cpu, ListCollapse, Sliders, Zap } from 'lucide-react';
import Header from './components/Header';
import ListPickerTab from './components/ListPickerTab';
import RangeTab from './components/RangeTab';
import QuickDecideTab from './components/QuickDecideTab';
import OutcomePanel from './components/OutcomePanel';
import InfoModal from './components/InfoModal';
import { TabType, LogEntry, LogCategory, DecisionOutcome } from './types';
import { useLanguage } from './lib/LanguageContext';

export default function App() {
  const { t, language } = useLanguage();
  const outcomeRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<TabType>('list');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outcome, setOutcome] = useState<DecisionOutcome | null>(null);
  const [isDeciding, setIsDeciding] = useState<boolean>(false);
  const [systemStatus, setSystemStatus] = useState<'NOMINAL' | 'CALIBRATING' | 'DECIDING' | 'COMPLETED'>('NOMINAL');
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  // We track what active parameters were used for Re-decide
  const [lastRunConfig, setLastRunConfig] = useState<{
    tab: TabType;
    data: any;
  } | null>(null);

  // Sync dark class and theme color meta tags to root on change
  useEffect(() => {
    const root = document.documentElement;
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    if (darkMode) {
      root.classList.add('dark');
      metaThemeColor.setAttribute('content', '#150c06'); // Match dark background
    } else {
      root.classList.remove('dark');
      metaThemeColor.setAttribute('content', '#efeae2'); // Match light background
    }
  }, [darkMode]);

  // Seed initial translated logs once translations are loaded or language switches
  useEffect(() => {
    // Only seed if empty or previously loaded in different language
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    setLogs([
      {
        id: 'init-1',
        timestamp: timeStr,
        category: LogCategory.SYSTEM,
        text: t.logInitCore,
      },
      {
        id: 'init-2',
        timestamp: timeStr,
        category: LogCategory.PATHWAY,
        text: t.logInitCalib,
      },
      {
        id: 'init-3',
        timestamp: timeStr,
        category: LogCategory.SYSTEM,
        text: t.logInitReady,
      },
    ]);
  }, [language]);

  const addLog = (text: string, category: LogCategory) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        timestamp: timeStr,
        category,
        text,
      },
    ]);
  };

  const handleFlushBuffer = () => {
    setLogs([]);
    addLog(t.logFlush, LogCategory.SYSTEM);
  };

  const executeNeuralSimulation = (
    calculationTask: () => { value: string; info?: string },
    config: { tab: TabType; data: any }
  ) => {
    setIsDeciding(true);
    setSystemStatus('DECIDING');
    setOutcome(null);
    setLastRunConfig(config);

    // Smoothly scroll to the Outcome Node so the user immediately sees the visual feedback (especially on mobile devices)
    setTimeout(() => {
      outcomeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);

    // Simulated premium high-tech delay sequence
    setTimeout(() => {
      addLog(t.logCognitive, LogCategory.SYSTEM);
    }, 150);

    setTimeout(() => {
      addLog(t.logMapping, LogCategory.PATHWAY);
    }, 450);

    setTimeout(() => {
      addLog(t.logEvaluating, LogCategory.CALCULATION);
    }, 850);

    setTimeout(() => {
      try {
        const result = calculationTask();
        const outcomeObj: DecisionOutcome = {
          id: Math.random().toString(),
          value: result.value,
          method: config.tab.toUpperCase(),
          timestamp: new Date().toLocaleTimeString(),
          additionalInfo: result.info,
        };
        setOutcome(outcomeObj);
        setIsDeciding(false);
        setSystemStatus('COMPLETED');
        
        const logMsg = t.logOutcomeResolved.replace('"{val}"', `"${result.value}"`);
        addLog(`${logMsg} "${result.value}"`, LogCategory.NODE);
      } catch (err: any) {
        setIsDeciding(false);
        setSystemStatus('NOMINAL');
        addLog(`${t.logDecideAborted} ${err.message || 'Unknown error'}`, LogCategory.ERROR);
      }
    }, 1400);
  };

  // 1. List Picker Core Action
  const handleDecideList = (items: string[], weighted: boolean, weights?: number[]) => {
    if (items.length === 0) return;

    executeNeuralSimulation(() => {
      let selectedIndex = 0;
      let infoString = '';

      if (weighted && weights && weights.length === items.length) {
        // Weighted selection algorithm
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        const randomThreshold = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        
        for (let i = 0; i < items.length; i++) {
          cumulativeWeight += weights[i];
          if (randomThreshold <= cumulativeWeight) {
            selectedIndex = i;
            break;
          }
        }
        
        const probabilityPercent = ((weights[selectedIndex] / totalWeight) * 100).toFixed(1);
        infoString = t.infoWeighted
          .replace('{probability}', probabilityPercent)
          .replace('{weight}', weights[selectedIndex].toString())
          .replace('{total}', totalWeight.toString());
      } else {
        // Uniform random selection
        selectedIndex = Math.floor(Math.random() * items.length);
        const probabilityPercent = (100 / items.length).toFixed(1);
        infoString = t.infoUniform.replace('{probability}', probabilityPercent);
      }

      return {
        value: items[selectedIndex],
        info: infoString,
      };
    }, {
      tab: 'list',
      data: { items, weighted, weights },
    });
  };

  // 2. Range Picker Core Action
  const handleDecideRange = (
    min: number,
    max: number,
    count: number,
    decimal: boolean,
    allowDuplicates: boolean
  ) => {
    executeNeuralSimulation(() => {
      const results: string[] = [];
      const difference = max - min;

      // Handle custom boundary error checking
      if (!decimal && !allowDuplicates && difference + 1 < count) {
        throw new Error(t.logValidationSpace);
      }

      if (decimal) {
        for (let i = 0; i < count; i++) {
          let num = min + Math.random() * difference;
          results.push(num.toFixed(3));
        }
      } else {
        // Integer selection
        const used = new Set<number>();
        for (let i = 0; i < count; i++) {
          let attempts = 0;
          let num = Math.floor(min + Math.random() * (difference + 1));
          
          while (!allowDuplicates && used.has(num) && attempts < 1000) {
            num = Math.floor(min + Math.random() * (difference + 1));
            attempts++;
          }
          
          used.add(num);
          results.push(num.toString());
        }
      }

      const generatedString = results.join(', ');
      return {
        value: count === 1 ? results[0] : `[ ${generatedString} ]`,
        info: t.infoRangeSweep
          .replace('{min}', min.toString())
          .replace('{max}', max.toString())
          .replace('{count}', count.toString()),
      };
    }, {
      tab: 'range',
      data: { min, max, count, decimal, allowDuplicates },
    });
  };

  // 3. Quick Decide Core Action
  const handleQuickDecide = (type: 'yesno' | 'coin' | 'custom_binary', data?: any) => {
    executeNeuralSimulation(() => {
      if (type === 'yesno') {
        const yesNoKeys = ['YES', 'NO', 'ABSOLUTELY', 'UNLIKELY', 'RECALIBRATE'] as const;
        const chosenKey = yesNoKeys[Math.floor(Math.random() * yesNoKeys.length)];
        const item = t.yesnoValues[chosenKey];
        return {
          value: item.value,
          info: item.info
        };
      } else if (type === 'coin') {
        const coinKeys = ['HEADS', 'TAILS'] as const;
        const chosenKey = coinKeys[Math.floor(Math.random() * coinKeys.length)];
        const item = t.coinValues[chosenKey];
        return {
          value: item.value,
          info: item.info
        };
      } else {
        // Custom binary choice
        const options = [data.choiceA, data.choiceB];
        const winnerIdx = Math.floor(Math.random() * 2);
        const loserIdx = winnerIdx === 0 ? 1 : 0;
        return {
          value: options[winnerIdx],
          info: t.infoBinaryWon
            .replace('{winner}', options[winnerIdx])
            .replace('{loser}', options[loserIdx]),
        };
      }
    }, {
      tab: 'quick',
      data: { type, data },
    });
  };

  // Re-run the last active configuration
  const handleReDecide = () => {
    if (!lastRunConfig) return;
    addLog(t.logReDecide, LogCategory.SYSTEM);
    if (lastRunConfig.tab === 'list') {
      const { items, weighted, weights } = lastRunConfig.data;
      handleDecideList(items, weighted, weights);
    } else if (lastRunConfig.tab === 'range') {
      const { min, max, count, decimal, allowDuplicates } = lastRunConfig.data;
      handleDecideRange(min, max, count, decimal, allowDuplicates);
    } else if (lastRunConfig.tab === 'quick') {
      const { type, data } = lastRunConfig.data;
      handleQuickDecide(type, data);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-peloka-bg text-peloka-on-surface transition-colors duration-300 flex flex-col relative overflow-x-hidden max-w-full">
      
      {/* Absolute Decorative Grid Backdrops */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-peloka-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        systemStatus={systemStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col justify-center relative z-10">
        
        {/* App Title Center Panel */}
        <div className="text-center mb-8 md:mb-12 select-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-peloka-primary/10 border border-peloka-primary/25 rounded-full font-mono text-[10px] text-peloka-primary tracking-widest uppercase mb-4 animate-pulse-glow">
            <Cpu className="w-3.5 h-3.5" />
            {t.biotechEngine}
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-tight drop-shadow-md">
            {darkMode ? (
              <span className="bg-gradient-to-r from-white via-[#ffe5d3] to-peloka-primary bg-clip-text text-transparent">
                Peloka Decision
              </span>
            ) : (
              <span className="bg-gradient-to-r from-[#2c1a0f] via-[#5c4638] to-[#e06a00] bg-clip-text text-transparent">
                Peloka Decision
              </span>
            )}
          </h1>
          <p className="font-sans text-sm md:text-base text-peloka-on-surface-variant/85 max-w-md mx-auto mt-3 leading-relaxed">
            {t.tagline}
          </p>
        </div>

        {/* Dashboard Grid split 3/2 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-stretch">
          
          {/* Left panel: Control Input tabs */}
          <div className="lg:col-span-3 flex flex-col border border-peloka-surface-high/60 rounded-2xl bg-peloka-surface-container-low/90 backdrop-blur-md overflow-hidden shadow-xl">
            {/* Tab selector */}
            <div className="flex border-b border-peloka-surface-high/50 bg-peloka-bg-dark/20 p-1.5 select-none">
              <button
                onClick={() => setTab('list')}
                className={`flex-1 py-3 px-4 rounded-xl font-display text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  tab === 'list'
                    ? 'bg-peloka-surface-high text-peloka-primary border border-peloka-surface-highest/50 glow-orange/10'
                    : 'text-peloka-on-surface-variant/70 hover:text-peloka-on-surface hover:bg-peloka-surface/30'
                }`}
              >
                <ListCollapse className="w-3.5 h-3.5" />
                {t.listPicker}
              </button>
              
              <button
                onClick={() => setTab('range')}
                className={`flex-1 py-3 px-4 rounded-xl font-display text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  tab === 'range'
                    ? 'bg-peloka-surface-high text-peloka-primary border border-peloka-surface-highest/50 glow-orange/10'
                    : 'text-peloka-on-surface-variant/70 hover:text-peloka-on-surface hover:bg-peloka-surface/30'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                {t.range}
              </button>
              
              <button
                onClick={() => setTab('quick')}
                className={`flex-1 py-3 px-4 rounded-xl font-display text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  tab === 'quick'
                    ? 'bg-peloka-surface-high text-peloka-primary border border-peloka-surface-highest/50 glow-orange/10'
                    : 'text-peloka-on-surface-variant/70 hover:text-peloka-on-surface hover:bg-peloka-surface/30'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {t.quickDecide}
              </button>
            </div>

            {/* Tab Container Display */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              {tab === 'list' && (
                <ListPickerTab
                  onDecide={handleDecideList}
                  isDeciding={isDeciding}
                  addLog={addLog}
                />
              )}
              {tab === 'range' && (
                <RangeTab
                  onDecideRange={handleDecideRange}
                  isDeciding={isDeciding}
                  addLog={addLog}
                />
              )}
              {tab === 'quick' && (
                <QuickDecideTab
                  onQuickDecide={handleQuickDecide}
                  isDeciding={isDeciding}
                  addLog={addLog}
                />
              )}
            </div>
          </div>

          {/* Right panel: Outcome displaying node */}
          <div ref={outcomeRef} className="lg:col-span-2 scroll-mt-6">
            <OutcomePanel
              outcome={outcome}
              isDeciding={isDeciding}
              logs={logs}
              onFlushBuffer={handleFlushBuffer}
              onReDecide={handleReDecide}
              addLog={addLog}
            />
          </div>

        </div>

      </main>

      {/* Footer conforming to mock */}
      <footer className="w-full py-8 mt-12 border-t border-peloka-surface-high/20 bg-peloka-bg-dark/40 backdrop-blur-md relative z-10 select-none text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-6 font-sans text-xs text-peloka-on-surface-variant/60 hover:text-peloka-on-surface-variant transition-colors">
            <button 
              onClick={() => setModalType('privacy')}
              className="hover:underline hover:text-peloka-primary transition-all cursor-pointer bg-transparent border-none p-0 text-xs text-peloka-on-surface-variant/60"
            >
              {t.privacy}
            </button>
            <button 
              onClick={() => setModalType('terms')}
              className="hover:underline hover:text-peloka-primary transition-all cursor-pointer bg-transparent border-none p-0 text-xs text-peloka-on-surface-variant/60"
            >
              {t.terms}
            </button>
            <button 
              onClick={() => setModalType('support')}
              className="hover:underline hover:text-peloka-primary transition-all cursor-pointer bg-transparent border-none p-0 text-xs text-peloka-on-surface-variant/60"
            >
              {t.support}
            </button>
          </div>
          <p className="font-sans text-[11px] text-peloka-on-surface-variant/40 tracking-wider">
            &copy; 2026 {t.copyright}
          </p>
        </div>
      </footer>

      {/* Dynamic Info Modals for Privacy, Terms, Support */}
      <InfoModal 
        isOpen={!!modalType} 
        type={modalType} 
        onClose={() => setModalType(null)} 
      />
    </div>
  );
}
