import classNames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {timeElementStyle} from './bwc-time-element.style';

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

  static override styles: CSSResultGroup = [timeElementStyle];
}
