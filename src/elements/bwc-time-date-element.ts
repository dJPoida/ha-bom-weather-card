import classNames from 'classnames';
import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-time-date-element')
export class TimeElement extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;
  @property({type: Boolean}) public showDate: boolean = false;

  private _interval: number | undefined;

  @state() _currentTime: string = '';
  @state() _currentDate: string = '';

  _update() {
    if (this.hass) {
      this._currentTime = this.hass.states['sensor.time'].state;
      this._currentDate = this.hass.states['sensor.date'].state;
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this._interval = window.setInterval(() => {
      this._update();
    }, 1000);

    this._update();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  override render() {
    return html`<div class=${classNames('time-date-element')}>
      <span class="time">${this._currentTime}</span>
      ${this.showDate
        ? html`<span class="date">${this._currentDate}</span>`
        : nothing}
    </div>`;
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}

      .time-date-element {
        padding: var(--bwc-global-padding);
        flex: 1;
        display: flex;
        align-items: var(--bwc-item-justify-content);
        flex-direction: column;

        .time {
          font-size: var(--bwc-time-date-time-font-size);
          line-height: 1em;
          margin-bottom: 0.25em;
          font-weight: 500;
          width: fit-content;
        }

        .date {
          font-size: var(--bwc-time-date-date-font-size);
          line-height: 1em;
          word-wrap: break-word;
          width: fit-content;
        }
      }
    `;
  }
}
