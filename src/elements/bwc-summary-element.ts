import classnames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {CONFIG_PROP} from '../constants/config-prop.const';
import {ICON_SIZE} from '../constants/icon-size.const';
import {getCardEntityValueAsNumber} from '../helpers/get-card-entity-value-as-number';
import {getCardEntityValueAsString} from '../helpers/get-card-entity-value-as-string';
import {shouldRenderEntity} from '../helpers/should-render-entity.helper';
import {containerStyles} from '../styles/container.style';
import {cssVariables} from '../styles/css-variables.style';
import {globalStyles} from '../styles/global.style';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';
import {Localizer} from '../types/localizer.type';
import {WeatherSummaryData} from '../types/weather-summary-data.type';

@customElement('bwc-summary-element')
export class SummaryElement extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;
  @property({type: Object}) public config!: CardConfig;
  @property({type: Object}) public cardEntities!: CardEntities;
  @property({type: Object}) public localize!: Localizer;
  @property({type: Boolean}) public dayMode!: boolean;
  @property({type: Boolean}) public darkMode!: boolean;
  @property({type: String}) public weatherClass!: string;
  @property({type: Object}) public weatherSummaryData!: WeatherSummaryData | undefined;

  static override get styles(): CSSResultGroup {
    const backgroundsBaseUrl = new URL('img/backgrounds', import.meta.url).toString();

    return css`
      ${cssVariables}
      ${globalStyles}
      ${containerStyles}

      :host {
        /* TODO: implement the remainder of the condition backgrounds */
        --background-url: url(${unsafeCSS(`${backgroundsBaseUrl}/partially-cloudy.png`)});

        display: block;

        /* TODO: make this configurable */
        background: linear-gradient(to bottom, var(--bwc-background-color-start), var(--bwc-background-color-end)),
          var(--background-url);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: overlay;
        border-radius: var(--ha-card-border-radius, 12px);

        /* Light Theme / Night Mode */
        &.night {
          --bwc-text-color: var(--text-primary-color);
          --bwc-text-color-inverted: var(--text-light-primary-color);
          --bwc-background-color-start: var(--bwc-background-color-night-start);
          --bwc-background-color-end: var(--bwc-background-color-night-end);
        }

        /* Dark Theme / Day Mode */
        &.dark-mode {
          color: var(--text-light-primary-color);

          /* Dark Theme / Night Mode */
          &.night {
            color: var(--text-primary-color);
          }
        }

        /* Stormy (same in dark mode) */
        &.stormy,
        &.dark-mode.stormy {
          --background-url: url(${unsafeCSS(`${backgroundsBaseUrl}/stormy.png`)});
          --bwc-background-color-start: var(--bwc-background-color-day-stormy-start);
          --bwc-background-color-end: var(--bwc-background-color-day-stormy-end);
        }
      }
    `;
  }

  public override render() {
    const showCurrentTemp = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_CURRENT_TEMP,
      CONFIG_PROP.CURRENT_TEMP_ENTITY_ID
    );

    const showWeatherIcon = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_WEATHER_ICON,
      CONFIG_PROP.WEATHER_ICON_ENTITY_ID
    );

    const showTime = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_TIME,
      CONFIG_PROP.TIME_ENTITY_ID
    );

    const showDate = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_DATE,
      CONFIG_PROP.DATE_ENTITY_ID
    );

    const showFeelsLikeTemperature = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_FEELS_LIKE_TEMP,
      CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID
    );

    const showNowLater = this.config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS] === true;
    const showNowLaterNow = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
      CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID
    );
    const showNowLaterLater = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
      CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID
    );

    const showWarningCount =
      shouldRenderEntity(
        this.config,
        this.cardEntities,
        CONFIG_PROP.SHOW_WARNING_COUNT,
        CONFIG_PROP.WARNING_COUNT_ENTITY_ID
      ) &&
      (!this.config[CONFIG_PROP.HIDE_WARNING_COUNT_IF_ZERO] ||
        (getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.WARNING_COUNT_ENTITY_ID]) ?? 0) > 0);

    const showRainSummary = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_RAIN_SUMMARY,
      CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID
    );

    const rainSummary = getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID]);

    const showForecastSummary = shouldRenderEntity(
      this.config,
      this.cardEntities,
      CONFIG_PROP.SHOW_FORECAST_SUMMARY,
      CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID
    );

    return html`<div class="summary">
      <!-- First Row (Current temp, weather icon and time/date) -->
      ${showCurrentTemp || showWeatherIcon || showTime
        ? html`<div class="item-container reverse">
            <!-- Current Temperature -->
            ${showCurrentTemp
              ? html`<bwc-temperature-element
                  class="item"
                  .localize=${this.localize}
                  .isLarge=${true}
                  .value=${getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID])}
                  .feelsLikeTemperature=${showFeelsLikeTemperature
                    ? getCardEntityValueAsNumber(this.hass, this.cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID])
                    : undefined}
                ></bwc-temperature-element>`
              : nothing}

            <!-- Weather Icon  -->
            ${showWeatherIcon
              ? html`<bwc-weather-icon-element
                  class=${classnames('item', {
                    center: showTime,
                    right: !showTime,
                  })}
                  .iconSize=${ICON_SIZE.HUGE}
                  .useHAWeatherIcons=${this.config[CONFIG_PROP.USE_HA_WEATHER_ICONS] === true}
                  .weatherIcon=${getCardEntityValueAsString(
                    this.hass,
                    this.cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID]
                  )}
                ></bwc-weather-icon-element>`
              : nothing}

            <!-- Time -->
            ${showTime
              ? html`<bwc-time-date-element
                  class="item right"
                  .hass=${this.hass}
                  .showDate=${showDate}
                  .cardTimeEntity=${this.cardEntities[CONFIG_PROP.TIME_ENTITY_ID]}
                  .cardDateEntity=${this.cardEntities[CONFIG_PROP.DATE_ENTITY_ID]}
                ></bwc-time-date-element>`
              : nothing}
          </div> `
        : nothing}

      <!-- Second Row (now/later temps and warnings) -->
      ${showNowLater || showWarningCount
        ? html`<div class="item-container justify-left">
            ${showNowLaterNow
              ? html`<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this.cardEntities[CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]
                  )}
                  .label=${getCardEntityValueAsString(
                    this.hass,
                    this.cardEntities[CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]
                  )}
                ></bwc-temperature-element> `
              : nothing}
            ${showNowLaterLater
              ? html`<bwc-temperature-element
                  class="item left no-grow"
                  .decimalPlaces=${0}
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this.cardEntities[CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]
                  )}
                  .label=${getCardEntityValueAsString(
                    this.hass,
                    this.cardEntities[CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]
                  )}
                ></bwc-temperature-element> `
              : nothing}
            ${showWarningCount
              ? html`<bwc-warnings-icon-element
                  class="item right"
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this.cardEntities[CONFIG_PROP.WARNING_COUNT_ENTITY_ID]
                  )}
                ></bwc-warnings-icon-element> `
              : nothing}
          </div> `
        : nothing}

      <!-- Third and Fourth Row -->
      <div class="item-container column">
        ${showRainSummary
          ? html`<bwc-value-label-element
              class="item"
              .value=${`${rainSummary === '0' ? this.localize('card.noRain') : `${rainSummary}mm`}`}
              .label=${rainSummary === '0' ? undefined : this.localize('card.rain')}
            ></bwc-value-label-element> `
          : nothing}
        ${showForecastSummary
          ? html`<bwc-value-label-element
              class="item"
              .value=${getCardEntityValueAsString(this.hass, this.cardEntities[CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID])}
            ></bwc-value-label-element>`
          : nothing}
      </div>
    </div> `;
  }
}
