import {A_CARD_ENTITY} from './config-prop-entities.const';
import {A_CONFIG_PROP, CONFIG_PROP} from './config-prop.const';
import {
  A_WEATHER_ENTITY_ATTRIBUTE,
  WEATHER_ENTITY_ATTRIBUTE,
} from './weather-entity-attributes.const';

type InferredEntityRule = {
  idPattern?: {
    parentDeviceConfigProp: A_CONFIG_PROP | undefined;
    pattern: string;
  };
  attributePattern?: {
    parentCardEntity: A_CARD_ENTITY;
    attribute: A_WEATHER_ENTITY_ATTRIBUTE;
  };
};

/**
 * These are the rules used to infer the entity IDs from a device name or another entity's attribute.
 * Use '%device_name%' as a placeholder for the device name.
 */
export const INFERRED_ENTITY_RULES: Record<A_CARD_ENTITY, InferredEntityRule> =
  {
    // Infer the summary weather entity from the device name "weather.%device_name%"
    [CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'weather.%device_name%',
      },
    },

    // Infer the current temperature from the summary weather entity's "temperature" attribute
    [CONFIG_PROP.CURRENT_TEMP_ENTITY_ID]: {
      attributePattern: {
        parentCardEntity: CONFIG_PROP.SUMMARY_WEATHER_ENTITY_ID,
        attribute: WEATHER_ENTITY_ATTRIBUTE.TEMPERATURE,
      },
    },

    // There is no inference for the feels like temperature. It must be defined in the card config.
    [CONFIG_PROP.FEELS_LIKE_TEMP_ENTITY_ID]: {},

    // Infer the weather icon entity from the device name "weather.%device_name%"
    [CONFIG_PROP.WEATHER_ICON_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'weather.%device_name%',
      },
    },

    // Infer the time entity specifically to "sensor.time"
    [CONFIG_PROP.TIME_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: undefined,
        pattern: 'sensor.time',
      },
    },

    // Infer the date entity specifically to "sensor.date"
    [CONFIG_PROP.DATE_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: undefined,
        pattern: 'sensor.date',
      },
    },

    // Infer the "now/later" now temperature entity from the device name "sensor.%device_name%_now_temp_now"
    [CONFIG_PROP.NOW_LATER_NOW_TEMP_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'sensor.%device_name%_now_temp_now',
      },
    },

    // Infer the "now/later" now label entity from the device name "sensor.%device_name%_now_now_label"
    [CONFIG_PROP.NOW_LATER_NOW_LABEL_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'sensor.%device_name%_now_now_label',
      },
    },

    // Infer the "now/later" label temperature entity from the device name "sensor.%device_name%_now_temp_later"
    [CONFIG_PROP.NOW_LATER_LATER_TEMP_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'sensor.%device_name%_now_temp_later',
      },
    },

    // Infer the "now/later" later label entity from the device name "sensor.%device_name%_now_later_label"
    [CONFIG_PROP.NOW_LATER_LATER_LABEL_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'sensor.%device_name%_now_later_label',
      },
    },

    // Infer the warnings count entity from the device name "sensor.%device_name%_warnings"
    [CONFIG_PROP.WARNINGS_COUNT_ENTITY_ID]: {
      idPattern: {
        parentDeviceConfigProp: CONFIG_PROP.WEATHER_DEVICE_ID,
        pattern: 'sensor.%device_name%_warnings',
      },
    },
  };
