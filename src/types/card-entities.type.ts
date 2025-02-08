import {A_CARD_ENTITY} from '../constants/config-prop-entities.const';
import {A_WEATHER_ENTITY_ATTRIBUTE} from '../constants/weather-entity-attributes.const';

export type CardEntity = {
  entity_id: string | undefined;
  attribute: A_WEATHER_ENTITY_ATTRIBUTE | undefined;
  is_inferred: boolean;
};

/**
 * This type exists to store the final entities that are calculated so that the user
 * doesn't have to explicitly configure every entity.
 *
 * When `is_inferred` is true, the entity_id is inferred from the device name or from an attribute of a parent entity.
 */
export type CardEntities = Record<A_CARD_ENTITY, CardEntity>;
