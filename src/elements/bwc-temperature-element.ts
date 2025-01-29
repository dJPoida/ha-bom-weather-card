import classNames from 'classnames';
import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-temperature-element')
export class temperatureElement extends LitElement {
  @property({attribute: false}) public temperature!: number;

  override render() {
    return html`<div class=${classNames('temperature-element')}>
      <span class="number">${this.temperature}&deg;</span>
      <span class="description">Feels like <strong>18.2&deg;</strong></span>
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

        span.number {
          font-size: var(--bwc-temperature-number-font-size);
          line-height: 1em;
          margin-bottom: 0.25em;
          font-weight: 500;
        }

        span.description {
          font-size: var(--bwc-temperature-description-font-size);
          line-height: 1em;
        }
      }
    `;
  }
}
