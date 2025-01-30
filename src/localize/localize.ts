/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  A_LANGUAGE,
  DEFAULT_LANGUAGE,
  LANGUAGE,
} from '../constants/languages.const';

import {Localizer} from '../types/localizer.type';
import {languageStrings} from './language-strings/_language-strings';

export function getLocalizer(lang: A_LANGUAGE = DEFAULT_LANGUAGE): Localizer {
  const targetLang: A_LANGUAGE = (lang || '')
    .replace(/['"]+/g, '')
    .replace('-', '_')
    .toLowerCase() as A_LANGUAGE;

  console.assert(
    Object.values(LANGUAGE).includes(targetLang),
    `Invalid language: ${targetLang}`
  );

  /**
   * Localize a string
   * @param string - The string to localize
   * @param substitute - An object containing key value pairs to substitute in the string
   *
   * @example
   * localize('error.invalidConfigProperty', {property: 'title'})
   *
   * @returns The localized string
   */
  return function localize(string: string, substitute = {}): string {
    let translated: string;

    try {
      translated = string
        .split('.')
        .reduce(
          (o: any, i: string) => o[i],
          languageStrings[targetLang] as unknown as Record<string, any>
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

    // Iterate over each of the keyvalue pairs in the substitute object and replace
    // the key found in the input string with the value
    for (const [search, replace] of Object.entries(substitute)) {
      translated = translated.replace(`{${search}}`, replace as string);
    }
    return translated;
  };
}
