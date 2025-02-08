export type HassEntityRegistryEntry = {
  entity_id: string; // Example: "weather.home"
  name?: string; // User-defined friendly name
  unique_id: string; // Integration's unique identifier
  platform: string; // The integration that owns this entity (e.g., "met", "openweathermap")
  device_id?: string; // Associated device ID (if any)
  config_entry_id?: string; // The config entry that registered this entity
  area_id?: string; // Area ID if assigned
  disabled_by?: 'user' | 'integration' | null;
  hidden_by?: 'user' | 'integration' | null;
  icon?: string; // Optional custom icon
  entity_category?: 'config' | 'diagnostic' | null;
};
