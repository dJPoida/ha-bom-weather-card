export const ICON_SIZE = {
  SMALL: 'small',
  REGULAR: 'regular',
  LARGE: 'large',
  HUGE: 'huge',
};

export type ICON_SIZE = typeof ICON_SIZE;
export type AN_ICON_SIZE = ICON_SIZE[keyof ICON_SIZE];
