import {css} from 'lit';

export const cssVariables = css`
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-background-color-day-start: #63b0ff;
    --bwc-background-color-day-end: #c4e1ff;
    --bwc-background-color-night-start: #001d3b;
    --bwc-background-color-night-end: #013565;
    --bwc-time-date-time-font-size: 3.5rem;
    --bwc-time-date-date-font-size: 1rem;
    --bwc-temperature-number-font-size: 3.5rem;
    --bwc-temperature-description-font-size: 1rem;
    --bwc-weather-icon-height: 7rem;
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;

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
