import {css} from 'lit';
import {debugStyles} from './debug.style';

const compileTimeDebugStyles = debugStyles;

export const globalStyles = css`
  :host {
    .bwc-debug {
      display: none;
    }

    .bwc-icon svg {
      height: 1em;
      width: 1em;
      line-height: 1em;
    }
  }

  ${compileTimeDebugStyles}
`;
