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

/**
 * This object maps the weather icon names returned by the Home Assistant API
 */
export const WEATHER_ICON: Record<string, string> = {
  'clear-night': clearNight,
  cloudy: cloudy,
  exceptional: exceptional,
  fog: fog,
  hail: hail,
  'lightning-rainy': lightningRainy,
  lightning: lightning,
  partlycloudy: partlyCloudy,
  'partlycloudy-night': partlyCloudyNight,
  'mostly-sunny': mostlySunny,
  mostly_sunny: mostlySunny,
  pouring: pouring,
  rainy: rainy,
  'snowy-rainy': snowyRainy,
  snowy: snowy,
  sunny: sunny,
  'windy-variant': windyVariant,
  windy: windy,
};
