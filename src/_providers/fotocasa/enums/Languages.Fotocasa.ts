import { Language } from '../../../common/enums';

export enum LanguagesFotocasa {
  castellano = 'es-ES',
  catala = 'ca-ES',
  english = 'en-GB',
  deutsch = 'de-DE',
}

export const languageToCode: { [key: string]: number } = {
  es: Language.castellano,
  ca: Language.catala,
  en: Language.english,
  de: Language.deutsch,
};
export const codeToLanguage: { [key: number]: string } = {
  0: LanguagesFotocasa.castellano,
  1: LanguagesFotocasa.catala,
  2: LanguagesFotocasa.castellano,
  3: LanguagesFotocasa.english,
  4: LanguagesFotocasa.deutsch,
};

export const codeToDetailLanguage: { [key: number]: string } = {
  0: LanguagesFotocasa.castellano.slice(0, 2),
  1: LanguagesFotocasa.catala.slice(0, 2),
  2: LanguagesFotocasa.castellano.slice(0, 2),
  3: LanguagesFotocasa.english.slice(0, 2),
  4: LanguagesFotocasa.deutsch.slice(0, 2),
};
