import {css} from 'lit';
import {elementStyle} from '../../global.style';

export const temperatureElementStyle = css`
  ${elementStyle}

  .temperature-element {
    padding: var(--bwc-global-padding);
    flex: 1;
    display: flex;
    flex-direction: column;

    span.number {
      font-size: var(--bwc-temperature-number-font-size);
      line-height: 1em;
      margin-bottom: 0.25em;
      font-weight: 500;
    }

    span.description {
      font-size: var(--bwc-temperature-description-font-size);
      line-height: 1em;
    }
  }
`;
