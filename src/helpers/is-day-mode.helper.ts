import {HomeAssistant} from 'custom-card-helpers';

export const isDayMode = (hass: HomeAssistant): boolean => {
  return hass?.states['sun.sun']
    ? hass.states['sun.sun'].state === 'above_horizon'
    : true;
};
