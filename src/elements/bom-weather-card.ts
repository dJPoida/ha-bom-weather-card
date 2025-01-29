import classnames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {DEFAULT_CARD_CONFIG} from '../constants/default-config.const';
import {OBSERVATION_ATTRIBUTE} from '../constants/observation-attributes.const';
import {isDayMode} from '../helpers/is-day-mode.helper';
import {getLocalizer} from '../localize/localize';
import {containerStyles} from '../styles/container.style';
import {cssVariables} from '../styles/css-variables.style';
import {debugStyles} from '../styles/debug.style';
import {CardConfig} from '../types/card-config.type';

@customElement('bom-weather-card')
export class BomWeatherCard extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};

  @state() _dayMode: boolean = true;
  @state() _darkMode: boolean = false;

  private localize = getLocalizer(this.hass);

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
    }
  }

  // Render card
  override render() {
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

      <!-- First Row -->
      <div class="item-container">
        <!-- Current Temperature (conditional on observation_entity_id) -->
        ${this._config.observation_entity_id
          ? html`<bwc-temperature-element
              class="item"
              .temperature=${this.hass.states[
                this._config.observation_entity_id
              ].attributes[OBSERVATION_ATTRIBUTE.CURRENT_TEMPERATURE]}
            ></bwc-temperature-element>`
          : nothing}

        <!-- Weather Icon (conditional on forecast_entity_id) -->
        ${this._config.observation_entity_id
          ? html`<bwc-weather-icon-element
              class=${classnames('item', {
                center: this._config.show_time === true,
                right: this._config.show_time !== true,
              })}
              .hass=${this.hass}
              .useHAWeatherIcons=${this._config.use_ha_weather_icons === true}
              .weatherEntityId=${this._config.observation_entity_id}
            ></bwc-weather-icon-element>`
          : nothing}

        <!-- Time -->
        ${this._config.show_time === true
          ? html`<bwc-time-element
              class="item"
              .hass=${this.hass}
            ></bwc-time-element>`
          : nothing}
      </div>

      <!-- Second Row -->
      <div class="item-container">
        <div class="item">TBD: Min / Max</div>

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
    </ha-card> `;
  }

  public static async getConfigElement(): Promise<LitElement> {
    await import('./bom-weather-card-editor');
    return document.createElement('bom-weather-card-editor');
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${cssVariables}
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

      ${debugStyles}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bom-weather-card': BomWeatherCard;
  }
}
