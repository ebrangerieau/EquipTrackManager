import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { languages, type Language } from '../lib/i18n';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'fr',
      setLanguage: (language: Language) => set({ currentLanguage: language }),
      t: (key: string) => {
        const keys = key.split('.');
        let value: any = languages[get().currentLanguage].translations;
        
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key;
          }
        }
        
        return typeof value === 'string' ? value : key;
      },
    }),
    {
      name: 'language-storage',
    }
  )
);