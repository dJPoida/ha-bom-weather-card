import {css} from 'lit';
import {style} from '../../style';

export const bomWeatherCardStyle = css`
  ${style}

  ha-card {
    color: var(--bwc-text-color);
    background: linear-gradient(
      to bottom,
      var(--bwc-background-color-start),
      var(--bwc-background-color-end)
    );
    min-height: var(--bwc-min-height);
  }

  h1.card-header {
    padding-bottom: 0;
  }
`;
