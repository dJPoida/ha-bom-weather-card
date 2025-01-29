import classNames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-time-element')
export class TimeElement extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;

  private _interval: number | undefined;

  @state() _currentTime: string = '';

  _updateTime() {
    if (this.hass) {
      this._currentTime = this.hass.states['sensor.time'].state;
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this._interval = window.setInterval(() => {
      this._updateTime();
    }, 1000);

    this._updateTime();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  override render() {
    return html`<div class=${classNames('time-element')}>
      ${this._currentTime}
    </div>`;
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}

      .time-element {
        padding: var(--bwc-global-padding);
        font-size: var(--bwc-time-number-font-size);
        flex: 1;
        line-height: 1em;
      }
    `;
  }
}
