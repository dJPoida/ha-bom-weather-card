import {HomeAssistant} from 'custom-card-helpers';
import log from 'loglevel';
import {HassDeviceRegistryEntry} from '../types/hass-device-registry-entry.type';

/**
 * Fetch devices from the Home Assistant device registry
 * @param hass
 * @returns
 */
export async function fetchDevices(hass: HomeAssistant): Promise<HassDeviceRegistryEntry[]> {
  try {
    return await hass.callWS({type: 'config/device_registry/list'});
  } catch (error) {
    log.error('[fetchDevices()] Error fetching devices', error);
    return [];
  }
}
