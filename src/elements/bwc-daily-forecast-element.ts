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
  @property({type: Number}) numberOfDays = 5; // Default number of days

  @state() private _forecastSubscribed?: Promise<() => void>;
  @state() private _forecastEvent?: ForecastEvent;

  static override styles: CSSResultGroup = css`
    :host {
      color: var(--bwc-text-color);
      /* Removed estimated row count/height vars for now */
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: var(--bwc-global-padding);
      color: var(--bwc-text-color);
      /* Simpler min-height based on title+padding, content determines rest */
      min-height: calc(
        (var(--bwc-section-header-font-size) * 1.2) /* Title height approx */ + var(--bwc-global-padding)
          /* Space below title */ + var(--bwc-global-padding) /* Bottom padding */
      );
    }

    .title:not(:empty) {
      /* Only add margin if title is shown */
      margin-bottom: var(--bwc-global-padding);
    }

    /* Remove min-height if title is hidden */
    :host([notitle]) .container {
      min-height: 0; /* Or just padding calc if preferred */
    }

    .loading {
      display: block;
      text-align: center;
      padding: var(--bwc-global-padding) 0; /* Add some padding */
    }

    .forecast-grid {
      display: grid;
      /* Day(max), Icon(fixed), Temp(fill), Rain(max) */
      grid-template-columns: max-content auto auto max-content;
      align-items: center;
      gap: 0 calc(var(--bwc-global-padding) / 2);
    }

    /* Style for the new separator element */
    .forecast-separator {
      grid-column: 1 / -1; /* Span all columns */
      border-bottom: 1px solid var(--divider-color);
      height: 1px;
      margin: calc(var(--bwc-global-padding) / 2) 0; /* Vertical spacing */
    }

    .day {
      font-weight: bold;
      text-align: left;
      font-size: var(--bwc-daily-forecast-day-font-size);
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
    }

    .icon-container {
      /* Container for centering icon */
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
    }

    .temperature {
      text-align: left;
      font-size: var(--bwc-daily-forecast-temp-font-size);
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
      white-space: nowrap;
    }

    .rain {
      text-align: right;
      font-size: var(--bwc-daily-forecast-rain-font-size);
      padding: calc(var(--bwc-global-padding) / 2) 0; /* Restore padding */
      white-space: break-spaces;
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
    const oldForecastEntityId = changedProps.get('forecastEntityId') as string | undefined;

    // Unsubscribe if hass or entityId are removed
    if ((!this.hass || !this.forecastEntityId) && this._forecastSubscribed) {
      log.debug('[BwcDailyForecastElement] Hass or forecastEntityId removed, unsubscribing...');
      this._unsubscribe();
      return;
    }

    // Subscribe if we now have hass and entityId but weren't subscribed (e.g., initial load)
    if (this.hass && this.forecastEntityId && !this._forecastSubscribed) {
      log.debug('[BwcDailyForecastElement] Hass and forecastEntityId available, subscribing...');
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
      log.debug('[BwcDailyForecastElement] forecastEntityId changed, resubscribing...');
      this._unsubscribe();
      this._subscribe();
    }
  }

  private _subscribe(): void {
    if (!this.hass || !this.forecastEntityId) {
      return;
    }
    log.debug(`[BwcDailyForecastElement] Subscribing to daily forecast for ${this.forecastEntityId}`);
    this._forecastSubscribed = subscribeForecast(this.hass!, this.forecastEntityId, 'daily', (event) => {
      log.debug('[BwcDailyForecastElement] Daily Forecast Received in Element.', event);
      this._forecastEvent = event;
    });
  }

  private _unsubscribe(): void {
    if (this._forecastSubscribed) {
      log.debug(`[BwcDailyForecastElement] Unsubscribing from daily forecast for ${this.forecastEntityId}`);
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
  ): TemplateResult[] {
    return [
      html`<div class="day">${day}</div>`,
      html`<div class="icon-container">
        <bwc-weather-icon-element
          .noPadding=${true}
          .useHAWeatherIcons=${this.useHAWeatherIcons}
          .weatherIcon=${condition}
          .iconSize=${ICON_SIZE.REGULAR}
        ></bwc-weather-icon-element>
      </div>`,
      html`<div class="temperature">${typeof low === 'number' ? `${low}° - ` : ''}${high}°</div>`,
      html`<div class="rain">${rain === 0 ? 'No Rain' : `${rain}mm`}${rain === 0 ? '' : ` (${rainChance}%)`}</div>`,
    ];
  }

  override render(): TemplateResult {
    // Add host attribute for styling when title is hidden
    this.toggleAttribute('notitle', !this.showTitle);

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

    // Process forecast data
    const futureForecasts = this._forecastEvent.forecast
      .filter((dayForecast: ForecastAttribute) => {
        const forecastDate = new Date(dayForecast.datetime);
        forecastDate.setHours(0, 0, 0, 0);
        return forecastDate.getTime() !== today.getTime(); // Keep only future days
      })
      .slice(0, this.numberOfDays); // Limit number of days shown

    // Generate grid items including separators
    const gridItems: TemplateResult[] = [];
    futureForecasts.forEach((dayForecast, index) => {
      gridItems.push(
        ...this._renderForecastRow(
          new Date(dayForecast.datetime).toLocaleDateString('en-US', {weekday: 'long'}),
          dayForecast.templow ?? undefined,
          dayForecast.temperature,
          dayForecast.precipitation ?? 0,
          dayForecast.precipitation_probability ?? 0,
          dayForecast.condition ?? ''
        )
      );
      // Add separator after each row except the last one
      if (index < futureForecasts.length - 1) {
        gridItems.push(html`<div class="forecast-separator"></div>`);
      }
    });

    return html`
      <div class="container">
        ${this.showTitle ? html`<div class="title">Daily forecast</div>` : nothing}
        <div class="forecast-grid">
          ${gridItems.length > 0 ? gridItems : html`<div class="loading">No future forecast available.</div>`}
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
