import {css, CSSResultGroup, html, LitElement} from 'lit';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ICON} from '../img/icons/icons';
import {elementStyles} from '../styles/element.style';

@customElement('bwc-warnings-icon-element')
export class WarningsIconElement extends LitElement {
  @property({type: Number}) public value: number | undefined;

  override render() {
    const classes = {
      'warnings-icon-element': true,
      'has-warnings': !!(this.value && this.value > 0),
    };
    return html`<div class=${classMap(classes)}>
      <div class="icon-value-wrapper">
        <div class="bwc-icon">${html`${unsafeHTML(ICON.WARNING)}`}</div>
        <div class="value-wrapper">
          <span class="value">${this.value}</span>
        </div>
      </div>
    </div>`;
  }

  static override get styles(): CSSResultGroup {
    return css`
      ${elementStyles}

      .warnings-icon-element {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: var(--bwc-global-padding);

        .icon-value-wrapper {
          background-color: var(--bwc-warning-no-warnings-background-color);
          display: flex;

          .bwc-icon {
            padding: 0.5em;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              height: var(--bwc-warning-icon-size);
              width: var(--bwc-warning-icon-size);

              path {
                fill: var(--bwc-waring-text-color);
              }
            }
          }

          .value-wrapper {
            padding: 0.5em;
            font-size: var(--bwc-warning-font-size);
            color: var(--bwc-waring-text-color);
            display: flex;
            align-items: center;
          }
        }

        &.has-warnings {
          .icon-value-wrapper {
            background-color: var(--bwc-warning-has-warnings-background-color);
          }
        }
      }
    `;
  }
}
