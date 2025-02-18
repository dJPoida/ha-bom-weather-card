import classnames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import log from 'loglevel';
import {version} from '../../package.json';
import {CONFIG_PROP} from '../constants/config-prop.const';
import {DEFAULT_CARD_CONFIG} from '../constants/default-config.const';
import {A_LANGUAGE, DEFAULT_LANGUAGE} from '../constants/languages.const';
import {WEATHER_CONDITION_CLASSES} from '../constants/weather-condition-classes.const';
import {A_WEATHER_CONDITION} from '../constants/weather-conditions.const';
import {calculateCardEntities} from '../helpers/calculate-card-entities.helper';
import {getCardEntityValueAsString} from '../helpers/get-card-entity-value-as-string';
import {isDayMode} from '../helpers/is-day-mode.helper';
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
  @state() _weatherClass: string = '';

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

  private async _calculateWeatherClass(): Promise<void> {
    const currentCondition = getCardEntityValueAsString(
      this.hass,
      this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]
    ) as A_WEATHER_CONDITION;
    this._weatherClass = WEATHER_CONDITION_CLASSES[currentCondition] || '';

    log.debug('Weather class recalculated:', this._weatherClass);
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

    if (!this.isConnected || !this._initialized || !this.hass || !this._config) {
      return;
    }

    const forecastEntityId = this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]?.entity_id;

    log.debug('_subscribeForecastEvents()', {forecastEntityId});

    if (!forecastEntityId) {
      log.warn('⚠️ No Forecast Entity specified. Skipping subscription to daily forecast.');
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
    const initTasks = [this._calculateCardEntities, this._calculateWeatherClass];

    Promise.all(initTasks.map((task) => task.bind(this)())).finally(() => {
      this._initialized = true;
    });
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    log.debug('updated():', changedProps);

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

    // Update the weather class that is assigned to the card
    if (changedProps.has('_cardEntities')) {
      this._calculateWeatherClass();
    }

    // TODO: ensure the efficiency of this check is maximized
    // const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    // const oldConfig = changedProps.get('_config') as CardConfig | undefined;
    if (
      changedProps.has('hass')
      // !oldHass // ||
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

  public override render() {
    log.debug('🖼️ Rendering card with state:', {
      weatherClass: this._weatherClass,
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
        [this._weatherClass]: true,
      })}"
    >
      <!-- Card Header -->
      ${this._config.title ? html`<h1 class="card-header">${this._config.title}</h1>` : nothing}

      <!-- Summary -->
      <bwc-summary-element
        .hass=${this.hass}
        .config=${this._config}
        .cardEntities=${this._cardEntities}
        .localize=${this.localize}
        .dayMode=${this._dayMode}
        .darkMode=${this._darkMode}
        .weatherClass=${this._weatherClass}
        .weatherSummaryData=${this._weatherSummaryData}
      ></bwc-summary-element>

      <!-- Daily Forecast -->
      ${this._dailyForecastEvent
        ? html`<bwc-daily-forecast-element
            .forecastData=${this._dailyForecastEvent}
            .useHAWeatherIcons=${this._config[CONFIG_PROP.USE_HA_WEATHER_ICONS] ?? false}
          ></bwc-daily-forecast-element>`
        : nothing}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${version}</span>
      </div>
    </ha-card>`;
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
