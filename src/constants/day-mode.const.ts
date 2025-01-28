export const DAY_MODE = {
  DAY: 'day',
  EVENING: 'evening',
  NIGHT: 'night',
};

export type DAY_MODE = typeof DAY_MODE;
export type A_DAY_MODE = DAY_MODE[keyof DAY_MODE];
