import classNames from 'classnames';
import {CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {temperatureElementStyle} from './bwc-temperature-element.style';

@customElement('bwc-temperature-element')
export class temperatureElement extends LitElement {
  @property({attribute: false}) public temperature!: number;

  override render() {
    return html`<div class=${classNames('temperature-element')}>
      <span class="number">${this.temperature}&deg;</span>
      <span class="description">Feels like <strong>18.2&deg;</strong></span>
    </div>`;
  }

  static override styles: CSSResultGroup = [temperatureElementStyle];
}
