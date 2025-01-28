import {css} from 'lit';
import {cssVariables, debugStyle} from '../../global.style';

export const bomWeatherCardStyle = css`
  ${cssVariables}

  ha-card {
    color: var(--bwc-text-color);

    /* TODO: make this configurable */
    background: linear-gradient(
      to bottom,
      var(--bwc-background-color-start),
      var(--bwc-background-color-end)
    );
    min-height: var(--bwc-min-height);

    /* TODO: make this configurable */
    border: none;
  }

  h1.card-header {
    padding-bottom: 0;
  }

  ${debugStyle}
`;
