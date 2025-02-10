import classNames from 'classnames';
import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {customElement, property} from 'lit/decorators.js';
import {WEATHER_ICON} from '../constants/weather-icons.const';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-weather-icon-element')
export class WeatherIconElement extends LitElement {
  @property({type: String}) public weatherIcon: string | undefined;
  @property({type: Boolean}) public useHAWeatherIcons: boolean = false;

  override render() {
    if (!this.weatherIcon) return nothing;

    return html`<div class=${classNames('weather-icon-element')}>
      ${this.useHAWeatherIcons
        ? html`<ha-icon icon="mdi:weather-${this.weatherIcon}"></ha-icon>`
        : html`${unsafeHTML(WEATHER_ICON[this.weatherIcon])}`}
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
