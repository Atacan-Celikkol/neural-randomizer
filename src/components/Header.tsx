/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../lib/LanguageContext';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  systemStatus: 'NOMINAL' | 'CALIBRATING' | 'DECIDING' | 'COMPLETED';
}

export default function Header(props: HeaderProps) {
  const { darkMode, onToggleDarkMode, systemStatus } = props;
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const getTranslatedStatus = () => {
    switch (systemStatus) {
      case 'NOMINAL':
        return t.statusNominal;
      case 'CALIBRATING':
        return t.statusCalibrating;
      case 'DECIDING':
        return t.statusDeciding;
      case 'COMPLETED':
        return t.statusCompleted;
      default:
        return systemStatus;
    }
  };

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b border-peloka-surface-high/50 bg-peloka-bg-dark/30 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Logo size={42} />
        <div className="flex flex-col">
          <span className="font-display font-bold text-lg md:text-xl tracking-wide text-peloka-on-surface flex items-center gap-2 select-none">
            Peloka Decision
          </span>
          <span className="font-mono text-[9px] tracking-widest text-peloka-primary/80 uppercase select-none">
            {t.title} v1.4
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Biotech System Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-peloka-surface/80 border border-peloka-surface-high/60 rounded-full">
          <div className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              systemStatus === 'NOMINAL' ? 'bg-peloka-teal' :
              systemStatus === 'CALIBRATING' ? 'bg-peloka-bronze animate-pulse' :
              systemStatus === 'DECIDING' ? 'bg-peloka-primary animate-ping' :
              'bg-peloka-blue'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              systemStatus === 'NOMINAL' ? 'bg-peloka-teal' :
              systemStatus === 'CALIBRATING' ? 'bg-peloka-bronze' :
              systemStatus === 'DECIDING' ? 'bg-peloka-primary' :
              'bg-peloka-blue'
            }`}></span>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-peloka-on-surface-variant select-none">
            {t.sysStatus}: <span className="font-semibold text-peloka-on-surface">{getTranslatedStatus()}</span>
          </span>
        </div>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="px-2.5 py-2 rounded-lg bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/40 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-300 flex items-center gap-1.5 cursor-pointer relative group"
          title={t.toggleLanguage}
        >
          <Globe className="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
            {language}
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg bg-peloka-surface hover:bg-peloka-surface-high border border-peloka-surface-high/40 text-peloka-on-surface-variant hover:text-peloka-primary transition-all duration-300 group relative cursor-pointer"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </button>
      </div>
    </header>
  );
}
