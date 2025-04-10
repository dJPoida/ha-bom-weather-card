import {WEATHER_CONDITION} from './weather-conditions.const';

export const WEATHER_CONDITION_CLASSES: Record<string, string> = {
  [WEATHER_CONDITION.SUNNY]: 'clear',
  [WEATHER_CONDITION.CLEAR_NIGHT]: 'clear',
  [WEATHER_CONDITION.PARTLY_CLOUDY]: 'partially-cloudy',
  [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: 'partially-cloudy',
  [WEATHER_CONDITION.MOSTLY_SUNNY]: 'partially-cloudy',
  [WEATHER_CONDITION.CLOUDY]: 'cloudy',
  [WEATHER_CONDITION.LIGHTNING]: 'stormy',
  [WEATHER_CONDITION.LIGHTNING_RAINY]: 'stormy',
  [WEATHER_CONDITION.POURING]: 'clear', // TODO: classes for weather condition POURING
  [WEATHER_CONDITION.RAINY]: 'clear', // TODO: classes for weather condition RAINY
  [WEATHER_CONDITION.SNOWY]: 'clear', // TODO: classes for weather condition SNOWY
  [WEATHER_CONDITION.SNOWY_RAINY]: 'clear', // TODO: classes for weather condition SNOWY_RAINY
  [WEATHER_CONDITION.WINDY]: 'clear', // TODO: classes for weather condition WINDY
  [WEATHER_CONDITION.WINDY_VARIANT]: 'clear', // TODO: classes for weather condition WINDY_VARIANT
  [WEATHER_CONDITION.FOG]: 'clear', // TODO: classes for weather condition FOG
  [WEATHER_CONDITION.HAIL]: 'clear', // TODO: classes for weather condition HAIL
  [WEATHER_CONDITION.EXCEPTIONAL]: 'clear', // TODO: classes for weather condition EXCEPTIONAL
};
