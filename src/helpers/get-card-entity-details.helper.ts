import {CardEntity} from '../types/card-entities.type';

export type CardEntityDetails = {
  entityId: string | undefined;
  isInferred: boolean;
  attribute: string | undefined;
  displayName: string;
};

/**
 * This helper function is used to simplify the retrieval of card entity details
 * for rendering fields, values and classes.
 *
 * @param cardEntity
 * @returns
 */
export const getCardEntityDetails = (
  cardEntity: CardEntity
): CardEntityDetails => ({
  entityId: cardEntity?.entity_id,
  attribute: cardEntity?.is_inferred ? cardEntity?.attribute : undefined,
  displayName: cardEntity?.is_inferred
    ? `💡${cardEntity?.entity_id ?? ''}${
        cardEntity?.attribute ? `[${cardEntity?.attribute}]` : ''
      }`
    : '',
  isInferred: cardEntity?.is_inferred ?? false,
});
