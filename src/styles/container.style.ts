import {css} from 'lit-element';

export const containerStyles = css`
  .item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &.reverse {
      flex-wrap: wrap-reverse;
    }

    &.column {
      flex-direction: column;
    }

    &.justify-left {
      justify-content: flex-start;
    }

    .item {
      --bwc-item-justify-content: flex-start;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: var(--bwc-item-justify-content);
      color: var(--bwc-text-color);

      &.left {
        --bwc-item-justify-content: flex-start;
      }

      &.center {
        --bwc-item-justify-content: center;
      }

      &.right {
        --bwc-item-justify-content: flex-end;
      }

      &.no-grow {
        flex-grow: 0;
      }
    }
  }
`;
