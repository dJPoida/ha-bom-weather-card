import {HomeAssistant} from 'custom-card-helpers';
import {CardEntity} from '../types/card-entities.type';
import {getCardEntityValue} from './get-card-entity-value.helper';

/**
 * Get the numeric value of a card entity
 * CardEntity.attribute will be used if set, otherwise the state will be used
 *
 * @param hass the Home Assistant instance
 * @param cardEntity the entity to get the value of
 *
 * @returns
 */
export const getCardEntityValueAsNumber = (
  hass: HomeAssistant,
  cardEntity: CardEntity
): number | undefined => {
  const value = getCardEntityValue(hass, cardEntity);

  if (value === undefined) {
    return undefined;
  }

  // If the value is already a number, return it
  if (typeof value === 'number') {
    return value;
  }

  // If the value is a string, attempt to parse it as a float
  // Don't throw an error if it fails, just return undefined
  if (typeof value === 'string') {
    try {
      return parseFloat(value);
    } catch {
      return undefined;
    }
  }

  return undefined;
};
