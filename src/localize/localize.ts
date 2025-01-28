/* eslint-disable @typescript-eslint/no-explicit-any */
import {HomeAssistant} from 'custom-card-helpers';
import {
  A_LANGUAGE,
  DEFAULT_LANGUAGE,
  LANGUAGE,
} from '../constants/languages.const';
import {LanguageStrings} from '../types/language-strings.type';

import * as en from './language-strings/en.json';

const languageStrings: LanguageStrings = {
  en, // English
};

export function getLocalizer(hass?: HomeAssistant) {
  return function localize(string: string, search = '', replace = ''): string {
    const haServerLanguage = hass?.locale?.language as A_LANGUAGE;

    console.assert(
      haServerLanguage === undefined ||
        Object.values(LANGUAGE).includes(haServerLanguage),
      `Invalid language: ${haServerLanguage}`
    );

    const lang: A_LANGUAGE = haServerLanguage || DEFAULT_LANGUAGE;

    let translated: string;

    try {
      translated = string
        .split('.')
        .reduce(
          (o: any, i: string) => o[i],
          languageStrings[lang] as unknown as Record<string, any>
        );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      translated = string
        .split('.')
        .reduce(
          (o: any, i: string) => o[i],
          languageStrings[DEFAULT_LANGUAGE] as unknown as Record<string, any>
        );
    }

    if (translated === undefined)
      translated = string
        .split('.')
        .reduce(
          (o: any, i: string) => o[i],
          languageStrings[DEFAULT_LANGUAGE] as unknown as Record<string, any>
        );

    if (search !== '' && replace !== '') {
      translated = translated.replace(search, replace);
    }
    return translated;
  };
}
