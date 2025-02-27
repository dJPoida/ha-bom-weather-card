export const DAY_MODE = {
  DAY: 'day',
  NIGHT: 'night',
};

export type DAY_MODE = typeof DAY_MODE;
export type A_DAY_MODE = DAY_MODE[keyof DAY_MODE];
