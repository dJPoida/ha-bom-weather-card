#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Running install_hacs.sh..."
bash "${SCRIPT_DIR}/install_hacs.sh"

echo "Running install_bureau_of_meteorology.sh..."
bash "${SCRIPT_DIR}/install_bureau_of_meteorology.sh"

echo "Running install_browser_mod.sh..."
bash "${SCRIPT_DIR}/install_browser_mod.sh"

echo ""
echo "All integrations installed successfully."
