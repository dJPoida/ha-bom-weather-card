import {HomeAssistant} from 'custom-card-helpers';
import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {getCardEntityValueAsString} from '../helpers/get-card-entity-value-as-string';
import {elementStyles} from '../styles/element.style';
import {CardEntity} from '../types/card-entities.type';

@customElement('bwc-time-date-element')
export class TimeElement extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;
  @property({type: Boolean}) public showDate: boolean = false;

  @property({type: Object}) public cardTimeEntity!: CardEntity;
  @property({type: Object}) public cardDateEntity!: CardEntity;

  private _interval: number | undefined;

  @state() _currentTime: string | undefined;
  @state() _currentDate: string | undefined;

  _update() {
    if (this.hass) {
      this._currentTime = getCardEntityValueAsString(this.hass, this.cardTimeEntity);
      this._currentDate = getCardEntityValueAsString(this.hass, this.cardDateEntity);
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
    const showDate = this.showDate && this._currentDate;

    return html`<div class="time-date-element">
      <span class="time">${this._currentTime}</span>
      ${showDate ? html`<span class="date">${this._currentDate}</span>` : nothing}
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
          font-weight: 500;
          width: fit-content;
        }

        .time + .date {
          margin-top: 0.5em;
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
