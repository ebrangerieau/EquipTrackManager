import { en } from './translations/en';
import { fr } from './translations/fr';

export const languages = {
  en: {
    name: 'English',
    code: 'en',
    translations: en,
  },
  fr: {
    name: 'Français',
    code: 'fr',
    translations: fr,
  },
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof en;