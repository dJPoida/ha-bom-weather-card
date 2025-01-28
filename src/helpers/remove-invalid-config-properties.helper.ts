import {A_CONFIG_PROP} from '../constants/card-config-prop.const';
import {DEFAULT_CARD_CONFIG} from '../constants/default-config.const';
import {CardConfig} from '../types/card-config.type';

/**
 * Removes invalid properties from a config object (potentially
 * stored at an earlier time when the schema was different).
 */
export const removeInvalidConfigProperties = (
  config: CardConfig
): CardConfig => {
  const validKeys = new Set<A_CONFIG_PROP>(
    Object.keys(DEFAULT_CARD_CONFIG) as A_CONFIG_PROP[]
  );
  return Object.keys(config).reduce((acc, key) => {
    if (validKeys.has(key as A_CONFIG_PROP)) {
      (acc as Record<string, unknown>)[key] = config[key as A_CONFIG_PROP];
    }
    return acc;
  }, {} as CardConfig);
};
