#!/bin/bash
set -e

HA_VERSION="/config/.HA_VERSION"
if [ -f "$HA_VERSION" ]; then

  CUSTOM_COMPONENTS_DIR="/config/custom_components"
  # Check if the target directory exists, create if not
  if [ ! -d "$CUSTOM_COMPONENTS_DIR" ]; then
    mkdir -p "$CUSTOM_COMPONENTS_DIR" || { echo "Failed to create directory: $CUSTOM_COMPONENTS_DIR"; exit 1; }
  fi

  # Define the component directory path
  COMPONENT_DIR="$CUSTOM_COMPONENTS_DIR/browser_mod"

  # Check if the Browser Mod integration is already installed
  if [ ! -d "$COMPONENT_DIR" ]; then
    echo "Installing Browser Mod integration..."

    # Create temporary directory for the download
    TEMP_DIR="/tmp/browser_mod_integration"
    mkdir -p "$TEMP_DIR" || { echo "Failed to create directory: $TEMP_DIR"; exit 1; }

    # Get the latest release archive URL for Browser Mod
    LATEST_RELEASE_URL=$(curl -s https://api.github.com/repos/thomasloven/hass-browser_mod/releases/latest | grep "tarball_url" | cut -d '"' -f 4)

    if [ -z "$LATEST_RELEASE_URL" ]; then
      echo "Error: Could not retrieve the latest release URL for Browser Mod."
      rm -rf "$TEMP_DIR"
      exit 1
    fi

    echo "Downloading latest release from $LATEST_RELEASE_URL..."

    # Download and extract the release to the temporary directory
    curl -L "$LATEST_RELEASE_URL" | tar -xz -C "$TEMP_DIR" --strip-components=1 # Adjust strip-components based on archive structure if needed

    # Find the correct `custom_components/browser_mod` folder within the extracted content
    # Assuming the component files are directly within the archive after stripping the top level folder
    SOURCE_DIR="$TEMP_DIR/custom_components/browser_mod"

    if [ -d "$SOURCE_DIR" ]; then
      # Move the Browser Mod integration to the target directory
      mv "$SOURCE_DIR" "$COMPONENT_DIR"
      echo "Browser Mod integration installed successfully. Restart Home Assistant before using it."
      echo "Once restarted, go to the HA Settings -> Devices and Integrations -> Add Integration -> Browser Mod"
    else
      echo "Error: Browser Mod integration directory not found in the expected location within the extracted files ($SOURCE_DIR)."
      # Optionally list files for debugging:
      # echo "Contents of $TEMP_DIR:"
      # ls -R "$TEMP_DIR"
    fi

    # Clean up temporary directory
    rm -rf "$TEMP_DIR"
  else
    echo "Browser Mod integration is already installed.  Go to the HA Settings -> Devices and Integrations -> Add Integration -> Browser Mod."
    echo "Then register your browser via http://localhost:8123/browser-mod (Recommended use the browser id `test_browser`)"
  fi
else
  echo "Home Assistant has not been configured yet. Ensure you run through the configuration wizard first."
fi