export const WEATHER_ENTITY_ATTRIBUTE = {
  TEMPERATURE: 'temperature',
  TEMPERATURE_UNIT: 'temperature_unit',
  HUMIDITY: 'humidity',
  PRESSURE_UNIT: 'pressure_unit',
  WIND_BEARING: 'wind_bearing',
  WIND_SPEED: 'wind_speed',
  WIND_SPEED_UNIT: 'wind_speed_unit',
  VISIBILITY_UNIT: 'visibility_unit',
  PRECIPITATION_UNIT: 'precipitation_unit',
  ATTRIBUTION: 'attribution',
  ICON: 'icon',
  FRIENDLY_NAME: 'friendly_name',
  SUPPORTED_FEATURES: 'supported_features',
};

export type WEATHER_ENTITY_ATTRIBUTE = typeof WEATHER_ENTITY_ATTRIBUTE;
export type A_WEATHER_ENTITY_ATTRIBUTE =
  WEATHER_ENTITY_ATTRIBUTE[keyof WEATHER_ENTITY_ATTRIBUTE];
