declare global {
  interface Window {
    customCards: Array<object>;
  }
}

import {BomWeatherCard} from './card';
import {CUSTOM_CARD_ID} from './constants/custom-card-id.const';
import {BomWeatherCardEditor} from './editor';
// customElements.define(CUSTOM_CARD_ID, BomWeatherCard);
customElements.define(CUSTOM_CARD_ID + '-editor', BomWeatherCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CUSTOM_CARD_ID,
  name: 'BOM Weather Card',
  description:
    'A Home Assistant card designed to display weather information in the style of the BOM (Bureau of Meteorology) Australia app',
  prototype: BomWeatherCard,
});
