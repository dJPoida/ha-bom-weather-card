import {HomeAssistant} from 'custom-card-helpers';
import {CardEntity} from '../types/card-entities.type';
import {getCardEntityValue} from './get-card-entity-value.helper';

/**
 * Get the string value of a card entity
 * CardEntity.attribute will be used if set, otherwise the state will be used
 *
 * @param hass the Home Assistant instance
 * @param cardEntity the entity to get the value of
 *
 * @returns
 */
export const getCardEntityValueAsString = (
  hass: HomeAssistant,
  cardEntity: CardEntity
): string | undefined => {
  const value = getCardEntityValue(hass, cardEntity);

  if (value === undefined) {
    return undefined;
  }

  // If the value is already a string, return it
  if (typeof value === 'string') {
    return value;
  }

  // If the value is a number, convert it to a string
  if (typeof value === 'number') {
    return value.toString();
  }

  return undefined;
};
