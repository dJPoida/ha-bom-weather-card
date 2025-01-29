import {version} from '../package.json';
import './elements/bom-weather-card';
import './elements/bwc-temperature-element';
import './elements/bwc-time-element';
import './elements/bwc-weather-icon-element';

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
  type: 'bom-weather-card',
  name: localizer('common.title'),
  description: localizer('common.description'),
  documentationURL: 'https://github.com/dJPoida/ha-bom-weather-card',
  preview: true,
});
