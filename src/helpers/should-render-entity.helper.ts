import {A_CARD_ENTITY} from '../constants/config-prop-entities.const';
import {A_CONFIG_PROP} from '../constants/config-prop.const';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';

export const shouldRenderEntity = (
  config: CardConfig,
  cardEntities: CardEntities,
  toggleConfigProp: A_CONFIG_PROP,
  entityConfigProp: A_CARD_ENTITY
): boolean => {
  if (!config[toggleConfigProp]) {
    return false;
  }

  if (!cardEntities[entityConfigProp]?.entity_id) {
    return false;
  }

  return true;
};
