import {A_CARD_ENTITY} from '../constants/config-prop-entities.const';
import {A_CONFIG_PROP} from '../constants/config-prop.const';
import {CardConfig} from '../types/card-config.type';
import {CardEntities} from '../types/card-entities.type';

/**
 * This helper function is used to determine if an entity should be rendered based
 * on the config and cardEntities
 *
 * @param config  The card config object
 * @param cardEntities  The card entities object
 * @param toggleConfigProp  The config prop or props that should be checked to determine if the entity should be rendered
 * @param entityConfigProp  The entity config prop that should be checked to determine if the entity should be rendered
 * @returns
 */
export const shouldRenderEntity = (
  config: CardConfig,
  cardEntities: CardEntities,
  toggleConfigProp: A_CONFIG_PROP | Array<A_CONFIG_PROP>,
  entityConfigProp: A_CARD_ENTITY
): boolean => {
  const toggleConfigProps = Array.isArray(toggleConfigProp)
    ? toggleConfigProp
    : [toggleConfigProp];

  // Iterate over the toggleConfigProps and return false if any of them are false
  for (const prop of toggleConfigProps) {
    if (!config[prop]) {
      return false;
    }
  }

  // Return false if the entityConfigProp is not defined
  if (!cardEntities[entityConfigProp]?.entity_id) {
    return false;
  }

  return true;
};
