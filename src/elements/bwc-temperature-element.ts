import {css, CSSResultGroup, html, LitElement, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {elementStyles} from '../styles/element.style';
import {Localizer} from '../types/localizer.type';

@customElement('bwc-temperature-element')
export class temperatureElement extends LitElement {
  @property({type: Boolean}) public isLarge: boolean = false;
  @property({type: Number}) public value!: number | undefined;
  @property({type: Number}) public feelsLikeTemperature!: number | undefined;
  @property({type: Number}) public decimalPlaces: number = 1;
  @property() public label: string | undefined;

  @property() public localize!: Localizer;

  override render() {
    const classes = {
      'temperature-element': true,
      large: this.isLarge,
    };

    return html`<div class=${classMap(classes)}>
      <span class="number">${this.value !== undefined ? this.value.toFixed(this.decimalPlaces) : '-'}&deg;</span>
      ${this.feelsLikeTemperature !== undefined
        ? html`
            <span class="feels-like"
              >${this.localize('card.feelsLike')}&nbsp;<strong
                >${this.feelsLikeTemperature.toFixed(this.decimalPlaces)}&deg;</strong
              ></span
            >
          `
        : nothing}
      ${this.label !== undefined ? html`<span class="label">${this.label}</span>` : nothing}
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

        &.large {
          .number {
            font-size: var(--bwc-temperature-number-large-font-size);
          }
        }

        .number + .label,
        .number + .feels-like,
        .feels-like + .label {
          margin-top: 0.5em;
        }

        .feels-like,
        .label {
          font-size: var(--bwc-temperature-description-font-size);
          line-height: 1em;
          width: fit-content;
          white-space: nowrap;
        }
      }
    `;
  }
}
