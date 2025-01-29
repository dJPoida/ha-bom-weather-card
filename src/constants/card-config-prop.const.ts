export const CONFIG_PROP = {
  TITLE: 'title',

  SHOW_TIME: 'show_time',
  SHOW_DATE: 'show_date',

  OBSERVATION_ENTITY_ID: 'observation_entity_id',
  FORECAST_ENTITY_ID: 'forecast_entity_id',

  USE_HA_WEATHER_ICONS: 'use_ha_weather_icons',
} as const;

export type CONFIG_PROP = typeof CONFIG_PROP;
export type A_CONFIG_PROP = CONFIG_PROP[keyof CONFIG_PROP];
