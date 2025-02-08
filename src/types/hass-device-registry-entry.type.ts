export type HassDeviceRegistryEntry = {
  id: string; // Unique identifier for the device
  name?: string; // Friendly name assigned to the device
  name_by_user?: string; // Name assigned by the user
  manufacturer?: string; // Device manufacturer
  model?: string; // Device model
  sw_version?: string; // Software/firmware version
  hw_version?: string; // Hardware version (if available)
  entry_type?: 'service' | 'device'; // Type of entry (some are services instead of devices)
  config_entries: string[]; // Associated config entries
  area_id?: string; // ID of the area the device belongs to
  via_device_id?: string | null; // If this device is connected via another device (e.g., Zigbee hub)
  disabled_by?: 'user' | 'integration' | null; // If the device is disabled
  connections: [string, string][]; // List of connection identifiers (e.g., MAC address)
  identifiers: [string, string][]; // Integration-specific unique identifiers
};
