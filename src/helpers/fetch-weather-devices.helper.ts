import {HomeAssistant} from 'custom-card-helpers';
import log from 'loglevel';
import {weatherEntityStrings} from '../constants/weather-entity-strings.const';
import {HassDeviceRegistryEntry} from '../types/hass-device-registry-entry.type';
import {HassEntityRegistryEntry} from '../types/hass-entity-registry.type';
import {fetchDevices} from './fetch-devices.helper';
import {fetchEntities} from './fetch-entities.helper';

export async function fetchWeatherDevices(hass: HomeAssistant): Promise<HassDeviceRegistryEntry[]> {
  let devices: HassDeviceRegistryEntry[] = [];
  let entities: HassEntityRegistryEntry[] = [];
  const weatherDeviceIds = new Set<string>();

  try {
    // Fetch all devices
    devices = await fetchDevices(hass);

    // Fetch all entities
    entities = await fetchEntities(hass);

    // Filter weather-related entities
    const weatherEntities = entities.filter(
      (e) =>
        e.device_id &&
        e.device_id.length > 0 && // Ensure it's tied to a device
        weatherEntityStrings.some((str) => e.entity_id.includes(str))
    );

    // Collect device IDs that have weather-related entities
    weatherEntities.forEach((e) => {
      if (e.device_id) weatherDeviceIds.add(e.device_id);
    });

    // Filter only devices that have at least one weather-related entity
    return devices.filter((d) => weatherDeviceIds.has(d.id));
  } catch (error) {
    log.error('[fetchWeatherDevices()] Error fetching weather-related devices', error);
    throw error;
  }
}
