import {HassService} from './hass-service.type';

export type HassServiceRegistry = {
  domain: string;
  services: Record<string, HassService>;
};
