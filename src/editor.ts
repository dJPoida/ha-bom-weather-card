import {LitElement, TemplateResult, html} from 'lit';
import {property, state} from 'lit/decorators.js';
import {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from 'custom-card-helpers';
import {CardConfig} from './types/card-config.type';
import {CUSTOM_CARD_ID} from './constants/custom-card-id.const';

export class BomWeatherCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({attribute: false}) public hass!: HomeAssistant;
  @state() _config: LovelaceCardConfig = {type: CUSTOM_CARD_ID};

  BomWeatherCardEditor() {
    console.log('Loaded Editor');
  }

  setConfig(config: CardConfig): void {
    this._config = config;
    // Preload the HA Entity Picker
    this.loadEntityPicker();
  }

  private entityPicker(name: string, label: string): TemplateResult {
    return html`
      <ha-entity-picker
        id="${name}"
        .hass=${this.hass}
        .label="${label} (Optional)"
        .value=${this._config[name] ?? ''}
        @value-changed=${this._change}
        allow-custom-entity
      >
      </ha-entity-picker>
    `;
  }

  private textField(
    name: string,
    label: string,
    required = false
  ): TemplateResult {
    return html`
      <ha-textfield
        id=${name}
        type="string"
        .value=${this._config[name] ?? ''}
        .label="${label} (${required ? 'Required' : 'Optional'})"
        name=${name}
        @change=${this._change}
        no-spinner
        .required=${false}
        min="0"
      >
      </ha-textfield>
    `;
  }

  override render() {
    return html`<div class="card-config">
      ${this.textField('title', 'Title', false)}
      ${this.entityPicker('element_id', 'Entity to Show')}
    </div> `;
  }

  _change(ev: Event) {
    const target = ev.target as HTMLInputElement;
    ev.stopPropagation();
    // this._config is readonly, copy needed
    const newValue: string | undefined = target.value;
    if (newValue === this._config[target.id]) return;
    const newConfig = Object.assign({}, this._config);
    if (newValue === '' || newValue == undefined) delete newConfig[target.id];
    else newConfig[target.id] = target.value;
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

  async loadEntityPicker() {
    if (!window.customElements.get('ha-entity-picker')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ch = await (window as any).loadCardHelpers();
      const c = await ch.createCardElement({type: 'entities', entities: []});
      await c.constructor.getConfigElement();

      // Since ha-elements are not using scopedRegistry we can get a reference to
      // the newly loaded element from the global customElement registry...
      // const haEntityPicker = window.customElements.get("ha-entity-picker");
    }
  }
}
