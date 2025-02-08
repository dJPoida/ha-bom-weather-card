import {css} from 'lit';

export const cssVariables = css`
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-large-font-size: 4rem;
    --bwc-medium-font-size: 2rem;
    --bwc-regular-font-size: 1.2rem;

    --bwc-background-color-day-start: #63b0ff;
    --bwc-background-color-day-end: #c4e1ff;
    --bwc-background-color-night-start: #001d3b;
    --bwc-background-color-night-end: #013565;
    --bwc-time-date-time-font-size: var(--bwc-large-font-size);
    --bwc-time-date-date-font-size: var(--bwc-regular-font-size);
    --bwc-temperature-number-large-font-size: var(--bwc-large-font-size);
    --bwc-temperature-number-font-size: var(--bwc-medium-font-size);
    --bwc-temperature-description-font-size: var(--bwc-regular-font-size);
    --bwc-value-label-value-font-size: var(--bwc-medium-font-size);
    --bwc-value-label-label-font-size: var(--bwc-regular-font-size);
    --bwc-weather-icon-height: 7rem;
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;
    --bwc-warning-no-warnings-background-color: #f5f5f5;
    --bwc-warning-has-warnings-background-color: #fdb404;
    --bwc-warning-icon-size: var(--bwc-medium-font-size);
    --bwc-warning-font-size: var(--bwc-regular-font-size);

    /* Conditional Colors based on Day/Night and Dark/Light Theme */
    /* Light Theme / Day Mode */
    --bwc-text-color: var(--text-light-primary-color);
    --bwc-background-color-start: var(--bwc-background-color-day-start);
    --bwc-background-color-end: var(--bwc-background-color-day-end);

    /* Light Theme / Night Mode */
    &.night {
      --bwc-text-color: var(--text-primary-color);
      --bwc-background-color-start: var(--bwc-background-color-night-start);
      --bwc-background-color-end: var(--bwc-background-color-night-end);
    }

    /* Dark Theme / Day Mode */
    &.dark-mode {
      color: var(--text-light-primary-color);

      /* Dark Theme / Night Mode */
      &.night {
        color: var(--text-primary-color);
      }
    }

    /* Home Assistant Theme Overrides */
    --ha-card-header-color: var(--bwc-text-color);
  }
`;
