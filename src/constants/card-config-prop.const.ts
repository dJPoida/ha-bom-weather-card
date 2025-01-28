export const CONFIG_PROP = {
  TITLE: 'title',

  SHOW_TIME: 'show_time',
  USE_HA_WEATHER_ICONS: 'use_ha_weather_icons',

  FORECAST_ENTITY_ID: 'forecast_entity_id',
} as const;

export type CONFIG_PROP = typeof CONFIG_PROP;
export type A_CONFIG_PROP = CONFIG_PROP[keyof CONFIG_PROP];
