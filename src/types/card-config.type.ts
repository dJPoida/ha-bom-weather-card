import {LovelaceCardConfig} from 'custom-card-helpers';
import {CONFIG_PROP} from '../constants/card-config-prop.const';

// Create a new type that includes all properties of LovelaceCardConfig except the index signature
type StrictLovelaceCardConfig = Pick<
  LovelaceCardConfig,
  'index' | 'view_index' | 'type'
>;

export type CardConfig = StrictLovelaceCardConfig & {
  [CONFIG_PROP.TITLE]: string | undefined;

  [CONFIG_PROP.SHOW_TIME]: boolean | undefined;
  [CONFIG_PROP.SHOW_DATE]: boolean | undefined;

  [CONFIG_PROP.OBSERVATION_ENTITY_ID]: string | undefined;
  [CONFIG_PROP.FORECAST_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: boolean | undefined;
};
