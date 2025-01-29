import {css} from 'lit-element';
import {debugStyles} from './debug.style';

export const elementStyles = css`
  :host {
    display: block;
  }

  /* Comment or uncomment this line to toggle debug styles */
  ${debugStyles}
`;
