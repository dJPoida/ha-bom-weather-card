import {HomeAssistant} from 'custom-card-helpers';
import log from 'loglevel';
import {HassEntityRegistryEntry} from '../types/hass-entity-registry.type';

type FetchEntitiesParams = {
  domain?: string;
  device_id?: string;
  area_id?: string;
};

/**
 * Fetch entities from the Home Assistant entity registry
 * @param hass
 * @param params
 * @returns
 */
export async function fetchEntities(
  hass: HomeAssistant,
  params?: FetchEntitiesParams
): Promise<HassEntityRegistryEntry[]> {
  try {
    const registeredEntities: HassEntityRegistryEntry[] = await hass.callWS({
      type: 'config/entity_registry/list',
      domain: params?.domain,
      area_id: params?.area_id,
    });

    if (params?.device_id) {
      return registeredEntities.filter((entity: HassEntityRegistryEntry) => entity.device_id === params.device_id);
    }

    return registeredEntities;
  } catch (error) {
    log.error('[fetchEntities()] Error fetching entities', error);
    return [];
  }
}
