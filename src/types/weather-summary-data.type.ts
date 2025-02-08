export type WeatherSummaryData = {
  temp: number | undefined;
  feelsLikeTemp: number | undefined;
  minTemp: number | undefined;
  minTempDesc: string | undefined;
  maxTemp: number | undefined;
  maxTempDesc: string | undefined;
  warningsCount: number | undefined;
  rainSummary: string | undefined;
  summary: string | undefined;
  forecastSummary: string | undefined;
};
