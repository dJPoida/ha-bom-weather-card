import classNames from 'classnames';
import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ICON_SIZE} from '../constants/icon-size.const';
import {ForecastAttribute, ForecastEvent} from '../lib/weather';

@customElement('bwc-daily-forecast-element')
export class BwcDailyForecastElement extends LitElement {
  @property({type: Object}) forecastData!: ForecastEvent;
  @property({type: Boolean}) useHAWeatherIcons = false;

  static override styles: CSSResultGroup = css`
    :host {
      color: white;
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: 16px;
    }
    .title {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .forecast-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
    }
    .forecast-row:not(:last-child) {
      border-bottom: 1px solid var(--divider-color);
    }
    .day {
      flex: 2;
      font-weight: bold;
      text-align: left;
    }
    .icon {
      flex: 1;
      text-align: left;
    }
    .temperature {
      flex: 2;
      text-align: right;
      font-size: 1.2em;
    }
    .rain {
      flex: 2;
      text-align: right;
      font-size: 0.9em;
    }
  `;

  private _renderForecastRow(
    day: string,
    low: number,
    high: number,
    rain: number,
    rainChance: number,
    condition: string
  ): TemplateResult {
    return html`
      <div class=${classNames('forecast-row', condition)}>
        <div class="day">${day}</div>
        <bwc-weather-icon-element
          .useHAWeatherIcons=${this.useHAWeatherIcons}
          .weatherIcon=${condition}
          .iconSize=${ICON_SIZE.REGULAR}
        ></bwc-weather-icon-element>
        <div class="temperature">${low}° - ${high}°</div>
        <div class="rain">${rain === 0 ? 'No Rain' : `${rain}mm`}${rain === 0 ? '' : ` (${rainChance}%)`}</div>
      </div>
    `;
  }

  override render(): TemplateResult {
    if (!this.forecastData || !this.forecastData.forecast) {
      return html``;
    }

    const forecastRows = this.forecastData.forecast.map((dayForecast: ForecastAttribute) =>
      this._renderForecastRow(
        new Date(dayForecast.datetime).toLocaleDateString('en-US', {weekday: 'long'}),
        dayForecast.templow ?? 0,
        dayForecast.temperature,
        dayForecast.precipitation ?? 0,
        dayForecast.precipitation_probability ?? 0,
        dayForecast.condition ?? ''
      )
    );

    return html`
      <div class="container">
        <div class="title">Daily forecast</div>
        ${forecastRows}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bwc-daily-forecast-element': BwcDailyForecastElement;
  }
}
