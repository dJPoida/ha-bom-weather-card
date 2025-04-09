export const CONFIG_PROP = {
  TITLE: 'title',

  WEATHER_DEVICE_ID: 'weather_device_id',
  SUMMARY_WEATHER_ENTITY_ID: 'summary_weather_entity_id',
  SUN_ENTITY_ID: 'sun_entity_id',

  SHOW_CURRENT_TEMP: 'show_current_temp',
  CURRENT_TEMP_ENTITY_ID: 'current_temp_entity_id',

  SHOW_FEELS_LIKE_TEMP: 'show_feels_like_temp',
  FEELS_LIKE_TEMP_ENTITY_ID: 'feels_like_temp_entity_id',

  SHOW_WEATHER_ICON: 'show_weather_icon',
  WEATHER_ICON_ENTITY_ID: 'weather_icon_entity_id',
  USE_HA_WEATHER_ICONS: 'use_ha_weather_icons',

  SHOW_TIME: 'show_time',
  TIME_ENTITY_ID: 'time_entity_id',

  SHOW_DATE: 'show_date',
  DATE_ENTITY_ID: 'date_entity_id',

  SHOW_NOW_LATER_TEMPS: 'show_now_later_temps',
  NOW_LATER_NOW_TEMP_ENTITY_ID: 'now_later_now_temp_entity_id',
  NOW_LATER_NOW_LABEL_ENTITY_ID: 'now_later_now_label_entity_id',
  NOW_LATER_LATER_TEMP_ENTITY_ID: 'now_later_later_temp_entity_id',
  NOW_LATER_LATER_LABEL_ENTITY_ID: 'now_later_later_label_entity_id',

  SHOW_WARNING_COUNT: 'show_warning_count',
  WARNING_COUNT_ENTITY_ID: 'warning_count_entity_id',
  HIDE_WARNING_COUNT_IF_ZERO: 'hide_warning_count_if_zero',

  SHOW_RAIN_SUMMARY: 'show_rain_summary',
  RAIN_SUMMARY_ENTITY_ID: 'rain_summary_entity_id',

  SHOW_FORECAST_SUMMARY: 'show_forecast_summary',
  FORECAST_SUMMARY_ENTITY_ID: 'forecast_summary_entity_id',

  SHOW_HOURLY_FORECAST: 'show_hourly_forecast',

  SHOW_DAILY_FORECAST: 'show_daily_forecast',
  SHOW_DAILY_FORECAST_TITLE: 'show_daily_forecast_title',
  DAILY_FORECAST_NUMBER_OF_DAYS: 'daily_forecast_number_of_days',
} as const;

export type CONFIG_PROP = typeof CONFIG_PROP;
export type A_CONFIG_PROP = CONFIG_PROP[keyof CONFIG_PROP];
