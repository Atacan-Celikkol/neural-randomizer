/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, KeyboardEvent } from 'react';
import { Plus, Trash2, Sliders, Shuffle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface ListPickerTabProps {
  onDecide: (options: string[], weighted: boolean, weights?: number[]) => void;
  isDeciding: boolean;
  addLog: (text: string, category: any) => void;
}

const PRESETS = [
  { nameKey: 'Lunch', items: 'Pizza, Sushi, Burger, Salad, Tacos, Pasta' },
  { nameKey: 'Movie Genre', items: 'Sci-Fi, Horror, Comedy, Drama, Action, Thriller' },
  { nameKey: 'Who Cleans?', items: 'Alice, Bob, Charlie, Dave' },
  { nameKey: 'Task Priority', items: 'Write Code, Refactor UI, Fix Bugs, Write Docs' },
];

export default function ListPickerTab(props: ListPickerTabProps) {
  const { onDecide, isDeciding, addLog } = props;
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>(['Option Alpha', 'Option Beta', 'Option Gamma']);
  const [weighted, setWeighted] = useState(false);
  const [weights, setWeights] = useState<number[]>([1, 1, 1]);

  // Translate preset names nicely for Turkish/English while preserving original strings
  const getPresetName = (nameKey: string) => {
    if (language === 'tr') {
      if (nameKey === 'Lunch') return 'Öğle Yemeği';
      if (nameKey === 'Movie Genre') return 'Film Türü';
      if (nameKey === 'Who Cleans?') return 'Kim Temizler?';
      if (nameKey === 'Task Priority') return 'Görev Önceliği';
    }
    return nameKey;
  };

  // Handle adding raw string of items
  const handleAddItems = (text: string) => {
    if (!text.trim()) return;
    const splitItems = text
      .split(/,|\n/)
      .map(i => i.trim())
      .filter(i => i.length > 0);
    
    if (splitItems.length === 0) return;

    const newItems = [...items, ...splitItems];
    setItems(newItems);
    setWeights([...weights, ...Array(splitItems.length).fill(1)]);
    setInputValue('');
    
    const logMsg = t.logBufferUpdated
      .replace('{count}', splitItems.length.toString())
      .replace('{total}', newItems.length.toString());
    addLog(logMsg, 'PATH');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddItems(inputValue);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    const newWeights = weights.filter((_, i) => i !== index);
    setItems(newItems);
    setWeights(newWeights);

    const logMsg = t.logVectorRemoved
      .replace('{index}', index.toString())
      .replace('{total}', newItems.length.toString());
    addLog(logMsg, 'PATH');
  };

  const handleClearAll = () => {
    setItems([]);
    setWeights([]);
    addLog(t.logCleared, 'SYS');
  };

  const handleWeightChange = (index: number, val: number) => {
    const newWeights = [...weights];
    newWeights[index] = Math.max(1, Math.min(10, val));
    setWeights(newWeights);
  };

  const loadPreset = (presetItems: string, presetNameKey: string) => {
    const list = presetItems.split(',').map(i => i.trim());
    const displayPresetName = getPresetName(presetNameKey);
    setItems(list);
    setWeights(Array(list.length).fill(1));

    const logMsg = t.logLoadedPreset
      .replace('{name}', displayPresetName)
      .replace('{count}', list.length.toString());
    addLog(logMsg, 'SYS');
  };

  const triggerDecision = () => {
    if (items.length === 0) {
      addLog(t.logDecideAborted + ' Matrix empty.', 'ERROR');
      return;
    }
    onDecide(items, weighted, weighted ? weights : undefined);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Comma-separated or Newline text area */}
      <div className="flex flex-col gap-2">
        <label className="font-geist text-xs font-semibold tracking-wider text-peloka-primary uppercase flex items-center justify-between">
          <span>{t.addItemsLabel}</span>
          <span className="text-[10px] text-peloka-on-surface-variant font-normal normal-case">
            {items.length} {t.itemsQueued}
          </span>
        </label>
        
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDeciding}
            placeholder={t.placeholderList}
            className="w-full min-h-[100px] max-h-[150px] p-4 rounded-xl bg-peloka-bg-dark border border-peloka-surface-highest/60 focus:border-peloka-primary focus:ring-1 focus:ring-peloka-primary text-peloka-on-surface font-sans text-base md:text-sm placeholder-peloka-on-surface-variant/40 outline-none transition-all duration-300 resize-y"
          />
          <button
            onClick={() => handleAddItems(inputValue)}
            disabled={isDeciding || !inputValue.trim()}
            className="absolute bottom-3 right-3 p-2 rounded-lg bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/60 text-peloka-primary hover:text-white disabled:opacity-40 disabled:hover:text-peloka-primary transition-all duration-200 cursor-pointer"
            title="Add to memory buffer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="font-sans text-[11px] text-peloka-on-surface-variant/70 italic">
          {t.proTip}
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] text-peloka-on-surface-variant/60 uppercase mr-1">{t.presetsLabel}</span>
        {PRESETS.map((p) => (
          <button
            key={p.nameKey}
            onClick={() => loadPreset(p.items, p.nameKey)}
            disabled={isDeciding}
            className="px-2.5 py-1 text-xs font-sans rounded-full bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/50 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-200 cursor-pointer"
          >
            {getPresetName(p.nameKey)}
          </button>
        ))}
      </div>

      {/* Option Vectors (Added items list) */}
      {items.length > 0 && (
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-peloka-bg-dark/40 border border-peloka-surface-highest/30">
          <div className="flex items-center justify-between">
            <span className="font-geist text-[11px] font-semibold tracking-wider text-peloka-on-surface-variant uppercase flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-peloka-blue" />
              {t.memoryRegistry}
            </span>
            <button
              onClick={handleClearAll}
              disabled={isDeciding}
              className="text-[10px] font-mono text-rose-400 hover:text-rose-300 transition-colors uppercase flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              {t.clear}
            </button>
          </div>

          <div className="max-h-[140px] overflow-y-auto flex flex-col gap-2 pr-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-peloka-surface/40 hover:bg-peloka-surface/70 border border-peloka-surface-high/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="font-mono text-[10px] text-peloka-blue bg-peloka-blue/10 w-5 h-5 flex items-center justify-center rounded border border-peloka-blue/25 shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-sans text-xs text-peloka-on-surface truncate pr-2">
                    {item}
                  </span>
                </div>

                {/* Weight Controls */}
                {weighted && (
                  <div className="flex items-center gap-1.5 mr-3 animate-fade-in">
                    <span className="font-mono text-[9px] text-peloka-bronze uppercase">{t.weight}:</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={weights[index] || 1}
                      onChange={(e) => handleWeightChange(index, parseInt(e.target.value) || 1)}
                      className="w-10 px-1 py-0.5 font-mono text-center text-base md:text-xs bg-peloka-bg-dark border border-peloka-surface-highest text-peloka-primary rounded outline-none"
                    />
                  </div>
                )}

                <button
                  onClick={() => handleRemoveItem(index)}
                  disabled={isDeciding}
                  className="p-1 rounded text-peloka-on-surface-variant/40 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150 cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Weighted Selection Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-peloka-surface-highest/20">
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={weighted}
                  onChange={(e) => setWeighted(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-9 h-5 rounded-full transition-all duration-300 ${
                  weighted ? 'bg-peloka-primary' : 'bg-peloka-surface-highest/80'
                }`} />
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-peloka-surface transition-transform duration-300 shadow-sm ${
                  weighted ? 'translate-x-4 bg-peloka-on-primary' : 'translate-x-0'
                }`} />
              </div>
              <span className="font-sans text-xs text-peloka-on-surface-variant group-hover:text-peloka-on-surface transition-colors">
                {t.synapticWeighting}
              </span>
            </label>
            <span className="font-mono text-[10px] text-peloka-primary/60">
              {t.entropyLevel}: 1.00
            </span>
          </div>
        </div>
      )}

      {/* Decide Button */}
      <button
        onClick={triggerDecision}
        disabled={isDeciding || items.length === 0}
        className="w-full mt-2 py-4 rounded-xl font-display font-bold text-sm text-peloka-on-primary bg-gradient-to-r from-peloka-primary to-peloka-bronze hover:brightness-110 active:brightness-95 disabled:opacity-40 disabled:brightness-100 transition-all duration-300 shadow-md hover:shadow-lg glow-orange flex items-center justify-center gap-2 uppercase tracking-wider relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Shuffle className="w-4 h-4 animate-pulse group-hover:rotate-180 transition-transform duration-500" />
        <span>{t.decideButton}</span>
      </button>
    </div>
  );
}
