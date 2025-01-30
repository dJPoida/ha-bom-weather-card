import {css} from 'lit';
import {debugStyles} from './debug.style';

export const globalStyles = css`
  :host {
    .bwc-debug {
      display: none;
    }
  }

  /* Comment or uncomment this line to toggle debug styles */
  ${debugStyles}
`;
