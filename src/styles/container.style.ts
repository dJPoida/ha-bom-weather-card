import {css} from 'lit-element';

export const containerStyles = css`
  .item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .item {
      --bwc-item-justify-content: flex-start;
      flex: 1;
      display: flex;
      justify-content: var(--bwc-item-justify-content);

      &.left {
        --bwc-item-justify-content: flex-start;
      }

      &.center {
        --bwc-item-justify-content: center;
      }

      &.right {
        --bwc-item-justify-content: flex-end;
      }
    }
  }
`;
