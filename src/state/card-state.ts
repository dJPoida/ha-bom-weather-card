import {HomeAssistant} from 'custom-card-helpers';
import log from 'loglevel';

// Define an interface for the themes object including darkMode
interface HassThemesWithDarkMode {
  darkMode?: boolean;
}

export class CardState {
  private _hass: HomeAssistant | null = null;
  private _previousHass: HomeAssistant | null = null; // Store previous hass state

  constructor() {
    // Initial setup if needed
  }

  /**
   * Updates the internal hass state and checks for relevant changes.
   * @param newHass The new HomeAssistant object.
   * @returns True if relevant state (darkMode, dayMode) changed, false otherwise.
   */
  public updateHass(newHass: HomeAssistant): boolean {
    log.debug('[CardState] updateHass called.', {hasOldHass: !!this._hass, hasNewHass: !!newHass});
    if (!newHass) {
      return false; // No new state to process
    }

    const oldHass = this._hass; // Use the current _hass as the old state for comparison
    this._previousHass = oldHass; // Store the state *before* this update
    this._hass = newHass; // Update internal state to the new one

    if (!oldHass) {
      return true; // Always update on the first run when oldHass was null
    }

    // Check if dark mode changed
    const oldThemes = oldHass.themes as HassThemesWithDarkMode | undefined;
    const newThemes = newHass.themes as HassThemesWithDarkMode | undefined;
    const darkModeChanged = oldThemes?.darkMode !== newThemes?.darkMode;

    // Check if sun state changed
    const oldSunState = oldHass.states['sun.sun']?.state;
    const newSunState = newHass.states['sun.sun']?.state;
    const sunStateChanged = oldSunState !== newSunState;

    // Return true if any relevant part changed
    const didChange = darkModeChanged || sunStateChanged;
    log.debug('[CardState] updateHass comparison result:', {darkModeChanged, sunStateChanged, didChange});

    // No need to revert state here. If nothing changed, didChange is false.
    // The internal _hass is now newHass, which is correct.
    // The getters will reflect the new state.

    return didChange;
  }

  // Properties will be added here
  get dayMode(): boolean {
    // Default to true if hass or sun.sun state is unavailable
    return this._hass?.states['sun.sun'] ? this._hass.states['sun.sun'].state === 'above_horizon' : true;
  }

  get darkMode(): boolean {
    // Default to false if hass or themes object is unavailable
    const themes = this._hass?.themes as HassThemesWithDarkMode | undefined;
    return themes?.darkMode === true;
  }

  /**
   * Indicates if the CardState has received a hass object.
   */
  get hasHass(): boolean {
    return !!this._hass;
  }
}
