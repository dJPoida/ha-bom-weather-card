import {css} from 'lit';
import {elementStyle} from '../../global.style';

export const temperatureElementStyle = css`
  ${elementStyle}

  .temperature-element {
    padding: var(--bwc-global-padding);
    font-size: var(--bwc-time-font-size);
    line-height: 1em;
  }
`;
