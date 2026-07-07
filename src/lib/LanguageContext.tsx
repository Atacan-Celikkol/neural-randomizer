/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, LanguageType } from './translations';

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>('en');

  useEffect(() => {
    // 1. Check local storage
    const storedLang = localStorage.getItem('peloka_lang') as LanguageType | null;
    if (storedLang === 'en' || storedLang === 'tr') {
      setLanguageState(storedLang);
    } else {
      // 2. Detect from navigator device settings
      const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || '';
      if (browserLang.toLowerCase().startsWith('tr')) {
        setLanguageState('tr');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('peloka_lang', lang);
  };

  const t = translations[language] || translations['en'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
