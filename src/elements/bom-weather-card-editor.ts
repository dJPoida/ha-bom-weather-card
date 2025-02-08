import classNames from 'classnames';
import {HomeAssistant, LovelaceCardEditor} from 'custom-card-helpers';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import log from 'loglevel';
import {A_CONFIG_PROP, CONFIG_PROP} from '../constants/config-prop.const';
import {DEFAULT_CARD_CONFIG} from '../constants/default-config.const';
import {DOMAIN} from '../constants/domains.const';
import {A_LANGUAGE, DEFAULT_LANGUAGE} from '../constants/languages.const';
import {calculateCardEntities} from '../helpers/calculate-card-entities.helper';
import {getCardEntityDetails} from '../helpers/get-card-entity-details.helper';
import {isElementHaSwitch} from '../helpers/is-element-ha-switch.helper';
import {preLoadEntityPicker} from '../helpers/preload-element-ha-entity-picker.helper';
import {toLitElementArray} from '../helpers/to-lit-element-array.helper';
import {getLocalizer} from '../localize/localize';
import {cssVariables} from '../styles/css-variables.style';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';

@customElement('bom-weather-card-editor')
export class BomWeatherCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({attribute: false}) public hass!: HomeAssistant;
  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};
  @state() _cardEntities: CardEntities = {} as CardEntities;

  private language: A_LANGUAGE = DEFAULT_LANGUAGE;
  private localize = getLocalizer(this.language);

  private _initialized = false;

  static override get styles(): CSSResultGroup {
    return css`
      ${cssVariables}

      .card-config {
        /* Cancels overlapping Margins for HAForm + Card Config options */
        overflow: auto;

        /* Prevents the entire dialog from scrolling which takes the preview out of view */
        max-height: 55vh;

        /* Seems to fix a scroll bar issue created by an empty element picker */
        padding-right: var(--bwc-global-padding);

        display: flex;
        flex-direction: column;
      }

      .item-group {
        display: flex;
        flex-direction: column;
        gap: var(--bwc-global-padding);

        margin-bottom: var(--bwc-global-padding);

        &.item {
          margin-bottom: var(--bwc-global-padding);
          flex: 1;
        }
      }

      ha-formfield {
        display: flex;
      }

      ha-switch {
        padding: var(--bwc-global-padding) 6px;
      }

      ha-expansion-panel {
        margin-bottom: var(--bwc-global-padding);
      }
    `;
  }

  protected override firstUpdated(): void {
    this._calculateCardEntities();

    // Preload the required HA Components
    preLoadEntityPicker(this.localize);
  }

  // Override the updated method
  protected override updated(
    changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (changedProperties.has('hass')) {
      if ((this.hass.locale?.language as A_LANGUAGE) !== this.language) {
        this.language = this.hass.locale?.language as A_LANGUAGE;
        this.localize = getLocalizer(this.language);
      }
    }

    if (changedProperties.has('_config')) {
      this._calculateCardEntities();
    }
  }

  public setConfig(newConfig: CardConfig): void {
    // On first load, merge the default config with the user provided config
    if (!this._initialized) {
      this._config = {
        ...this._config,
        ...newConfig,
      };
      this._initialized = true;
    } else {
      this._config = {...newConfig};
    }
  }

  private async _calculateCardEntities(): Promise<void> {
    this._cardEntities = await calculateCardEntities(this.hass, this._config);

    log.debug('🔧 Card Entities Recalculated:', this._cardEntities);
  }

  _handleFieldChange(ev: Event | CustomEvent) {
    const target = ev.target as HTMLInputElement;
    ev.stopPropagation();

    const targetId = target.id as A_CONFIG_PROP;
    if (!(targetId in DEFAULT_CARD_CONFIG)) {
      throw new Error(
        this.localize('error.invalidConfigProperty', {property: targetId})
      );
    }

    const newValue: string | boolean | undefined = isElementHaSwitch(target)
      ? target.checked
      : target.value;

    log.debug('🔧 Config Change:', newValue);

    if (newValue === this._config[targetId]) return;

    const newConfig: CardConfig = {...this._config};
    if (newValue === '' || newValue === undefined) {
      delete newConfig[targetId];
    } else {
      (newConfig as Record<string, unknown>)[targetId] = newValue;
    }

    const messageEvent = new CustomEvent('config-changed', {
      detail: {config: newConfig},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  private renderWeatherDevicePicker(
    name: A_CONFIG_PROP,
    label: string,
    required = false
  ): TemplateResult {
    return html`
      <bwc-weather-device-picker-element
        id="${name}"
        .hass=${this.hass}
        .label="${label} (${required
          ? this.localize('editor.required')
          : this.localize('editor.optional')})"
        .value=${typeof this._config[name] === 'string'
          ? this._config[name]
          : ''}
        @value-changed=${this._handleFieldChange}
      ></bwc-weather-device-picker-element>
    `;
  }

  private renderEntityPicker(
    name: A_CONFIG_PROP,
    label: string,
    includeDomains: string[] = [],
    required = false,
    helper: string | undefined = undefined
  ): TemplateResult {
    return html`
      <ha-entity-picker
        id="${name}"
        .hass=${this.hass}
        class=${classNames('item')}
        .label="${label} (${required
          ? this.localize('editor.required')
          : this.localize('editor.optional')})"
        .value=${this._config[name] ?? ''}
        @value-changed=${this._handleFieldChange}
        allow-custom-entity
        include-domains=${toLitElementArray(includeDomains)}
        .required=${required}
        .helper=${helper}
      >
      </ha-entity-picker>
    `;
  }

  private renderTextField(
    name: A_CONFIG_PROP,
    label: string,
    required = false
  ): TemplateResult {
    return html`
      <ha-textfield
        id=${name}
        type="string"
        class=${classNames('item')}
        .value=${this._config[name] ?? ''}
        .label="${label} (${required
          ? this.localize('editor.required')
          : this.localize('editor.optional')})"
        name=${name}
        @change=${this._handleFieldChange}
        no-spinner
        .required=${required}
      >
      </ha-textfield>
    `;
  }

  private renderBooleanField(
    name: A_CONFIG_PROP,
    label: string
  ): TemplateResult {
    return html`
      <ha-formfield .label=${label} class=${classNames('item')}>
        <ha-switch
          id=${name}
          .checked=${this._config[name] ?? false}
          @change=${this._handleFieldChange}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  renderSummaryOptionsPanel(): TemplateResult {
    return html`<ha-expansion-panel
      .outlined=${true}
      header="${this.localize('editor.summary')}"
    >
      <!-- Show Current Temperature -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_CURRENT_TEMP,
        this.localize('editor.showCurrentTemperature')
      )}

      <!-- Current Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP]
        ? this.renderEntityPicker(
            CONFIG_PROP.CURRENT_TEMP_ENTITY_ID,
            this.localize('editor.currentTemperatureEntity'),
            [],
            false,
            getCardEntityDetails(
              this._cardEntities[CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]
            ).displayName
          )
        : nothing}

      <!-- Show Feels Like Temperature -->
      ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP]
        ? this.renderBooleanField(
            CONFIG_PROP.SHOW_FEELS_LIKE_TEMP,
            this.localize('editor.showFeelsLikeTemperature')
          )
        : nothing}

      <!-- Feels Like Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_CURRENT_TEMP] &&
      this._config[CONFIG_PROP.SHOW_FEELS_LIKE_TEMP]
        ? this.renderEntityPicker(
            CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID,
            this.localize('editor.feelsLikeTemperatureEntity'),
            [],
            false,
            this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]
              ?.is_inferred
              ? this._cardEntities[CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]
                  .entity_id
              : undefined
          )
        : nothing}

      <!-- Weather Icon -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_WEATHER_ICON,
        this.localize('editor.showWeatherIcon')
      )}

      <!-- Weather Icon Entity -->
      ${this._config[CONFIG_PROP.SHOW_WEATHER_ICON]
        ? this.renderEntityPicker(
            CONFIG_PROP.WEATHER_ICON_ENTITY_ID,
            this.localize('editor.weatherIconEntity'),
            [],
            false,
            getCardEntityDetails(
              this._cardEntities[CONFIG_PROP.WEATHER_ICON_ENTITY_ID]
            ).displayName
          )
        : nothing}

      <!-- Use Default Weather Icons -->
      ${this._config[CONFIG_PROP.SHOW_WEATHER_ICON]
        ? this.renderBooleanField(
            CONFIG_PROP.USE_HA_WEATHER_ICONS,
            this.localize('editor.useDefaultHaWeatherIcons')
          )
        : nothing}

      <!-- Show Time -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_TIME,
        this.localize('editor.showTime')
      )}

      <!-- Time Entity -->
      ${this._config[CONFIG_PROP.SHOW_TIME]
        ? this.renderEntityPicker(
            CONFIG_PROP.TIME_ENTITY_ID,
            this.localize('editor.timeEntity'),
            [],
            false,
            this._cardEntities[CONFIG_PROP.TIME_ENTITY_ID]?.is_inferred
              ? this._cardEntities[CONFIG_PROP.TIME_ENTITY_ID].entity_id
              : undefined
          )
        : nothing}

      <!-- Show Date -->
      ${this._config[CONFIG_PROP.SHOW_TIME]
        ? this.renderBooleanField(
            CONFIG_PROP.SHOW_DATE,
            this.localize('editor.showDate')
          )
        : nothing}

      <!-- Date Entity -->
      ${this._config[CONFIG_PROP.SHOW_TIME] &&
      this._config[CONFIG_PROP.SHOW_DATE]
        ? this.renderEntityPicker(
            CONFIG_PROP.DATE_ENTITY_ID,
            this.localize('editor.dateEntity'),
            [],
            false,
            this._cardEntities[CONFIG_PROP.DATE_ENTITY_ID]?.is_inferred
              ? this._cardEntities[CONFIG_PROP.DATE_ENTITY_ID].entity_id
              : undefined
          )
        : nothing}

      <!-- Show Now / Later Temps -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_NOW_LATER_TEMPS,
        this.localize('editor.showNowLaterTemps')
      )}

      <!-- Now Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
        ? this.renderEntityPicker(
            CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID,
            this.localize('editor.nowTempEntity')
          )
        : nothing}

      <!-- Now Label Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
        ? this.renderEntityPicker(
            CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID,
            this.localize('editor.nowLabelEntity')
          )
        : nothing}

      <!-- Later Temp Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
        ? this.renderEntityPicker(
            CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID,
            this.localize('editor.laterTempEntity')
          )
        : nothing}

      <!-- Later Label Entity -->
      ${this._config[CONFIG_PROP.SHOW_NOW_LATER_TEMPS]
        ? this.renderEntityPicker(
            CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID,
            this.localize('editor.laterLabelEntity')
          )
        : nothing}

      <!-- Show Warnings Count -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_WARNINGS_COUNT,
        this.localize('editor.showWarningsCount')
      )}

      <!-- Warnings Count Entity -->
      ${this._config[CONFIG_PROP.SHOW_WARNINGS_COUNT]
        ? this.renderEntityPicker(
            CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID,
            this.localize('editor.warningsCountEntity')
          )
        : nothing}

      <!-- Show Rain Summary -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_RAIN_SUMMARY,
        this.localize('editor.showRainSummary')
      )}

      <!-- Rain Summary Entity -->
      ${this._config[CONFIG_PROP.SHOW_RAIN_SUMMARY]
        ? this.renderEntityPicker(
            CONFIG_PROP.RAIN_SUMMARY_ENTITY_ID,
            this.localize('editor.rainSummaryEntity')
          )
        : nothing}

      <!-- Show Forecast Summary -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_FORECAST_SUMMARY,
        this.localize('editor.showForecastSummary')
      )}

      <!-- Forecast Summary Entity -->
      ${this._config[CONFIG_PROP.SHOW_FORECAST_SUMMARY]
        ? this.renderEntityPicker(
            CONFIG_PROP.FORECAST_SUMMARY_ENTITY_ID,
            this.localize('editor.forecastSummaryEntity')
          )
        : nothing}
    </ha-expansion-panel>`;
  }

  renderHourlyForecastOptionsPanel(): TemplateResult {
    return html`<ha-expansion-panel
      .outlined=${true}
      header="${this.localize('editor.hourlyForecast')}"
    >
      <!-- Show Hourly Forecast -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_HOURLY_FORECAST,
        this.localize('editor.showHourlyForecast')
      )}
    </ha-expansion-panel>`;
  }

  renderDailyForecastOptionsPanel(): TemplateResult {
    return html`<ha-expansion-panel
      .outlined=${true}
      header="${this.localize('editor.dailyForecast')}"
    >
      <!-- Show Daily Forecast -->
      ${this.renderBooleanField(
        CONFIG_PROP.SHOW_DAILY_FORECAST,
        this.localize('editor.showDailyForecast')
      )}
    </ha-expansion-panel>`;
  }

  override render() {
    if (!this._config || !this._initialized) return html``;

    const weatherEntityDetails = getCardEntityDetails(
      this._cardEntities[CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]
    );

    return html`<div class="card-config">
      <div class="item-group">
        <!-- Title -->
        ${this.renderTextField(
          CONFIG_PROP.TITLE,
          this.localize('editor.title')
        )}

        <!-- Weather Device -->
        ${this.renderWeatherDevicePicker(
          CONFIG_PROP.WEATHER_DEVICE_ID,
          this.localize('editor.weatherDevice'),
          true
        )}

        <!-- Forecast Entity ID -->
        ${this.renderEntityPicker(
          CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID,
          this.localize('editor.summaryWeatherEntity'),
          [DOMAIN.WEATHER],
          false,
          weatherEntityDetails.displayName
        )}
      </div>

      <!-- Summary Options Panel -->
      ${this.renderSummaryOptionsPanel()}

      <!-- Hourly Forecast Options Panel -->
      ${this.renderHourlyForecastOptionsPanel()}

      <!-- Daily Forecast Options Panel -->
      ${this.renderDailyForecastOptionsPanel()}
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bom-weather-card-editor': BomWeatherCardEditor;
  }
}
