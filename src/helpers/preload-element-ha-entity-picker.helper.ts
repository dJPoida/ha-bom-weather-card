import {Localizer} from '../types/localizer.type';

/**
 * To access the HA Entity Picker it will need to be pre-loaded into the browser.
 * @see: https://github.com/thomasloven/hass-config/wiki/PreLoading-Lovelace-Elements
 *
 * @param localize The localizer function
 *
 * @throws {Error} If the HA Entity Picker element fails to pre-load
 */
export const preLoadEntityPicker = async (
  localize: Localizer
): Promise<void> => {
  if (!window.customElements.get('ha-entity-picker')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cardHelpers = await (window as any).loadCardHelpers();
    const cardElement = await cardHelpers.createCardElement({
      type: 'entities',
      entities: [],
    });
    await cardElement.constructor.getConfigElement();

    // Attempt to access the HA Entity Picker element
    if (!window.customElements.get('ha-entity-picker')) {
      throw new Error(
        localize('error.failedToPreLoadElement', {
          element: 'ha-entity-picker',
        })
      );
    }
  }
};
