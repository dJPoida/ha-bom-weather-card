export const LANGUAGE = {
  EN: 'en',
  EN_GB: 'en_gb',
} as const;

export type LANGUAGE = typeof LANGUAGE;
export type A_LANGUAGE = LANGUAGE[keyof LANGUAGE];

export const DEFAULT_LANGUAGE: A_LANGUAGE = LANGUAGE.EN;
