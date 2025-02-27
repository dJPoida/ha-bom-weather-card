import sunny from '../img/weather-icons/01_sunny.svg';
import clearNight from '../img/weather-icons/02_clear_night.svg';
import partlyCloudy from '../img/weather-icons/03_partly_cloudy.svg';
import partlyCloudyNight from '../img/weather-icons/03_partly_cloudy_night.svg';
import cloudy from '../img/weather-icons/04_cloudy.svg';
import cloudyNight from '../img/weather-icons/04_cloudy_night.svg';
import mostlySunny from '../img/weather-icons/05_mostly_sunny.svg';
import mostlySunnyNight from '../img/weather-icons/05_mostly_sunny_night.svg';
import wind from '../img/weather-icons/09_wind.svg';
import windNight from '../img/weather-icons/09_wind_night.svg';
import fog from '../img/weather-icons/10_fog.svg';
import fogNight from '../img/weather-icons/10_fog_night.svg';
import rain from '../img/weather-icons/12_rain.svg';
import rainNight from '../img/weather-icons/12_rain_night.svg';
import snow from '../img/weather-icons/15_snow.svg';
import snowNight from '../img/weather-icons/15_snow_night.svg';
import storms from '../img/weather-icons/16_storms.svg';
import stormsNight from '../img/weather-icons/16_storms_night.svg';
import heavyShowers from '../img/weather-icons/18_heavy_showers.svg';
import heavyShowersNight from '../img/weather-icons/18_heavy_showers_night.svg';
import exceptional from '../img/weather-icons/19_tropical_cyclone.svg';
import exceptionalNight from '../img/weather-icons/19_tropical_cyclone_night.svg';
import {A_DAY_MODE, DAY_MODE} from './day-mode.const';
import {A_WEATHER_CONDITION, WEATHER_CONDITION} from './weather-conditions.const';

/**
 * This object maps the weather icon names returned by the Home Assistant API
 */
export const WEATHER_ICON: Record<A_DAY_MODE, Record<A_WEATHER_CONDITION, string>> = {
  [DAY_MODE.DAY]: {
    [WEATHER_CONDITION.CLEAR_NIGHT]: clearNight,
    [WEATHER_CONDITION.CLOUDY]: cloudy,
    [WEATHER_CONDITION.EXCEPTIONAL]: exceptional,
    [WEATHER_CONDITION.FOG]: fog,
    [WEATHER_CONDITION.HAIL]: snow,
    [WEATHER_CONDITION.LIGHTNING_RAINY]: storms,
    [WEATHER_CONDITION.LIGHTNING]: storms,
    [WEATHER_CONDITION.PARTLY_CLOUDY]: partlyCloudy,
    [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: partlyCloudyNight,
    [WEATHER_CONDITION.MOSTLY_SUNNY]: mostlySunny,
    [WEATHER_CONDITION.POURING]: heavyShowers,
    [WEATHER_CONDITION.RAINY]: rain,
    [WEATHER_CONDITION.SNOWY_RAINY]: snow,
    [WEATHER_CONDITION.SNOWY]: snow,
    [WEATHER_CONDITION.SUNNY]: sunny,
    [WEATHER_CONDITION.WINDY_VARIANT]: wind,
    [WEATHER_CONDITION.WINDY]: wind,
  },
  [DAY_MODE.NIGHT]: {
    [WEATHER_CONDITION.CLEAR_NIGHT]: clearNight,
    [WEATHER_CONDITION.CLOUDY]: cloudyNight,
    [WEATHER_CONDITION.EXCEPTIONAL]: exceptionalNight,
    [WEATHER_CONDITION.FOG]: fogNight,
    [WEATHER_CONDITION.HAIL]: snowNight,
    [WEATHER_CONDITION.LIGHTNING_RAINY]: stormsNight,
    [WEATHER_CONDITION.LIGHTNING]: stormsNight,
    [WEATHER_CONDITION.PARTLY_CLOUDY]: partlyCloudyNight,
    [WEATHER_CONDITION.PARTLY_CLOUDY_NIGHT]: partlyCloudyNight,
    [WEATHER_CONDITION.MOSTLY_SUNNY]: mostlySunnyNight,
    [WEATHER_CONDITION.POURING]: heavyShowersNight,
    [WEATHER_CONDITION.RAINY]: rainNight,
    [WEATHER_CONDITION.SNOWY_RAINY]: snowNight,
    [WEATHER_CONDITION.SNOWY]: snowNight,
    [WEATHER_CONDITION.SUNNY]: sunny,
    [WEATHER_CONDITION.WINDY_VARIANT]: windNight,
    [WEATHER_CONDITION.WINDY]: windNight,
  },
} as const;

export type WEATHER_ICON = typeof WEATHER_ICON;
export type A_WEATHER_ICON = A_WEATHER_CONDITION;
