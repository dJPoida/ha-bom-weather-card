import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import log from 'loglevel';
import {ICON_SIZE} from '../constants/icon-size.const';
import {ForecastAttribute, ForecastEvent, subscribeForecast} from '../lib/weather';

@customElement('bwc-daily-forecast-element')
export class BwcDailyForecastElement extends LitElement {
  @property({attribute: false}) public hass?: HomeAssistant;
  @property({type: String}) public forecastEntityId?: string;
  @property({type: Boolean}) useHAWeatherIcons = false;
  @property({type: Boolean}) showTitle = true;

  @state() private _forecastSubscribed?: Promise<() => void>;
  @state() private _forecastEvent?: ForecastEvent;

  static override styles: CSSResultGroup = css`
    :host {
      color: var(--bwc-text-color);
      /* Define estimated heights/counts */
      --bwc-daily-forecast-row-estimated-height: 3.5em;
      --bwc-daily-forecast-expected-rows: 4; /* Typical number of future days */
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: var(--bwc-global-padding);
      /* Calculate min-height based on estimates */
      min-height: calc(
        (var(--bwc-section-header-font-size) * 1.2) /* Title height + margin approx */ + var(--bwc-global-padding)
          /* Space below title */ +
          (var(--bwc-daily-forecast-expected-rows) * var(--bwc-daily-forecast-row-estimated-height)) +
          var(--bwc-global-padding) /* Bottom padding */
      );
    }

    .title {
      font-size: var(--bwc-section-header-font-size);
      margin-bottom: var(--bwc-global-padding);
    }

    .loading, /* Style for loading message */
    .forecast-grid {
      display: grid;
      /* Day(max), Icon(fixed), Temp(max), Rain(max) */
      grid-template-columns: max-content 3em max-content max-content;
      align-items: center; /* Vertically center items in each cell */
      gap: 0 calc(var(--bwc-global-padding) / 2); /* Add horizontal gap between columns */
    }

    .loading {
      display: block; /* Override grid for single message */
      text-align: center;
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

  override connectedCallback(): void {
    super.connectedCallback();
    // Subscribe on connect if hass and entityId are available
    if (this.hass && this.forecastEntityId && !this._forecastSubscribed) {
      this._subscribe();
    }
  }

  override disconnectedCallback(): void {
    this._unsubscribe();
    super.disconnectedCallback();
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Get previous values if they exist
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    const oldForecastEntityId = changedProps.get('forecastEntityId') as string | undefined;

    // Unsubscribe if hass or entityId are removed
    if ((!this.hass || !this.forecastEntityId) && this._forecastSubscribed) {
      log.debug('Hass or forecastEntityId removed, unsubscribing...');
      this._unsubscribe();
      return;
    }

    // Subscribe if we now have hass and entityId but weren't subscribed (e.g., initial load)
    if (this.hass && this.forecastEntityId && !this._forecastSubscribed) {
      log.debug('Hass and forecastEntityId available, subscribing...');
      this._subscribe();
      return;
    }

    // Resubscribe only if the forecastEntityId has actually changed
    if (
      this.hass &&
      this.forecastEntityId &&
      changedProps.has('forecastEntityId') &&
      this.forecastEntityId !== oldForecastEntityId
    ) {
      log.debug('forecastEntityId changed, resubscribing...');
      this._unsubscribe();
      this._subscribe();
    }
  }

  private _subscribe(): void {
    if (!this.hass || !this.forecastEntityId) {
      return;
    }
    log.debug(`Subscribing to daily forecast for ${this.forecastEntityId}`);
    this._forecastSubscribed = subscribeForecast(this.hass!, this.forecastEntityId, 'daily', (event) => {
      log.debug('Daily Forecast Received in Element.', event);
      this._forecastEvent = event;
    });
  }

  private _unsubscribe(): void {
    if (this._forecastSubscribed) {
      log.debug(`Unsubscribing from daily forecast for ${this.forecastEntityId}`);
      this._forecastSubscribed.then((unsub) => unsub()).catch(() => {});
      this._forecastSubscribed = undefined;
      this._forecastEvent = undefined; // Clear data on unsubscribe
    }
  }

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
          .noPadding=${true}
          .useHAWeatherIcons=${this.useHAWeatherIcons}
          .weatherIcon=${condition}
          .iconSize=${ICON_SIZE.REGULAR}
        ></bwc-weather-icon-element>
      </div>
      <div class="temperature">${typeof low === 'number' ? `${low}° - ` : ''}${high}°</div>
      <div class="rain">${rain === 0 ? 'No Rain' : `${rain}mm`}${rain === 0 ? '' : ` (${rainChance}%)`}</div>
    `;
  }

  override render(): TemplateResult {
    // Render loading if forecast event hasn't arrived yet
    if (!this._forecastEvent || !this._forecastEvent.forecast) {
      return html`
        <div class="container">
          ${this.showTitle ? html`<div class="title">Daily forecast</div>` : nothing}
          <div class="loading">Loading Forecast...</div>
        </div>
      `;
    }

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const forecastRows = this._forecastEvent.forecast
      .filter((dayForecast: ForecastAttribute) => {
        const forecastDate = new Date(dayForecast.datetime);
        forecastDate.setHours(0, 0, 0, 0);
        return forecastDate.getTime() !== today.getTime(); // Keep only future days
      })
      .map((dayForecast: ForecastAttribute) =>
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
        ${this.showTitle ? html`<div class="title">Daily forecast</div>` : nothing}
        <div class="forecast-grid">
          ${forecastRows.length > 0 ? forecastRows : html`<div class="loading">No future forecast available.</div>`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bwc-daily-forecast-element': BwcDailyForecastElement;
  }
}
