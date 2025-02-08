import classNames from 'classnames';
import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {elementStyles} from '../styles/element.style';
import {Localizer} from '../types/localizer.type';

@customElement('bwc-temperature-element')
export class temperatureElement extends LitElement {
  @property({attribute: false}) public temperature!: number | undefined;
  @property({attribute: false}) public feelsLikeTemperature!:
    | number
    | undefined;
  @property() public weatherEntityId: string | undefined;

  @property() public localize!: Localizer;

  override render() {
    return html`<div class=${classNames('temperature-element')}>
      <span class="number">${this.temperature ?? '-'}&deg;</span>
      ${this.feelsLikeTemperature !== undefined
        ? html`
            <span class="description"
              >${this.localize('card.feelsLike')}&nbsp;<strong
                >${this.feelsLikeTemperature}&deg;</strong
              ></span
            >
          `
        : nothing}
    </div>`;
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}

      .temperature-element {
        padding: var(--bwc-global-padding);
        flex: 1;
        display: flex;
        flex-direction: column;

        .number {
          font-size: var(--bwc-temperature-number-font-size);
          line-height: 1em;
          font-weight: 500;
          width: fit-content;
        }

        .number + .description {
          margin-top: 0.5em;
        }

        .description {
          font-size: var(--bwc-temperature-description-font-size);
          line-height: 1em;
          width: fit-content;
        }
      }
    `;
  }
}
