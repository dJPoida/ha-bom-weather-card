import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CardConfig } from "./types/card-config.type";
import { CUSTOM_CARD_ID } from "./constants/custom-card-id.const";
import { HomeAssistant } from "custom-card-helpers";

@customElement('bom-weather-card')
export class BomWeatherCard extends LitElement {
  @state() _title = "";
  private _element_id = "";
  @state() _element_value = "";

  private _hass: HomeAssistant | undefined;

  setConfig(config: CardConfig) {
    this._title = config.title;
    this._element_id = config.element_id;
    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._element_id)
      this._element_value = this._element_id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? (this._hass as any).formatEntityState(hass.states[this._element_id])
        : "N/A";
  }

  override render() {
    return html`<ha-card .header=${this._title}>
      <div class="card-content">
        <h3>BOM Calendar Card</h3>
        <span>${this._element_value}</span>
      </div></ha-card
    > `;
  }

  // card configuration
  static getConfigElement() {
    return document.createElement(CUSTOM_CARD_ID + "-editor");
  }
}
