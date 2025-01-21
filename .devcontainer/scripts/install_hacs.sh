#!/bin/bash
set -e

HA_VERSION="/config/.HA_VERSION"
if [ -f "$HA_VERSION" ]; then

  CUSTOM_COMPONENTS_DIR="/config/custom_components"
  if [ ! -d "$BOM_COMPONENT_DIR" ]; then
    mkdir -p "$CUSTOM_COMPONENTS_DIR" || { echo "Failed to create directory: $CUSTOM_COMPONENTS_DIR"; exit 1; }
  fi

  # Install HACS if not already installed
  HACS_DIR="$CUSTOM_COMPONENTS_DIR/hacs"
  if [ ! -d "$HACS_DIR" ]; then
    echo "Installing HACS..."
    wget -q -O - https://get.hacs.xyz | bash -
    echo "HACS installation complete. Restart Home Assistant before configuring HACS."
    echo "Once restarted, go to the HA Settings -> Devices and Integrations -> Add Integration -> HACS."
  else
    echo "HACS is already installed. Go to the HA Settings -> Devices and Integrations -> Add Integration -> HACS."
  fi
else
  echo "Home Assistant has not been configured yet. Ensure you run through the configuration wizard first."
fi

