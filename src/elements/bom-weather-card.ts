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
import {getLocalizer} from '../localize/localize';
import {CardState} from '../state/card-state';
import {containerStyles} from '../styles/container.style';
import {cssVariables} from '../styles/css-variables.style';
import {globalStyles} from '../styles/global.style';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';
import {WeatherSummaryData} from '../types/weather-summary-data.type';

// Estimated component heights (adjust as needed)
const ESTIMATED_SUMMARY_HEIGHT = 12; // em
const ESTIMATED_TITLE_HEIGHT = 3; // em (approx header font size + padding)
const ESTIMATED_BASE_PADDING_HEIGHT = 2; // em (e.g., version number padding)

@customElement('bom-weather-card')
export class BomWeatherCard extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};
  @state() _cardEntities: CardEntities = {} as CardEntities;

  @state() _weatherConditionClass: string = '';

  @state() _weatherSummaryData: WeatherSummaryData | undefined;

  private language: A_LANGUAGE = DEFAULT_LANGUAGE;
  private localize = getLocalizer(this.language);
  private _cardState = new CardState();

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

        &.light-mode {
          --bwc-text-color: var(--text-light-primary-color);
          --bwc-text-color-inverted: var(--text-primary-color);
        }

        &.dark-mode {
          --bwc-text-color: var(--text-primary-color);
          --bwc-text-color-inverted: var(--text-light-primary-color);
        }
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
    this._cardState.setConfig(this._config);
  }

  private async _calculateCardEntities(): Promise<void> {
    this._cardEntities = await calculateCardEntities(this.hass, this._config);

    log.debug('[BomWeatherCard] Card Entities Recalculated:', this._cardEntities);
  }

  private async _calculateWeatherConditionClass(): Promise<void> {
    const currentCondition = getCardEntityValueAsString(
      this.hass,
      this._cardEntities[CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID]
    ) as A_WEATHER_CONDITION;
    this._weatherConditionClass = WEATHER_CONDITION_CLASSES[currentCondition] || '';

    log.debug('[BomWeatherCard] Weather Condition Class recalculated:', {
      condition: currentCondition,
      weatherConditionClass: this._weatherConditionClass,
    });
  }

  private _calculateMinHeight(): string {
    let totalHeight = 0;
    totalHeight += ESTIMATED_SUMMARY_HEIGHT;
    if (this._config.title) {
      totalHeight += ESTIMATED_TITLE_HEIGHT;
    }
    totalHeight += ESTIMATED_BASE_PADDING_HEIGHT;
    log.debug(`[BomWeatherCard] Calculated min-height: ${totalHeight}em`);
    return `${totalHeight}em`;
  }

  protected override shouldUpdate(changedProperties: PropertyValues): boolean {
    // Allow update if non-hass properties changed
    let hasNonHassChanges = false;
    changedProperties.forEach((_, key) => {
      if (key !== 'hass') {
        hasNonHassChanges = true;
      }
    });
    if (hasNonHassChanges) {
      log.debug('[BomWeatherCard] shouldUpdate: true (non-hass property changed)');
      return true;
    }

    log.debug('[BomWeatherCard] shouldUpdate: evaluating hass change');
    // If only 'hass' changed, perform a deeper comparison
    if (changedProperties.has('hass')) {
      const cardStateChanged = this._cardState.updateHass(this.hass);

      const oldHass = changedProperties.get('hass') as HomeAssistant | undefined;
      log.debug('[BomWeatherCard] shouldUpdate: hass changed', {hasOldHass: !!oldHass});

      // On first load, oldHass will be undefined, allow update
      if (!oldHass) {
        log.debug('[BomWeatherCard] shouldUpdate: true (initial hass set)');
        return true;
      }

      // 1. Check if CardState detected relevant changes (result captured above)
      if (cardStateChanged) {
        log.debug('[BomWeatherCard] shouldUpdate: true (CardState detected changes)');
        return true;
      }

      // 2. Check locale language
      if (oldHass.locale?.language !== this.hass!.locale?.language) {
        log.debug('[BomWeatherCard] shouldUpdate: true (locale changed)');
        return true;
      }

      // 3. Check states of entities used by this card
      const relevantEntityIds = new Set<string>();
      // Add entities explicitly set in config ending with _entity_id
      for (const key in this._config) {
        if (key.endsWith('_entity_id')) {
          const entityId = this._config[key as keyof CardConfig];
          if (typeof entityId === 'string' && entityId.includes('.')) {
            relevantEntityIds.add(entityId);
          }
        }
      }

      // Also check the main weather entity
      const weatherEntity = this._config[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID];
      if (typeof weatherEntity === 'string' && weatherEntity.includes('.')) {
        relevantEntityIds.add(weatherEntity);
      }

      // Add the configured sun entity ID to relevant entities
      const sunEntityId = this._cardState['_sunEntityId']; // Access private member for shouldUpdate logic
      if (sunEntityId) {
        relevantEntityIds.add(sunEntityId);
      }

      for (const entityId of relevantEntityIds) {
        if (oldHass.states[entityId] !== this.hass!.states[entityId]) {
          log.debug(`[BomWeatherCard] shouldUpdate: true (state changed for ${entityId})`);
          return true;
        }
      }

      // If none of the relevant parts changed, skip the update
      log.debug('[BomWeatherCard] shouldUpdate: false (only non-relevant hass changes detected)');
      return false;
    }

    // Default fallback (should not happen if logic is correct)
    log.debug('[BomWeatherCard] shouldUpdate: true (default fallback)');
    return true;
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties); // Ensure super is called if needed

    // Try to initialize CardState with the initial hass object
    if (this.hass) {
      log.debug('[BomWeatherCard] firstUpdated: Initializing CardState with hass.');
      this._cardState.updateHass(this.hass);
      this.requestUpdate();
    }

    const initTasks = [this._calculateCardEntities, this._calculateWeatherConditionClass];

    Promise.all(initTasks.map((task) => task.bind(this)())).finally(() => {
      log.debug('[BomWeatherCard] Initialization tasks complete.');
    });
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    log.debug('[BomWeatherCard] updated():', changedProps);

    if (changedProps.has('_config')) {
      log.debug('[BomWeatherCard] config changed', this._config);
      this._calculateCardEntities();
    }

    // When either the Card Entity for the weather condition or the hass state for the assigned entity changes,
    // Update the weather condition class that is assigned to the card
    if (changedProps.has('_cardEntities') || changedProps.has('hass')) {
      const oldCardEntities = changedProps.get('_cardEntities') as CardEntities | undefined;
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (
        // Entity ID for the weather condition has changed
        oldCardEntities?.[CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID] !==
          this._cardEntities[CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID] ||
        // State for the weather condition has changed
        (this._cardEntities[CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID]?.entity_id &&
          oldHass?.states[this._cardEntities[CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID].entity_id!] !==
            this.hass?.states[this._cardEntities[CONFIG_PROP.WEATHER_CONDITION_ENTITY_ID].entity_id!])
      ) {
        log.debug('[BomWeatherCard] Weather condition changed', this._config);
        this._calculateWeatherConditionClass();
      }
    }

    // This section now only runs when shouldUpdate allows an update involving hass
    if (changedProps.has('hass')) {
      if ((this.hass.locale?.language as A_LANGUAGE) !== this.language) {
        this.language = this.hass.locale?.language as A_LANGUAGE;
        this.localize = getLocalizer(this.language);
      }
    }
  }

  public override connectedCallback() {
    log.debug('[BomWeatherCard] ✅ connected to DOM');
    super.connectedCallback();
  }

  public override disconnectedCallback(): void {
    log.debug('[BomWeatherCard] ❌ disconnected from DOM');
    super.disconnectedCallback();
  }

  public override render() {
    log.debug('[BomWeatherCard] 🖼️ Rendering card...');

    // Don't render until CardState has received hass
    if (!this._cardState.hasHass) {
      log.debug('[BomWeatherCard] Skipping render: CardState has no hass yet.');
      return nothing;
    }

    log.debug('[BomWeatherCard] State for render:', {
      darkMode: this._cardState.darkMode,
      dayMode: this._cardState.dayMode,
      weatherConditionClass: this._weatherConditionClass,
      hass: this.hass,
      config: this._config,
    });

    const cardClasses: Record<string, boolean> = {
      day: this._cardState.dayMode,
      night: !this._cardState.dayMode,
      'dark-mode': this._cardState.darkMode,
      'light-mode': !this._cardState.darkMode,
    };

    // Conditionally add weather class if it exists
    if (this._weatherConditionClass) {
      cardClasses[this._weatherConditionClass] = true;
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
        .dayMode=${this._cardState.dayMode}
        .darkMode=${this._cardState.darkMode}
        .weatherConditionClass=${this._weatherConditionClass}
        .weatherSummaryData=${this._weatherSummaryData}
      ></bwc-summary-element>

      <!-- Daily Forecast -->
      ${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST]
        ? html`<bwc-daily-forecast-element
            .hass=${this.hass}
            .forecastEntityId=${this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]?.entity_id}
            .useHAWeatherIcons=${this._config[CONFIG_PROP.USE_HA_WEATHER_ICONS] ?? false}
            .showTitle=${this._config[CONFIG_PROP.SHOW_DAILY_FORECAST_TITLE] ?? true}
            .numberOfDays=${this._config[CONFIG_PROP.DAILY_FORECAST_NUMBER_OF_DAYS] ?? 5}
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
