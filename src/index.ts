import log from 'loglevel';
import {version} from '../package.json';
import './elements/bom-weather-card';
import './elements/bwc-temperature-element';
import './elements/bwc-time-date-element';
import './elements/bwc-value-label-element';
import './elements/bwc-weather-device-picker-element';
import './elements/bwc-weather-icon-element';
import {getLocalizer} from './localize/localize';

const localizer = getLocalizer();

// This line gets overwritten by the build process depending on the build environment
log.setLevel('info');
// Add the log to the window object to enable logLevel changes in the console
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).bomWeatherCardLog = log;

console.info(
  `%c  BOM-WEATHER-CARD \n%c  ${localizer('common.version')} ${version}    `,
  'color: fuchsia; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

// Add the card to the Home Assistant customCards array
declare global {
  interface Window {
    customCards: Array<object>;
  }
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bom-weather-card',
  name: localizer('common.title'),
  description: localizer('common.description'),
  documentationURL: 'https://github.com/dJPoida/ha-bom-weather-card',
  preview: true,
});
