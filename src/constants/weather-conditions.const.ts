export const WEATHER_CONDITION: Record<string, string> = {
  CLEAR_NIGHT: 'clear-night',
  CLOUDY: 'cloudy',
  EXCEPTIONAL: 'exceptional',
  FOG: 'fog',
  HAIL: 'hail',
  LIGHTNING_RAINY: 'lightning-rainy',
  LIGHTNING: 'lightning',
  PARTLY_CLOUDY: 'partlycloudy', // Intentionally different from the key
  PARTLY_CLOUDY_NIGHT: 'partlycloudy-night',
  MOSTLY_SUNNY: 'mostly-sunny',
  POURING: 'pouring',
  RAINY: 'rainy',
  SNOWY_RAINY: 'snowy-rainy',
  SNOWY: 'snowy',
  SUNNY: 'sunny',
  WINDY_VARIANT: 'windy-variant',
  WINDY: 'windy',
};

export type WEATHER_CONDITION = typeof WEATHER_CONDITION;
export type A_WEATHER_CONDITION = WEATHER_CONDITION[keyof WEATHER_CONDITION];
