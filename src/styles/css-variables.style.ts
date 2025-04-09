import {css} from 'lit';

export const cssVariables = css`
  :host {
    /* Bom Weather Card Custom CSS Variables */
    --bwc-large-font-size: 3.5rem;
    --bwc-medium-font-size: 2rem;
    --bwc-regular-font-size: 1.2rem;

    --bwc-huge-icon-size: 5rem;
    --bwc-large-icon-size: 4.5rem;
    --bwc-regular-icon-size: 3rem;

    --bwc-background-color-day-start: #63b0ff;
    --bwc-background-color-day-end: #c4e1ff;
    --bwc-background-color-night-start: #001d3b;
    --bwc-background-color-night-end: #013565;
    --bwc-background-color-day-cloudy-start: #e8eaeb;
    --bwc-background-color-day-cloudy-end: #e8eaeb;
    --bwc-background-color-day-stormy-start: #90959d;
    --bwc-background-color-day-stormy-end: #acb5bc;
    --bwc-time-date-time-font-size: var(--bwc-large-font-size);
    --bwc-time-date-date-font-size: var(--bwc-regular-font-size);
    --bwc-temperature-number-large-font-size: var(--bwc-large-font-size);
    --bwc-temperature-number-font-size: var(--bwc-medium-font-size);
    --bwc-temperature-description-font-size: var(--bwc-regular-font-size);
    --bwc-value-label-value-font-size: var(--bwc-medium-font-size);
    --bwc-value-label-label-font-size: var(--bwc-regular-font-size);
    --bwc-weather-icon-height: var(--bwc-huge-icon-size);
    --bwc-min-height: 10rem;
    --bwc-global-padding: 16px;
    --bwc-item-container-height: 5rem;
    --bwc-warning-no-warnings-background-color: #f5f5f5;
    --bwc-warning-has-warnings-background-color: #fdb404;
    --bwc-warning-icon-size: var(--bwc-medium-font-size);
    --bwc-warning-font-size: var(--bwc-regular-font-size);
    --bwc-waring-text-color: var(--text-light-primary-color);
    --bwc-section-header-font-size: 1.5rem;
    --bwc-daily-forecast-day-font-size: var(--bwc-regular-font-size);
    --bwc-daily-forecast-temp-font-size: var(--bwc-regular-font-size);
    --bwc-daily-forecast-rain-font-size: var(--bwc-regular-font-size);

    --bwc-text-color: var(--text-primary-color);
    --bwc-text-color-inverted: var(--text-light-primary-color);

    /* Home Assistant Theme Overrides */
    --ha-card-header-color: var(--bwc-text-color);
  }
`;
