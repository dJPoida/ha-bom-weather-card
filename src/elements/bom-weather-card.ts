/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {version} from '../../package.json';
import {CONFIG_PROP} from '../constants/card-config-prop.const';
import {DEFAULT_CARD_CONFIG} from '../constants/default-config.const';
import {A_LANGUAGE, DEFAULT_LANGUAGE} from '../constants/languages.const';
import {OBSERVATION_ATTRIBUTE} from '../constants/observation-attributes.const';
import {isDayMode} from '../helpers/is-day-mode.helper';
import {getLocalizer} from '../localize/localize';
import {containerStyles} from '../styles/container.style';
import {cssVariables} from '../styles/css-variables.style';
import {globalStyles} from '../styles/global.style';
import {CardConfig} from '../types/card-config.type';

@customElement('bom-weather-card')
export class BomWeatherCard extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};

  @state() _dayMode: boolean = true;
  @state() _darkMode: boolean = false;

  @state() private forecast: any[] | null = null;

  private language: A_LANGUAGE = DEFAULT_LANGUAGE;
  private localize = getLocalizer(this.language);

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

  // Override the updated method
  protected override updated(
    changedProperties: Map<string | number | symbol, unknown>
  ): void {
    // TODO: This may get too heavy if hass changes often
    if (changedProperties.has('hass')) {
      this._dayMode = isDayMode(this.hass);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._darkMode = (this.hass.themes as any).darkMode === true;

      if ((this.hass.locale?.language as A_LANGUAGE) !== this.language) {
        this.language = this.hass.locale?.language as A_LANGUAGE;
        this.localize = getLocalizer(this.language);
      }
    } else if (changedProperties.has('entity')) {
      this.loadForecast();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.loadForecast();
  }

  private async loadForecast() {
    this.forecast = this.getForecast() ?? (await this.fetchForecast());
    this.requestUpdate();
  }

  private getForecast(): any[] | null {
    if (this._config[CONFIG_PROP.OBSERVATION_ENTITY_ID] === undefined) {
      return null;
    }

    const stateObj =
      this.hass.states[this._config[CONFIG_PROP.OBSERVATION_ENTITY_ID]!];
    return stateObj?.attributes?.forecast || null;
  }

  private async fetchForecast(): Promise<any[] | null> {
    try {
      const result = await this.hass.callWS({
        type: 'weather/get_forecast',
        entity_id: this._config[CONFIG_PROP.OBSERVATION_ENTITY_ID],
        forecast_type: 'daily',
      });
      console.log(result);
      return (result as any).forecast;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return null;
    }
  }

  renderSummary(): TemplateResult {
    const showCurrentTemp: boolean =
      this._config[CONFIG_PROP.SHOW_CURRENT_TEMP] === true &&
      this._config[CONFIG_PROP.OBSERVATION_ENTITY_ID] !== undefined;
    const showTime: boolean =
      this._config[CONFIG_PROP.SHOW_TIME] === true &&
      this._config[CONFIG_PROP.TIME_ENTITY_ID] !== undefined;
    const showDate: boolean =
      this._config[CONFIG_PROP.SHOW_DATE] === true &&
      this._config[CONFIG_PROP.DATE_ENTITY_ID] !== undefined;

    return html`<div class="summary">
      <!-- First Row -->
      <div class="item-container reverse">
        <!-- Current Temperature -->
        ${showCurrentTemp
          ? html`<bwc-temperature-element
              class="item"
              .localize=${this.localize}
              .temperature=${this.hass.states[
                this._config[CONFIG_PROP.OBSERVATION_ENTITY_ID]!
              ].attributes[OBSERVATION_ATTRIBUTE.CURRENT_TEMPERATURE]}
            ></bwc-temperature-element>`
          : nothing}

        <!-- Weather Icon  -->
        ${showCurrentTemp
          ? html`<bwc-weather-icon-element
              class=${classnames('item', {
                center: showTime,
                right: !showTime,
              })}
              .hass=${this.hass}
              .useHAWeatherIcons=${this._config[
                CONFIG_PROP.USE_HA_WEATHER_ICONS
              ] === true}
              .weatherEntityId=${this._config[
                CONFIG_PROP.OBSERVATION_ENTITY_ID
              ]}
            ></bwc-weather-icon-element>`
          : nothing}

        <!-- Time -->
        ${showTime
          ? html`<bwc-time-date-element
              class="item right"
              .hass=${this.hass}
              .showDate=${showDate}
            ></bwc-time-date-element>`
          : nothing}
      </div>

      <!-- Second Row -->
      <div class="item-container">
        <bwc-value-label-element
          .value=${'69°'}
          .label=${'Min Temp'}
        ></bwc-value-label-element>

        <bwc-value-label-element
          .value=${'69°'}
          .label=${'Max Temp'}
        ></bwc-value-label-element>

        <div class="item">TBD: Warnings</div>
      </div>

      <!-- Third Row -->
      <div class="item-container">
        <div class="item">TBD: Rain</div>
      </div>

      <!-- Fourth Row -->
      <div class="item-container">
        <div class="item">TBD: Summary</div>
      </div>
    </div> `;
  }

  // Render card
  override render() {
    console.log(
      this.hass.states[this._config.observation_entity_id!],
      this.forecast
    );

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
      ${this.renderSummary()}

      <!-- Debug Info -->
      <div class="bwc-debug item-container">
        <span class="version">Version ${version}</span>
      </div>
    </ha-card> `;
  }

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
