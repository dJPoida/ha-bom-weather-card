import {css} from 'lit-element';

export const debugStyles = css`
  :host {
    --bwc-debug-element-border: 1px solid red;
    --bwc-debug-container-border: 1px solid orange;

    .bwc-debug {
      display: block;
    }

    & > div,
    & > div > span,
    div.bwc-debug {
      box-sizing: border-box;
      border: var(--bwc-debug-element-border);
    }

    .container {
      box-sizing: border-box;
      border: var(--bwc-debug-container-border);
    }
  }
`;
