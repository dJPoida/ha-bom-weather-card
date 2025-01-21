#!/bin/bash
set -e

HA_VERSION="/config/.HA_VERSION"
if [ -f "$HA_VERSION" ]; then

  CUSTOM_COMPONENTS_DIR="/config/custom_components"
  if [ ! -d "$BOM_COMPONENT_DIR" ]; then
    mkdir -p "$CUSTOM_COMPONENTS_DIR" || { echo "Failed to create directory: $CUSTOM_COMPONENTS_DIR"; exit 1; }
  fi

  # Check if the Bureau of Meteorology integration is already installed
  BOM_COMPONENT_DIR="$CUSTOM_COMPONENTS_DIR/bureau_of_meteorology"
  if [ ! -d "$BOM_COMPONENT_DIR" ]; then
    echo "Installing Bureau of Meteorology integration..."

    # Create temporary directory for the download
    TEMP_DIR="/tmp/bom_integration"
    mkdir -p "$TEMP_DIR" || { echo "Failed to create directory: $TEMP_DIR"; exit 1; }

    # Get the latest release archive URL
    LATEST_RELEASE_URL=$(curl -s https://api.github.com/repos/bremor/bureau_of_meteorology/releases/latest | grep "tarball_url" | cut -d '"' -f 4)

    echo "Downloading latest release from $LATEST_RELEASE_URL..."

    # Download and extract the release to the temporary directory
    curl -L "$LATEST_RELEASE_URL" | tar -xz -C "$TEMP_DIR"

    # Find the correct `custom_components/bureau_of_meteorology` folder
    FOUND_DIR=$(find "$TEMP_DIR" -type d -name "bureau_of_meteorology" | grep "/custom_components/bureau_of_meteorology$")

    if [ -n "$FOUND_DIR" ]; then
      # Move the Bureau of Meteorology integration to the target directory
      mv "$FOUND_DIR" "$BOM_COMPONENT_DIR"
      echo "Bureau of Meteorology integration installed successfully. Restart Home Assistant before configuring the integration."
      echo "Once restarted, go to the HA Settings -> Devices and Integrations -> Add Integration -> Bureau of Meteorology."
    else
      echo "Error: Bureau of Meteorology integration not found in the extracted files."
    fi

    # Clean up temporary directory
    rm -rf "$TEMP_DIR"
  else
    echo "Bureau of Meteorology integration is already installed. Go to the HA Settings -> Devices and Integrations -> Add Integration -> Bureau of Meteorology."
  fi
else
  echo "Home Assistant has not been configured yet. Ensure you run through the configuration wizard first."
fi