import classNames from 'classnames';
import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-value-label-element')
export class ValueLabelElement extends LitElement {
  @property() public value: string | undefined;
  @property() public label: string | undefined;

  override render() {
    return html`<div class=${classNames('value-label-element')}>
      ${this.value && html`<span class="value">${this.value}</span>`}
      ${this.label && html`<span class="label">${this.label}</span>`}
    </div>`;
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}

      :host {
        .value-label-element {
          padding: var(--bwc-global-padding);
          padding-top: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .value {
          font-size: var(--bwc-value-label-value-font-size);
          line-height: 1em;
          font-weight: 500;
          width: fit-content;
        }

        .value + .label {
          margin-top: 0.5em;
        }

        .label {
          font-size: var(--bwc-value-label-label-font-size);
          line-height: 1em;
          width: fit-content;
          white-space: nowrap;
        }
      }
    `;
  }
}
