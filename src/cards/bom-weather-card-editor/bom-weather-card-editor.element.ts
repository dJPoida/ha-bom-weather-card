import {HomeAssistant, LovelaceCardEditor} from 'custom-card-helpers';
import {CSSResultGroup, LitElement, TemplateResult, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
  A_CONFIG_PROP,
  CONFIG_PROP,
} from '../../constants/card-config-prop.const';
import {DEFAULT_CARD_CONFIG} from '../../constants/default-config.const';
import {WEATHER_DOMAINS} from '../../constants/domains.const';
import {isElementHaSwitch} from '../../helpers/is-element-ha-switch.helper';
import {toLitElementArray} from '../../helpers/to-lit-element-array.helper';
import {getLocalizer} from '../../localize/localize';
import {CardConfig} from '../../types/card-config.type';
import {bomWeatherCardEditorStyle} from './bom-weather-card-editor.style';

@customElement('bom-weather-card-editor')
export class BomWeatherCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({attribute: false}) public hass!: HomeAssistant;
  @state() _config: CardConfig = {...DEFAULT_CARD_CONFIG};

  private localize = getLocalizer(this.hass);

  public setConfig(newConfig: CardConfig): void {
    this._config = {...this._config, ...newConfig};
    // Preload the HA Entity Picker
    this.loadEntityPicker();
  }

  private entityPicker(
    name: A_CONFIG_PROP,
    label: string,
    required = false
  ): TemplateResult {
    return html`
      <ha-entity-picker
        id="${name}"
        .hass=${this.hass}
        .label="${label} (${required
          ? this.localize('editor.required')
          : this.localize('editor.optional')})"
        .value=${this._config[name] ?? ''}
        @value-changed=${this._change}
        allow-custom-entity
        include-domains=${toLitElementArray(WEATHER_DOMAINS)}
        .required=${required}
      >
      </ha-entity-picker>
    `;
  }

  private textField(
    name: A_CONFIG_PROP,
    label: string,
    required = false
  ): TemplateResult {
    return html`
      <ha-textfield
        id=${name}
        type="string"
        .value=${this._config[name] ?? ''}
        .label="${label} (${required
          ? this.localize('editor.required')
          : this.localize('editor.optional')})"
        name=${name}
        @change=${this._change}
        no-spinner
        .required=${required}
      >
      </ha-textfield>
    `;
  }

  private booleanField(name: A_CONFIG_PROP, label: string): TemplateResult {
    return html`
      <ha-formfield .label=${label}>
        <ha-switch
          id=${name}
          .checked=${this._config[name] ?? false}
          @change=${this._change}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  override render() {
    return html`<div class="card-config">
      ${this.textField(CONFIG_PROP.TITLE, this.localize('editor.title'), false)}
      ${this.booleanField(
        CONFIG_PROP.SHOW_TIME,
        this.localize('editor.showTime')
      )}
      ${this.booleanField(
        CONFIG_PROP.USE_HA_WEATHER_ICONS,
        this.localize('editor.useDefaultHaWeatherIcons')
      )}
      ${this.entityPicker(
        CONFIG_PROP.FORECAST_ENTITY_ID,
        this.localize('editor.forecastEntity')
      )}
    </div> `;
  }

  _change(ev: Event) {
    const target = ev.target as HTMLInputElement;
    ev.stopPropagation();

    const targetId = target.id as A_CONFIG_PROP;

    if (!(targetId in this._config)) {
      throw new Error(this.localize('error.invalidConfigProperty', targetId));
    }

    const newValue: string | boolean | undefined = isElementHaSwitch(target)
      ? target.checked
      : target.value;
    if (newValue === this._config[targetId]) return;

    const newConfig: CardConfig = {...this._config};
    if (newValue === '' || newValue == undefined) {
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

  /**
   * Need this to load the HA elements we want to re-use
   * see: https://github.com/thomasloven/hass-config/wiki/PreLoading-Lovelace-Elements
   * */

  async loadEntityPicker(): Promise<void> {
    if (!window.customElements.get('ha-entity-picker')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ch = await (window as any).loadCardHelpers();
      const c = await ch.createCardElement({
        type: 'entities',
        entities: [],
      });
      await c.constructor.getConfigElement();

      // Since ha-elements are not using scopedRegistry we can get a reference to
      // the newly loaded element from the global customElement registry...
      // const haEntityPicker = window.customElements.get("ha-entity-picker");
    }
  }

  static override styles: CSSResultGroup = bomWeatherCardEditorStyle;
}
