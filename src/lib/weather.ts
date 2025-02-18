/**
 * Lifted directly from HomeAssistant Frontend Code version 20250106.0
 * @TODO Attribution
 */
import {HomeAssistant} from 'custom-card-helpers';
import type {HassEntityAttributeBase, HassEntityBase} from 'home-assistant-js-websocket';
import {supportsFeature} from './supports-feature';

export const enum WeatherEntityFeature {
  FORECAST_DAILY = 1,
  FORECAST_HOURLY = 2,
  FORECAST_TWICE_DAILY = 4,
}

export type ModernForecastType = 'hourly' | 'daily' | 'twice_daily';

export type ForecastType = ModernForecastType | 'legacy';

export interface ForecastAttribute {
  temperature: number;
  datetime: string;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  humidity?: number;
  condition?: string;
  is_daytime?: boolean;
  pressure?: number;
  wind_speed?: string;
}

interface WeatherEntityAttributes extends HassEntityAttributeBase {
  attribution?: string;
  humidity?: number;
  forecast?: ForecastAttribute[];
  is_daytime?: boolean;
  pressure?: number;
  temperature?: number;
  visibility?: number;
  wind_bearing?: number | string;
  wind_speed?: number;
  precipitation_unit: string;
  pressure_unit: string;
  temperature_unit: string;
  visibility_unit: string;
  wind_speed_unit: string;
}

export interface ForecastEvent {
  type: 'hourly' | 'daily' | 'twice_daily';
  forecast: [ForecastAttribute] | null;
}

export interface WeatherEntity extends HassEntityBase {
  attributes: WeatherEntityAttributes;
}

const EIGHT_HOURS = 28800000;
const DAY_IN_MILLISECONDS = 86400000;

const isForecastHourly = (forecast?: ForecastAttribute[]): boolean | undefined => {
  if (forecast && forecast?.length && forecast?.length > 2) {
    const date1 = new Date(forecast[1].datetime);
    const date2 = new Date(forecast[2].datetime);
    const timeDiff = date2.getTime() - date1.getTime();

    return timeDiff < EIGHT_HOURS;
  }

  return undefined;
};

const isForecastTwiceDaily = (forecast?: ForecastAttribute[]): boolean | undefined => {
  if (forecast && forecast?.length && forecast?.length > 2) {
    const date1 = new Date(forecast[1].datetime);
    const date2 = new Date(forecast[2].datetime);
    const timeDiff = date2.getTime() - date1.getTime();

    return timeDiff < DAY_IN_MILLISECONDS;
  }

  return undefined;
};

export type WeatherUnits = {
  precipitation_unit: string[];
  pressure_unit: string[];
  temperature_unit: string[];
  visibility_unit: string[];
  wind_speed_unit: string[];
};

export const getWeatherConvertibleUnits = (hass: HomeAssistant): Promise<{units: WeatherUnits}> =>
  hass.callWS({
    type: 'weather/convertible_units',
  });

const getLegacyForecast = (
  weather_attributes?: WeatherEntityAttributes | undefined
):
  | {
      forecast: ForecastAttribute[];
      type: 'daily' | 'hourly' | 'twice_daily';
    }
  | undefined => {
  if (weather_attributes?.forecast && weather_attributes.forecast.length > 2) {
    if (isForecastHourly(weather_attributes.forecast)) {
      return {
        forecast: weather_attributes.forecast,
        type: 'hourly',
      };
    }
    if (isForecastTwiceDaily(weather_attributes.forecast)) {
      return {
        forecast: weather_attributes.forecast,
        type: 'twice_daily',
      };
    }
    return {forecast: weather_attributes.forecast, type: 'daily'};
  }
  return undefined;
};

export const getForecast = (
  weather_attributes?: WeatherEntityAttributes | undefined,
  forecast_event?: ForecastEvent,
  forecast_type?: ForecastType | undefined
):
  | {
      forecast: ForecastAttribute[];
      type: 'daily' | 'hourly' | 'twice_daily';
    }
  | undefined => {
  if (forecast_type === undefined) {
    if (forecast_event?.type !== undefined && forecast_event?.forecast && forecast_event?.forecast?.length > 2) {
      return {forecast: forecast_event.forecast, type: forecast_event?.type};
    }
    return getLegacyForecast(weather_attributes);
  }

  if (forecast_type === 'legacy') {
    return getLegacyForecast(weather_attributes);
  }

  if (forecast_type === forecast_event?.type && forecast_event?.forecast && forecast_event?.forecast?.length > 2) {
    return {forecast: forecast_event.forecast, type: forecast_type};
  }

  return undefined;
};

export const subscribeForecast = (
  hass: HomeAssistant,
  entity_id: string,
  forecast_type: ModernForecastType,
  callback: (forecastevent: ForecastEvent) => void
) =>
  hass.connection.subscribeMessage<ForecastEvent>(callback, {
    type: 'weather/subscribe_forecast',
    forecast_type,
    entity_id,
  });

export const getSupportedForecastTypes = (stateObj: HassEntityBase): ModernForecastType[] => {
  const supported: ModernForecastType[] = [];
  if (supportsFeature(stateObj, WeatherEntityFeature.FORECAST_DAILY)) {
    supported.push('daily');
  }
  if (supportsFeature(stateObj, WeatherEntityFeature.FORECAST_TWICE_DAILY)) {
    supported.push('twice_daily');
  }
  if (supportsFeature(stateObj, WeatherEntityFeature.FORECAST_HOURLY)) {
    supported.push('hourly');
  }
  return supported;
};

export const getDefaultForecastType = (stateObj: HassEntityBase) => {
  if (supportsFeature(stateObj, WeatherEntityFeature.FORECAST_DAILY)) {
    return 'daily';
  }
  if (supportsFeature(stateObj, WeatherEntityFeature.FORECAST_TWICE_DAILY)) {
    return 'twice_daily';
  }
  if (supportsFeature(stateObj, WeatherEntityFeature.FORECAST_HOURLY)) {
    return 'hourly';
  }
  return undefined;
};
