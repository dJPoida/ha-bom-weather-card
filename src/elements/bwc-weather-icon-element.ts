import classNames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement} from 'lit';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {customElement, property} from 'lit/decorators.js';
import {elementStyles} from '../styles/element.style';
import {WEATHER_ICON} from '../weather-icons/weather-icons';

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
        : html`${unsafeHTML(WEATHER_ICON[weatherIconIndex])}`)}
    </div>`;
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}

      .weather-icon-element {
        /* Override the HA Icon height */
        --mdc-icon-size: var(--bwc-weather-icon-height);

        flex: 1;
        display: flex;
        justify-content: var(--bwc-item-justify-content);
        align-items: flex-start;
        padding: 0 var(--bwc-global-padding);
        font-size: var(--bwc-weather-icon-height);

        svg {
          height: var(--bwc-weather-icon-height);
        }
      }
    `;
  }
}
