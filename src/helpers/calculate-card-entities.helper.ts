import {HomeAssistant} from 'custom-card-helpers';
import {A_CARD_ENTITY, CARD_ENTITIES} from '../constants/config-prop-entities.const';
import {INFERRED_ENTITY_RULES} from '../constants/inferred-entity-rules.const';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';
import {HassDeviceRegistryEntry} from '../types/hass-device-registry-entry.type';
import {fetchDevices} from './fetch-devices.helper';
import {fetchEntities} from './fetch-entities.helper';

/**
 * Calculate the actual entities to use in the card based on the configured
 * weather devices and entities.
 *
 * @param props
 * @returns
 */
export const calculateCardEntities = async (hass: HomeAssistant, config: CardConfig): Promise<CardEntities> => {
  // Start by iterating over all keys in the CARD_ENTITIES
  // Any entities that are not set in the config will be set here
  // User's specific config takes precedence
  const cardEntities: CardEntities = {} as CardEntities;
  for (const key of CARD_ENTITIES) {
    cardEntities[key] = {
      entity_id: config[key],
      attribute: undefined,
      is_inferred: false,
    };
  }

  // If hass is not available, return the card entities as they are
  if (!hass) return cardEntities;

  // fetch all devices and entities from the hass instance
  const devices = await fetchDevices(hass);
  const entities = await fetchEntities(hass);

  // Load the details of the observation device from Home Assistant
  // const weatherDevice: HassDeviceRegistryEntry | undefined = devices.find(
  //   (device) => device.id === config[CONFIG_PROP.WEATHER_DEVICE_ID]
  // );

  let loopEscape = 100;
  let entitiesChanged = true;
  while (entitiesChanged && loopEscape > 0) {
    entitiesChanged = false;
    loopEscape--;

    // Iterate through each of the cardEntities which don't have an entity_id set
    for (const key of CARD_ENTITIES) {
      if (!cardEntities[key].entity_id) {
        const rule = INFERRED_ENTITY_RULES[key as A_CARD_ENTITY];

        if (rule?.explicitId) {
          entitiesChanged = true;
          cardEntities[key] = {
            entity_id: rule.explicitId.entityId,
            attribute: undefined,
            is_inferred: true,
          };
        } else if (rule?.idPattern) {
          let inferredEntityId = rule.idPattern.pattern;

          const parentDeviceConfigProp = rule.idPattern.parentDeviceConfigProp;
          let parentDevice: HassDeviceRegistryEntry | undefined;
          if (parentDeviceConfigProp) {
            parentDevice = devices.find((device) => device.id === config[parentDeviceConfigProp]);

            if (parentDevice && parentDevice.name) {
              const deviceNamePrefix = parentDevice.name.toLowerCase().replace(' ', '_');
              inferredEntityId = inferredEntityId.replace('%device_name%', deviceNamePrefix);
            }
          }

          // Find the entity which matches the inferredEntityId
          const entity = entities.find((entity) => entity.entity_id === inferredEntityId);

          if (entity) {
            entitiesChanged = true;
            cardEntities[key] = {
              entity_id: inferredEntityId,
              attribute: undefined,
              is_inferred: true,
            };
          }
        }

        // Use another entities attribute instead of an entity itself
        else if (rule?.attributePattern) {
          const parentCardEntity = cardEntities[rule.attributePattern.parentCardEntity];

          if (parentCardEntity?.entity_id) {
            entitiesChanged = true;
            cardEntities[key] = {
              entity_id: parentCardEntity.entity_id,
              attribute: rule.attributePattern.attribute,
              is_inferred: true,
            };
          }
        }
      }
    }
  }

  return cardEntities;
};
