import classnames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import log from 'loglevel';
import {version} from '../../package.json';
import {CONFIG_PROP} from '../constants/config-prop.const';
import {DEFAULT_CARD_CONFIG} from '../constants/default-config.const';
import {A_LANGUAGE, DEFAULT_LANGUAGE} from '../constants/languages.const';
import {calculateCardEntities} from '../helpers/calculate-card-entities.helper';
import {getCardEntityValueAsNumber} from '../helpers/get-card-entity-value-as-number';
import {getCardEntityValueAsString} from '../helpers/get-card-entity-value-as-string';
import {isDayMode} from '../helpers/is-day-mode.helper';
import {shouldRenderEntity} from '../helpers/should-render-entity.helper';
import {ForecastEvent, subscribeForecast} from '../lib/weather';
import {getLocalizer} from '../localize/localize';
import {containerStyles} from '../styles/container.style';
import {cssVariables} from '../styles/css-variables.style';
import {globalStyles} from '../styles/global.style';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';
import {WeatherSummaryData} from '../types/weather-summary-data.type';

@customElement('bom-weather-card')
export class BomWeatherCard extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};
  @state() _cardEntities: CardEntities = {} as CardEntities;

  @state() _dayMode: boolean = true;
  @state() _darkMode: boolean = false;

  @state() _weatherSummaryData: WeatherSummaryData | undefined;

  @state() private _dailyForecastSubscribed?: Promise<() => void>;
  @state() private _dailyForecastEvent?: ForecastEvent;

  private language: A_LANGUAGE = DEFAULT_LANGUAGE;
  private localize = getLocalizer(this.language);
  private _initialized = false;

  static override get styles(): CSSResultGroup {
    return css`
      ${cssVariables}
      ${globalStyles}
      ${containerStyles}
      
      ha-card {
        color: var(--bwc-text-color);

        /* TODO: make this configurable */
        background: linear-gradient(
          to bottom,
          var(--bwc-background-color-start),
          var(--bwc-background-color-end)
        );
        min-height: var(--bwc-min-height);

        /* TODO: make this configurable */
        border: none;
      }

      h1.card-header {
        padding-bottom: 0;
      }

      span.version {
        padding: var(--bwc-global-padding);
      }
    `;
  }

  static getStubConfig() {
    // TODO: this needs to be implemented properly so that the preview in the card picker renders sample data
    return {...DEFAULT_CARD_CONFIG};
  }

  setConfig(config: CardConfig) {
    if (!config) {
      throw new Error(this.localize('error.invalidConfigProperty'));
    }
    this._config = {...this._config, ...config};
  }

  private async _calculateCardEntities(): Promise<void> {
    this._cardEntities = await calculateCardEntities(this.hass, this._config);

    log.debug('Card Entities Recalculated:', this._cardEntities);
  }

  /**
   * Unsubscribe from Home Assistant forecast events
   * Typically called when the card is disconnected from the DOM or
   * when the card is updated with a new config
   */
  private _unsubscribeForecastEvents() {
    if (this._dailyForecastSubscribed) {
      this._dailyForecastSubscribed.then((unsub) => unsub()).catch(() => {});
      this._dailyForecastSubscribed = undefined;
    }

    //TODO: _hourlyForecastSubscribed
  }

  private async _subscribeForecastEvents() {
    this._unsubscribeForecastEvents();

    if (
      !this.isConnected ||
      !this._initialized ||
      !this.hass ||
      !this._config
    ) {
      return;
    }

    const forecastEntityId =
      this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]?.entity_id;

    log.trace('_subscribeForecastEvents()', {forecastEntityId});

    if (!forecastEntityId) {
      log.warn(
        '⚠️ No Forecast Entity specified. Skipping subscription to daily forecast.'
      );
      return;
    }

    this._dailyForecastSubscribed = subscribeForecast(
      this.hass!,
      forecastEntityId,
      'daily', //TODO: implement this "daily" | "hourly" | "twice_daily"
      (event) => {
        log.debug('Daily Forecast Subscribed.', event);
        this._dailyForecastEvent = event;
      }
    );
  }

  protected override firstUpdated(): void {
    const initTasks = [this._calculateCardEntities];

    Promise.all(initTasks.map((task) => task.bind(this)())).finally(() => {
      this._initialized = true;
    });
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    log.trace('updated():', changedProps);

    // Subscribe to forecast events if not already subscribed
    if (!this._dailyForecastSubscribed || changedProps.has('_config')) {
      this._subscribeForecastEvents();
    }

    if (changedProps.has('_config')) {
      log.debug('config changed', this._config);

      this._calculateCardEntities();
    }

    if (changedProps.has('_dailyForecastEvent')) {
      log.debug('_dailyForecastEvent changed', this._dailyForecastEvent);
    }

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    // const oldConfig = changedProps.get('_config') as CardConfig | undefined;

    if (
      changedProps.has('hass') &&
      !oldHass // ||
      // (changedProps.has('_config') && !oldConfig) ||
      // (changedProps.has('hass') && oldHass!.themes !== this.hass.themes) ||
      // (changedProps.has('_config') && oldConfig!.theme !== this._config.theme)
    ) {
      this._dayMode = isDayMode(this.hass);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._darkMode = (this.hass.themes as any).darkMode === true;

      if ((this.hass.locale?.language as A_LANGUAGE) !== this.language) {
        this.language = this.hass.locale?.language as A_LANGUAGE;
        this.localize = getLocalizer(this.language);
      }
    }
  }

  public override connectedCallback() {
    log.debug('✅ connected to DOM');
    super.connectedCallback();
    if (this.hasUpdated && this._config && this.hass) {
      this._subscribeForecastEvents();
    }
  }

  public override disconnectedCallback(): void {
    log.debug('❌ disconnected from DOM');
    super.disconnectedCallback();
    this._unsubscribeForecastEvents();
  }

  private _renderSummary(): TemplateResult {
    const showCurrentTemp = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_CURRENT_TEMP,
      CONFIG_PROP.CURRENT_TEMP_ENTITY_ID
    );
    const showWeatherIcon = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_WEATHER_ICON,
      CONFIG_PROP.WEATHER_ICON_ENTITY_ID
    );
    const showTime = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_TIME,
      CONFIG_PROP.TIME_ENTITY_ID
    );
    const showDate = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_DATE,
      CONFIG_PROP.DATE_ENTITY_ID
    );
    const showFeelsLikeTemperature = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_FEELS_LIKE_TEMP,
      CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID
    );
    const showNowLater =
      this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS] === true;
    const showNowLaterNow = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
      CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID
    );
    const showNowLaterLater = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
      CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID
    );

    const showWarningsCount = shouldRenderEntity(
      this._config,
      this._cardEntities,
      CONFIG_PROP.SHOW_WARNINGS_COUNT,
      CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID
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
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this._cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]
                  )}
                  .feelsLikeTemperature=${showFeelsLikeTemperature
                    ? getCardEntityValueAsNumber(
                        this.hass,
                        this._cardEntities[
                          CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID
                        ]
                      )
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
                  .useHAWeatherIcons=${this._config[
                    CONFIG_PROP.USE_HA_WEATHER_ICONS
                  ] === true}
                  .weatherIcon=${getCardEntityValueAsString(
                    this.hass,
                    this._cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID]
                  )}
                ></bwc-weather-icon-element>`
              : nothing}

            <!-- Time -->
            ${showTime
              ? html`<bwc-time-date-element
                  class="item right"
                  .hass=${this.hass}
                  .showDate=${showDate}
                  .cardTimeEntity=${this._cardEntities[
                    CONFIG_PROP.TIME_ENTITY_ID
                  ]}
                  .cardDateEntity=${this._cardEntities[
                    CONFIG_PROP.DATE_ENTITY_ID
                  ]}
                ></bwc-time-date-element>`
              : nothing}
          </div> `
        : nothing}

      <!-- Second Row (now/later temps and warnings) -->
      ${showNowLater || showWarningsCount
        ? html`<div class="item-container justify-left">
            ${showNowLaterNow
              ? html`<bwc-temperature-element
                  class="item left no-grow"
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this._cardEntities[CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]
                  )}
                  .label=${getCardEntityValueAsString(
                    this.hass,
                    this._cardEntities[
                      CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID
                    ]
                  )}
                ></bwc-temperature-element> `
              : nothing}
            ${showNowLaterLater
              ? html`<bwc-temperature-element
                  class="item left no-grow"
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this._cardEntities[
                      CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID
                    ]
                  )}
                  .label=${getCardEntityValueAsString(
                    this.hass,
                    this._cardEntities[
                      CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID
                    ]
                  )}
                ></bwc-temperature-element> `
              : nothing}
            ${showWarningsCount
              ? html`<bwc-warnings-icon-element
                  class="item right"
                  .value=${getCardEntityValueAsNumber(
                    this.hass,
                    this._cardEntities[CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID]
                  )}
                ></bwc-warnings-icon-element> `
              : nothing}
          </div> `
        : nothing}

      <!-- Third and Fourth Row -->
      <div class="item-container column">
        <bwc-value-label-element
          class="item"
          value="0-1mm"
          label="Rain"
        ></bwc-value-label-element>

        <bwc-value-label-element
          class="item"
          value="Becoming Sunny"
        ></bwc-value-label-element>
      </div>
    </div> `;
  }

  public override render() {
    log.trace('🖼️ Rendering card with state:', {
      hass: this.hass,
      config: this._config,
      forecast: this._dailyForecastEvent,
    });

    return html`<ha-card
      class="${classnames({
        day: this._dayMode,
        night: !this._dayMode,
        'dark-mode': this._darkMode,
        'light-mode': !this._darkMode,
      })}"
    >
      <!-- Card Header -->
      ${this._config.title
        ? html`<h1 class="card-header">${this._config.title}</h1>`
        : nothing}

      <!-- Summary -->
      ${this._renderSummary()}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${version}</span>
      </div>
    </ha-card> `;
  }

  /**
   * Called by Home Assistant to get element responsible for rendering the card editor
   *
   * @returns {Promise<LitElement>} An instance of the BomWeatherCardEditor element
   */
  public static async getConfigElement(): Promise<LitElement> {
    await import('./bom-weather-card-editor');
    return document.createElement('bom-weather-card-editor');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bom-weather-card': BomWeatherCard;
  }
}
