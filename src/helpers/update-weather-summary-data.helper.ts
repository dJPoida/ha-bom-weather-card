import {HomeAssistant} from 'custom-card-helpers';
import {HassEntity} from 'home-assistant-js-websocket';
import {WeatherSummaryData} from '../types/weather-summary-data.type';

export type updateWeatherSummaryDataProps = {
  hass: HomeAssistant;
  observationEntityID: string;
  feelsLikeTempEntityState: HassEntity;
};

export const updateWeatherSummaryData = (
  props: updateWeatherSummaryDataProps
): WeatherSummaryData => {
  const {hass} = props;

  const observationEntityState = hass.states[props.observationEntityID];

  // Temp: currentTempEntity -> Observation Entity -> Forecast Entity [0]
  const temp = observationEntityState?.attributes.temperature ?? undefined;

  return {
    temp,
    feelsLikeTemp: undefined,
    minTemp: undefined,
    minTempDesc: undefined,
    maxTemp: undefined,
    maxTempDesc: undefined,
    warningsCount: undefined,
    rainSummary: undefined,
    summary: undefined,
    forecastSummary: undefined,
  };
};
