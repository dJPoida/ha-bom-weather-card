import {LANGUAGE} from '../../constants/languages.const';
import {LanguageStrings} from '../../types/language-strings.type';
import * as en from './en.json';

/**
 * Add new languages here when they are added
 */
export const languageStrings: LanguageStrings = {
  [LANGUAGE.EN]: en, // English
  [LANGUAGE.EN_GB]: en, // English
};
