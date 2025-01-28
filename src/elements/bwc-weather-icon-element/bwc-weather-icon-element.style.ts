import {css} from 'lit';
import {elementStyle} from '../../global.style';

export const weatherIconElementStyle = css`
  ${elementStyle}

  .weather-icon-element {
    /* Override the HA Icon height */
    --mdc-icon-size: var(--bwc-weather-icon-height);

    padding: var(--bwc-global-padding);
    font-size: var(--bwc-weather-icon-height);
    height: calc(var(--bwc-weather-icon-height)+var(--bwc-global-padding));

    svg {
      height: var(--bwc-weather-icon-height);
    }
  }
`;
