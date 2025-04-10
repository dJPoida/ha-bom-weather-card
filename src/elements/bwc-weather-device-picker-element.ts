import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import log from 'loglevel';
import {fetchWeatherDevices} from '../helpers/fetch-weather-devices.helper';
import {elementStyles} from '../styles/element.style';
import {HassDeviceRegistryEntry} from '../types/hass-device-registry-entry.type';
import {ValueChangedEvent} from '../types/value-changed-event.type';

@customElement('bwc-weather-device-picker-element')
export class WeatherDevicePickerElement extends LitElement {
  @property({attribute: false}) hass!: HomeAssistant;
  @property({type: String}) label: string = 'Select a Weather Device';
  @property({type: String, reflect: true}) value: string | undefined = '';
  @property({type: String, reflect: true}) boobs: string | undefined = '';
  private _initialized = false;

  @state() weatherDevices: HassDeviceRegistryEntry[] = [];

  override firstUpdated() {
    this._fetchWeatherDevices();
    this._initialized = true;
  }

  // Override the updated method
  protected override updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('hass')) {
      this._fetchWeatherDevices();
    }
  }

  private _handleOpenedChanged(event: CustomEvent) {
    // Fetch items only when the dropdown is opened
    if (event.detail.value) {
      this._fetchWeatherDevices();
    }
  }

  async _fetchWeatherDevices(): Promise<void> {
    if (!this.hass) return;

    try {
      this.weatherDevices = await fetchWeatherDevices(this.hass);
    } catch (e) {
      log.error('[WeatherDevicePickerElement] Error fetching weather-related devices', e);
    }
  }

  _handleValueChanged(event: ValueChangedEvent<string | undefined>) {
    if (!this._initialized) return;

    this.value = event.detail.value;

    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <ha-combo-box
        class="weather-device-picker-element"
        label=${this.label}
        .items=${this.weatherDevices.map((device) => ({
          value: device.id, // Store device ID as value
          label: device.name, // Display name
        }))}
        .value=${this.value ?? ''}
        @value-changed=${this._handleValueChanged}
        @opened-changed=${this._handleOpenedChanged}
        allowCustomValue="true"
      >
      </ha-combo-box>
    `;
  }

  _clearSelection() {
    this.value = '';
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {value: ''},
        bubbles: true,
        composed: true,
      })
    );
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}
    `;
  }
}
