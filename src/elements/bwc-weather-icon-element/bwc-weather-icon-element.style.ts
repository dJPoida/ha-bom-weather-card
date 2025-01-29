import {css} from 'lit';
import {elementStyle} from '../../global.style';

export const weatherIconElementStyle = css`
  ${elementStyle}

  .weather-icon-element {
    /* Override the HA Icon height */
    --mdc-icon-size: var(--bwc-weather-icon-height);

    flex: 1;
    display: flex;
    justify-content: var(--bwc-item-justify-content);
    align-items: center;
    padding: 0 var(--bwc-global-padding);
    font-size: var(--bwc-weather-icon-height);

    svg {
      height: var(--bwc-weather-icon-height);
    }
  }
`;
