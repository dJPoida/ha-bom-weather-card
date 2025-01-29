import {css} from 'lit';
import {elementStyle} from '../../global.style';

export const timeElementStyle = css`
  ${elementStyle}

  .time-element {
    padding: var(--bwc-global-padding);
    font-size: var(--bwc-time-number-font-size);
    flex: 1;
    line-height: 1em;
  }
`;
