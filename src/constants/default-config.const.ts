import {CardConfig} from '../types/card-config.type';
import {CONFIG_PROP} from './card-config-prop.const';
import {CUSTOM_CARD_ID} from './custom-card-id.const';

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
  type: CUSTOM_CARD_ID,
  index: 0,
  view_index: 0,

  [CONFIG_PROP.TITLE]: undefined,

  [CONFIG_PROP.SHOW_TIME]: true,
  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: false,

  [CONFIG_PROP.FORECAST_ENTITY_ID]: '',
};
