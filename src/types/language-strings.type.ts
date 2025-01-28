import {A_LANGUAGE} from '../constants/languages.const';

export type LanguageString = Record<string, string>;

export type LanguageStringGroup = {
  [key: string]: LanguageString;
};

export type LanguageStrings = {
  [key in A_LANGUAGE]: LanguageStringGroup;
};
