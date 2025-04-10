import {CardConfig} from '../types/card-config.type';
import {CONFIG_PROP} from './config-prop.const';

/**
 * Default card configuration
 *
 * Used for two purposes.
 *   1. Setting up a new CardConfig object
 *   2. Checking if the keys in a CardConfig object are valid
 *
 * Be sure to update this object when adding new configuration properties
 */
export const DEFAULT_CARD_CONFIG: CardConfig = {
  type: 'custom:bom-weather-card',
  index: undefined,
  view_index: undefined,

  [CONFIG_PROP.TITLE]: undefined,

  [CONFIG_PROP.WEATHER_DEVICE_ID]: undefined,
  [CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_CURRENT_TEMP]: true,
  [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]: true,
  [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: undefined,

  [CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_CONDITION_BACKGROUND]: true,

  [CONFIG_PROP.SHOW_WEATHER_ICON]: true,
  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: undefined,

  [CONFIG_PROP.SUN_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_TIME]: undefined,
  [CONFIG_PROP.TIME_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_DATE]: undefined,
  [CONFIG_PROP.DATE_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_NOW_LATER_TEMPS]: true,
  [CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]: undefined,
  [CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]: undefined,
  [CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]: undefined,
  [CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_WARNING_COUNT]: true,
  [CONFIG_PROP.WARNING_COUNT_ENTITY_ID]: undefined,
  [CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO]: undefined,

  [CONFIG_PROP.SHOW_RAIN_SUMMARY]: true,
  [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_FORECAST_SUMMARY]: true,
  [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_HOURLY_FORECAST]: true,

  [CONFIG_PROP.SHOW_DAILY_FORECAST]: true,
  [CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE]: true,
  [CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS]: 5,
};
