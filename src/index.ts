import {version} from '../package.json';
import './cards/bom-weather-card-editor/bom-weather-card-editor.element';
import './elements/bwc-temperature-element/bwc-temperature-element.element';
import './elements/bwc-time-element/bwc-time-element.element';
import './elements/bwc-weather-icon-element/bwc-weather-icon-element.element';

import {BomWeatherCard} from './cards/bom-weather-card/bom-weather-card.element';
import {CUSTOM_CARD_ID} from './constants/custom-card-id.const';
import {getLocalizer} from './localize/localize';

declare global {
  interface Window {
    customCards: Array<object>;
  }
}

const localizer = getLocalizer();

console.info(
  `%c  BOM-WEATHER-CARD \n%c  ${localizer('common.version')} ${version}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CUSTOM_CARD_ID,
  name: localizer('common.title'),
  description: localizer('common.description'),
  prototype: BomWeatherCard,
  preview: true,
});
