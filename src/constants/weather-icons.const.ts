import clearNight from '../img/weather-icons/clear-night.svg';
import cloudy from '../img/weather-icons/cloudy.svg';
import exceptional from '../img/weather-icons/exceptional.svg';
import fog from '../img/weather-icons/fog.svg';
import hail from '../img/weather-icons/hail.svg';
import lightningRainy from '../img/weather-icons/lightning-rainy.svg';
import lightning from '../img/weather-icons/lightning.svg';
import mostlySunny from '../img/weather-icons/mostly-sunny.svg';
import partlyCloudyNight from '../img/weather-icons/partly-cloudy-night.svg';
import partlyCloudy from '../img/weather-icons/partly-cloudy.svg';
import pouring from '../img/weather-icons/pouring.svg';
import rainy from '../img/weather-icons/rainy.svg';
import snowyRainy from '../img/weather-icons/snowy-rainy.svg';
import snowy from '../img/weather-icons/snowy.svg';
import sunny from '../img/weather-icons/sunny.svg';
import windyVariant from '../img/weather-icons/windy-variant.svg';
import windy from '../img/weather-icons/windy.svg';
import {A_WEATHER_CONDITION, WEATHER_CONDITION} from './weather-conditions.const';

/**
 * This object maps the weather icon names returned by the Home Assistant API
 */
export const WEATHER_ICON: Record<A_WEATHER_CONDITION, string> = {
  [WEATHER_CONDITION.CLEAR_NIGHT]: clearNight,
  [WEATHER_CONDITION.CLOUDY]: cloudy,
  [WEATHER_CONDITION.EXCEPTIONAL]: exceptional,
  [WEATHER_CONDITION.FOG]: fog,
  [WEATHER_CONDITION.HAIL]: hail,
  [WEATHER_CONDITION.LIGHTNING_RAINY]: lightningRainy,
  [WEATHER_CONDITION.LIGHTNING]: lightning,
  [WEATHER_CONDITION.PARTLY_CLOUDY]: partlyCloudy,
  [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: partlyCloudyNight,
  [WEATHER_CONDITION.MOSTLY_SUNNY]: mostlySunny,
  [WEATHER_CONDITION.POURING]: pouring,
  [WEATHER_CONDITION.RAINY]: rainy,
  [WEATHER_CONDITION.SNOWY_RAINY]: snowyRainy,
  [WEATHER_CONDITION.SNOWY]: snowy,
  [WEATHER_CONDITION.SUNNY]: sunny,
  [WEATHER_CONDITION.WINDY_VARIANT]: windyVariant,
  [WEATHER_CONDITION.WINDY]: windy,
};
