import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
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
import {getLocalizer} from '../localize/localize';
import {containerStyles} from '../styles/container.style';
import {cssVariables} from '../styles/css-variables.style';
import {globalStyles} from '../styles/global.style';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';
import {WeatherSummaryData} from '../types/weather-summary-data.type';

// Estimated component heights (adjust as needed)
const ESTIMATED_SUMMARY_HEIGHT = 12; // em
const ESTIMATED_TITLE_HEIGHT = 3; // em (approx header font size + padding)
const ESTIMATED_FORECAST_HEIGHT = 18; // em (based on daily forecast calc: title + 4*3.5em rows + padding)
const ESTIMATED_BASE_PADDING_HEIGHT = 2; // em (e.g., version number padding)

@customElement('bom-weather-card')
export class BomWeatherCard extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};
  @state() _cardEntities: CardEntities = {} as CardEntities;

  @state() _dayMode: boolean = true;
  @state() _darkMode: boolean = false;
  @state() _weatherClass: string = '';

  @state() _weatherSummaryData: WeatherSummaryData | undefined;

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
        /* Use the calculated min-height if available, otherwise fallback */
        min-height: var(--bwc-card-calculated-min-height, var(--bwc-min-height));
        border: none;
        overflow: hidden; /* Prevent content spillover during loading */
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

  private _calculateMinHeight(): string {
    let totalHeight = 0;

    // Always include summary height (it's always shown)
    totalHeight += ESTIMATED_SUMMARY_HEIGHT;

    if (this._config.title) {
      totalHeight += ESTIMATED_TITLE_HEIGHT;
    }

    if (this._config[CONFIG_PROP.SHOW_DAILY_FORECAST]) {
      totalHeight += ESTIMATED_FORECAST_HEIGHT;
    }

    // Base padding/debug info
    totalHeight += ESTIMATED_BASE_PADDING_HEIGHT;

    log.debug(`Calculated min-height: ${totalHeight}em`);
    return `${totalHeight}em`;
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

    const oldConfig = changedProps.get('_config') as CardConfig | undefined;
    const entityIdKey = CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID;

    // Original logic for entity calculation on config change (can stay)
    if (changedProps.has('_config')) {
      log.debug('config changed', this._config);
      this._calculateCardEntities(); // Recalculate entities if any config changed
    }

    // Update the weather class that is assigned to the card
    if (changedProps.has('_cardEntities')) {
      // Check if the specific weather entity changed before recalculating class
      const oldCardEntities = changedProps.get('_cardEntities') as CardEntities | undefined;
      if (oldCardEntities?.[entityIdKey] !== this._cardEntities[entityIdKey]) {
        this._calculateWeatherClass();
      }
    }

    if (changedProps.has('hass')) {
      // Original hass update logic (can stay)
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
  }

  public override disconnectedCallback(): void {
    log.debug('❌ disconnected from DOM');
    super.disconnectedCallback();
  }

  public override render() {
    log.debug('🖼️ Rendering card with state:', {
      weatherClass: this._weatherClass,
      hass: this.hass,
      config: this._config,
    });

    const cardClasses: Record<string, boolean> = {
      day: this._dayMode,
      night: !this._dayMode,
      'dark-mode': this._darkMode,
      'light-mode': !this._darkMode,
    };

    // Conditionally add weather class if it exists
    if (this._weatherClass) {
      cardClasses[this._weatherClass] = true;
    }

    const cardStyles = {
      '--bwc-card-calculated-min-height': this._calculateMinHeight(),
    };

    return html`<ha-card class=${classMap(cardClasses)} style=${styleMap(cardStyles)}>
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
      ${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST]
        ? html`<bwc-daily-forecast-element
            .hass=${this.hass}
            .forecastEntityId=${this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]?.entity_id}
            .useHAWeatherIcons=${this._config[CONFIG_PROP.USE_HA_WEATHER_ICONS] ?? false}
            .showTitle=${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE] ?? true}
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
