import {LovelaceCardConfig} from 'custom-card-helpers';
import {CONFIG_PROP} from '../constants/config-prop.const';

// Create a new type that includes all properties of LovelaceCardConfig except the index signature
type StrictLovelaceCardConfig = Pick<LovelaceCardConfig, 'index' | 'view_index' | 'type'>;

export type CardConfig = StrictLovelaceCardConfig & {
  [CONFIG_PROP.TITLE]: string | undefined;

  [CONFIG_PROP.WEATHER_DEVICE_ID]: string | undefined;
  [CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]: string | undefined;
  [CONFIG_PROP.SUN_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_CURRENT_TEMP]: boolean | undefined;
  [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]: boolean | undefined;
  [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_CONDITION_BACKGROUND]: boolean | undefined;

  [CONFIG_PROP.SHOW_WEATHER_ICON]: boolean | undefined;
  [CONFIG_PROP.USE_HA_WEATHER_ICONS]: boolean | undefined;

  [CONFIG_PROP.SHOW_TIME]: boolean | undefined;
  [CONFIG_PROP.TIME_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_DATE]: boolean | undefined;
  [CONFIG_PROP.DATE_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_NOW_LATER_TEMPS]: boolean | undefined;
  [CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]: string | undefined;
  [CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]: string | undefined;
  [CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]: string | undefined;
  [CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_WARNING_COUNT]: boolean | undefined;
  [CONFIG_PROP.WARNING_COUNT_ENTITY_ID]: string | undefined;
  [CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO]: boolean | undefined;

  [CONFIG_PROP.SHOW_RAIN_SUMMARY]: boolean | undefined;
  [CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_FORECAST_SUMMARY]: boolean | undefined;
  [CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID]: string | undefined;

  [CONFIG_PROP.SHOW_HOURLY_FORECAST]: boolean | undefined;

  [CONFIG_PROP.SHOW_DAILY_FORECAST]: boolean | undefined;
  [CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE]?: boolean;
  [CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS]: number | undefined;
};
