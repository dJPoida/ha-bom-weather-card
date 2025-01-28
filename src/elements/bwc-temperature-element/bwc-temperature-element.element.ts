import classNames from 'classnames';
import {CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {temperatureElementStyle} from './bwc-temperature-element.style';

@customElement('bwc-temperature-element')
export class temperatureElement extends LitElement {
  @property({attribute: false}) public temperature!: number;

  override render() {
    return html`<div class=${classNames('temperature-element')}>
      ${this.temperature}&deg;
    </div>`;
  }

  static override styles: CSSResultGroup = [temperatureElementStyle];
}
