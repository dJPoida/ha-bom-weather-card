export type HassIntegration = {
  domain: string; // The integration domain (e.g., "openweathermap", "met")
  title: string; // User-friendly title of the integration
  config_entry_id: string; // The config entry ID associated with this integration
};
