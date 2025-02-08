import {CardEntity} from '../types/card-entities.type';

export type CardEntityDetails = {
  entityId: string | undefined;
  isInferred: boolean;
  attribute: string | undefined;
  displayName: string;
};

export const getCardEntityDetails = (
  cardEntity: CardEntity
): CardEntityDetails => ({
  entityId: cardEntity?.entity_id,
  attribute: cardEntity?.is_inferred ? cardEntity?.attribute : undefined,
  displayName: cardEntity?.is_inferred
    ? `${cardEntity?.entity_id ?? ''}${
        cardEntity?.attribute ? `[${cardEntity?.attribute}]` : ''
      }`
    : '',
  isInferred: cardEntity?.is_inferred ?? false,
});
