/**
 * Lifted directly from HomeAssistant Frontend Code version 20250106.0
 * @TODO Attribution
 */

import type {HassEntity} from 'home-assistant-js-websocket';

export const supportsFeature = (
  stateObj: HassEntity,
  feature: number
): boolean => supportsFeatureFromAttributes(stateObj.attributes, feature);

export const supportsFeatureFromAttributes = (
  attributes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
  feature: number
): boolean =>
  // eslint-disable-next-line no-bitwise
  (attributes.supported_features! & feature) !== 0;
