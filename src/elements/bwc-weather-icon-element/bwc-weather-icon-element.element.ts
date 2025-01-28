import classNames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {CSSResultGroup, LitElement, html} from 'lit';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {customElement, property} from 'lit/decorators.js';
import {WEATHER_ICON} from '../../weather-icons/weather-icons';
import {weatherIconElementStyle} from './bwc-weather-icon-element.style';

@customElement('bwc-weather-icon-element')
export class WeatherIconElement extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  @property() public weatherEntityId: string | undefined;
  @property({type: Boolean}) public useHAWeatherIcons: boolean = false;

  override render() {
    const weatherIconIndex = this.weatherEntityId
      ? this.hass.states[this.weatherEntityId].state
      : undefined;

    return html`<div class=${classNames('weather-icon-element')}>
      ${weatherIconIndex &&
      (this.useHAWeatherIcons
        ? html`<ha-icon icon="mdi:weather-${weatherIconIndex}"></ha-icon>`
        : html`<div class="icon-container">
            ${unsafeHTML(WEATHER_ICON[weatherIconIndex])}
          </div>`)}
    </div>`;
  }

  static override styles: CSSResultGroup = weatherIconElementStyle;
}
