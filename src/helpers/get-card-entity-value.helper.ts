import {HomeAssistant} from 'custom-card-helpers';
import {CardEntity} from '../types/card-entities.type';

/**
 * Get the value of a card entity
 * CardEntity.attribute will be used if set, otherwise the state will be used
 *
 * @param hass the Home Assistant instance
 * @param cardEntity the entity to get the value of
 *
 * @returns
 */
export const getCardEntityValue = (
  hass: HomeAssistant,
  cardEntity: CardEntity
): string | number | undefined => {
  if (!hass || !cardEntity?.entity_id) {
    return undefined;
  }

  const stateObj = hass.states[cardEntity.entity_id];

  if (!stateObj) {
    return undefined;
  }

  if (!cardEntity.attribute) {
    return stateObj.state;
  }

  return stateObj.attributes[cardEntity.attribute];
};
