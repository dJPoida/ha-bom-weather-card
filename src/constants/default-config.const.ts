import {CardConfig} from '../types/card-config.type';
import {CONFIG_PROP} from './card-config-prop.const';

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
  [CONFIG_PROP.OBSERVATION_ENTITY_ID]: undefined,
  [CONFIG_PROP.FORECAST_ENTITY_ID]: undefined,

  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: undefined,

  [CONFIG_PROP.SHOW_CURRENT_TEMP]: true,
  [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]: true,
  [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_TIME]: undefined,
  [CONFIG_PROP.TIME_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_DATE]: undefined,
  [CONFIG_PROP.DATE_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_MIN_MAX_TEMPS]: true,
  [CONFIG_PROP.MIN_TEMP_ENTITY_ID]: undefined,
  [CONFIG_PROP.MIN_LABEL_ENTITY_ID]: undefined,
  [CONFIG_PROP.MAX_TEMP_ENTITY_ID]: undefined,
  [CONFIG_PROP.MAX_LABEL_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_WARNINGS_COUNT]: true,
  [CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_RAIN_SUMMARY]: true,
  [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_FORECAST_SUMMARY]: true,
  [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: undefined,

  [CONFIG_PROP.SHOW_HOURLY_FORECAST]: true,

  [CONFIG_PROP.SHOW_DAILY_FORECAST]: true,
};
