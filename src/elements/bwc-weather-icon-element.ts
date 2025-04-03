import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {A_DAY_MODE, DAY_MODE} from '../constants/day-mode.const';
import {AN_ICON_SIZE, ICON_SIZE} from '../constants/icon-size.const';
import {A_WEATHER_ICON, WEATHER_ICON} from '../constants/weather-icons.const';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-weather-icon-element')
export class WeatherIconElement extends LitElement {
  @property({type: String}) public weatherIcon: A_WEATHER_ICON | undefined;
  @property({type: Boolean}) public useHAWeatherIcons: boolean = false;
  @property({type: String}) public iconSize: AN_ICON_SIZE = ICON_SIZE.REGULAR;
  @property({type: String}) public dayMode: A_DAY_MODE = DAY_MODE.DAY;
  @property({type: Boolean}) public noPadding: boolean = false;

  override render() {
    if (!this.weatherIcon) return nothing;

    const classes = {
      'weather-icon-element': true,
      [this.iconSize]: true,
      [this.weatherIcon]: true,
      'no-padding': this.noPadding,
    };

    return html`<div class=${classMap(classes)}>
      ${this.useHAWeatherIcons
        ? html`<ha-icon icon="mdi:weather-${this.weatherIcon}"></ha-icon>`
        : html`${unsafeHTML(WEATHER_ICON[this.dayMode][this.weatherIcon])}`}
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
          width: var(--bwc-weather-icon-height);
          filter: drop-shadow(0px 0px 2px rgba(200, 200, 200, 0.75));
        }

        &.no-padding {
          padding: 0;
        }

        &.huge {
          --bwc-weather-icon-height: var(--bwc-huge-icon-size);
        }

        &.large {
          --bwc-weather-icon-height: var(--bwc-large-icon-size);
        }

        &.regular {
          --bwc-weather-icon-height: var(--bwc-regular-icon-size);
        }

        &.small {
          --bwc-weather-icon-height: var(--bwc-regular-font-size);
        }
      }
    `;
  }
}
