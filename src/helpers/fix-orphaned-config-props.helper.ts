import {CONFIG_PROP_DEPENDENCIES} from '../constants/config-prop-dependencies.const';
import {A_CONFIG_PROP} from '../constants/config-prop.const';
import {CardConfig} from '../types/card-config.type';

/**
 * Iterate over the CONFIG_PROP_DEPENDENCIES and remove any orphaned config properties
 * based on the state of the cardConfig object.
 *
 * For example, remove the "SHOW_FEELS_LIKE_TEMP" property if "SHOW_CURRENT_TEMP" is not true
 *
 * @param cardConfig
 * @returns
 */
export const fixOrphanedConfigProps = (cardConfig: CardConfig): CardConfig => {
  const newConfig = {...cardConfig};

  // Iterate through the CONFIG_PROP_DEPENDENCIES and remove any orphaned config properties
  for (const [prop, dependency] of Object.entries(CONFIG_PROP_DEPENDENCIES)) {
    if (!newConfig[dependency]) {
      delete newConfig[prop as A_CONFIG_PROP];
    }
  }

  return newConfig;
};
