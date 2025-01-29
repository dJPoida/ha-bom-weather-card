import {css} from 'lit-element';

export const debugStyles = css`
  :host {
    --bwc-debug-element-border: 1px solid red;
    --bwc-debug-container-border: 1px solid orange;

    & > div {
      box-sizing: border-box;
      border: var(--bwc-debug-element-border);
    }

    .container {
      box-sizing: border-box;
      border: var(--bwc-debug-container-border);
    }
  }
`;
