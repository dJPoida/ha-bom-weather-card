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
      color: var(--bwc-text-color);
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: var(--bwc-global-padding);
    }

    .title {
      font-size: var(--bwc-section-header-font-size);
      margin-bottom: var(--bwc-global-padding);
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: max-content auto max-content max-content;
      align-items: center; /* Vertically center items in each cell */
      gap: 0 calc(var(--bwc-global-padding) / 2); /* Add horizontal gap between columns */
    }

    /* Apply bottom border to all direct children of the grid except the last set */
    /* The number of children per row is 4 (day, icon, temp, rain) */
    .forecast-grid > *:not(:nth-last-child(-n + 4)) {
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: calc(var(--bwc-global-padding) / 2);
      margin-bottom: calc(var(--bwc-global-padding) / 2);
    }

    .day {
      font-weight: bold;
      text-align: left;
      font-size: var(--bwc-daily-forecast-day-font-size);
      /* Consistent padding for vertical alignment */
      padding: calc(var(--bwc-global-padding) / 2) 0;
    }

    .icon-container {
      /* Container for centering icon */
      display: flex;
      justify-content: flex-start; /* Align icon to the start */
      align-items: center;
      /* Consistent padding for vertical alignment */
      padding: calc(var(--bwc-global-padding) / 2) 0;
    }

    .temperature {
      text-align: right;
      font-size: var(--bwc-daily-forecast-temp-font-size);
      /* Consistent padding for vertical alignment */
      padding: calc(var(--bwc-global-padding) / 2) 0;
    }

    .rain {
      text-align: right;
      font-size: var(--bwc-daily-forecast-rain-font-size);
      /* Consistent padding for vertical alignment */
      padding: calc(var(--bwc-global-padding) / 2) 0;
    }
  `;

  private _renderForecastRow(
    day: string,
    low: number | undefined,
    high: number,
    rain: number,
    rainChance: number,
    condition: string
  ): TemplateResult {
    // Each element is now a direct child of the grid container.
    // The classNames for condition might be added back if specific styling per condition is needed per grid cell.
    return html`
      <div class="day">${day}</div>
      <div class="icon-container">
        <bwc-weather-icon-element
          .useHAWeatherIcons=${this.useHAWeatherIcons}
          .weatherIcon=${condition}
          .iconSize=${ICON_SIZE.REGULAR}
          .noPadding=${true}
        ></bwc-weather-icon-element>
      </div>
      <div class="temperature">${typeof low === 'number' ? `${low}° - ` : ''}${high}°</div>
      <div class="rain">${rain === 0 ? 'No Rain' : `${rain}mm`}${rain === 0 ? '' : ` (${rainChance}%)`}</div>
    `;
  }

  override render(): TemplateResult {
    if (!this.forecastData || !this.forecastData.forecast) {
      return html``;
    }

    const forecastRows = this.forecastData.forecast.map((dayForecast: ForecastAttribute) =>
      this._renderForecastRow(
        new Date(dayForecast.datetime).toLocaleDateString('en-US', {weekday: 'long'}),
        dayForecast.templow ?? undefined,
        dayForecast.temperature,
        dayForecast.precipitation ?? 0,
        dayForecast.precipitation_probability ?? 0,
        dayForecast.condition ?? ''
      )
    );

    return html`
      <div class="container">
        <div class="title">Daily forecast</div>
        <div class="forecast-grid">${forecastRows}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bwc-daily-forecast-element': BwcDailyForecastElement;
  }
}
