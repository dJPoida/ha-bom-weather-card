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

  [CONFIG_PROP.SHOW_TIME]: undefined,
  [CONFIG_PROP.SHOW_DATE]: undefined,

  [CONFIG_PROP.OBSERVATION_ENTITY_ID]: undefined,
  [CONFIG_PROP.FORECAST_ENTITY_ID]: undefined,

  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: undefined,
};
