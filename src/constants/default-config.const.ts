import {CardConfig} from '../types/card-config.type';
import {CONFIG_PROP} from './card-config-prop.const';
import {CUSTOM_CARD_ID} from './custom-card-id.const';

export const DEFAULT_CARD_CONFIG: CardConfig = {
  type: CUSTOM_CARD_ID,
  [CONFIG_PROP.TITLE]: undefined,

  [CONFIG_PROP.SHOW_TIME]: true,
  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: false,

  [CONFIG_PROP.FORECAST_ENTITY_ID]: '',
};
