export const CONFIG_PROP = {
  TITLE: 'title',
  OBSERVATION_ENTITY_ID: 'observation_entity_id',
  FORECAST_ENTITY_ID: 'forecast_entity_id',

  USE_HA_WEATHER_ICONS: 'use_ha_weather_icons',

  SHOW_CURRENT_TEMP: 'show_current_temp',
  CURRENT_TEMP_ENTITY_ID: 'current_temp_entity_id',

  SHOW_FEELS_LIKE_TEMP: 'show_feels_like_temp',
  FEELS_LIKE_TEMP_ENTITY_ID: 'feels_like_temp_entity_id',

  SHOW_TIME: 'show_time',
  TIME_ENTITY_ID: 'time_entity_id',

  SHOW_DATE: 'show_date',
  DATE_ENTITY_ID: 'date_entity_id',

  SHOW_MIN_MAX_TEMPS: 'show_min_max_temps',
  MIN_TEMP_ENTITY_ID: 'min_temp_entity_id',
  MIN_LABEL_ENTITY_ID: 'min_label_entity_id',
  MAX_TEMP_ENTITY_ID: 'max_temp_entity_id',
  MAX_LABEL_ENTITY_ID: 'max_label_entity_id',

  SHOW_WARNINGS_COUNT: 'show_warnings_count',
  WARNINGS_COUNT_ENTITY_ID: 'warning_count_entity_id',

  SHOW_RAIN_SUMMARY: 'show_rain_summary',
  RAIN_SUMMARY_ENTITY_ID: 'rain_summary_entity_id',

  SHOW_FORECAST_SUMMARY: 'show_forecast_summary',
  FORECAST_SUMMARY_ENTITY_ID: 'forecast_summary_entity_id',

  SHOW_HOURLY_FORECAST: 'show_hourly_forecast',

  SHOW_DAILY_FORECAST: 'show_daily_forecast',
} as const;

export type CONFIG_PROP = typeof CONFIG_PROP;
export type A_CONFIG_PROP = CONFIG_PROP[keyof CONFIG_PROP];
