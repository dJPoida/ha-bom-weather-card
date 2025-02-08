export type HassConfigEntry = {
  entry_id: string; // Unique ID for the integration instance
  domain: string; // Integration domain (e.g., "openweathermap", "met")
  title: string; // User-friendly name (e.g., "OpenWeatherMap")
  source: string; // How it was added ("user", "discovery", etc.)
  state: 'loaded' | 'setup_error' | 'not_loaded'; // Current integration state
};
