// This script cleans up the .hass directory by removing all files and directories
// except for those specified in the keepPaths array. 
// Authored by Peter Eldred.

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../.hass');
const keepPaths = [
  'scripts',
  'views',
  'automations.yaml',
  'configuration.yaml',
  'lovelace.yaml',
  'scenes.yaml',
  'scripts.yaml',
  'test-dashboard.yaml',
];

fs.readdirSync(rootDir).forEach((item) => {
  if (!keepPaths.includes(item)) {
    const fullPath = path.join(rootDir, item);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
});

console.log('".hass" directory cleaned. You can now re-create your container using `hass:start`.');