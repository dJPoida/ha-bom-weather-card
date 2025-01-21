// This script cleans up the .devcontainer directory by removing all files and directories
// except for those specified in the keepPaths array.
// Authored by Peter Eldred.

import {fileURLToPath} from 'url';
import fs from 'fs';
import path from 'path';

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../.devcontainer');

fs.readdirSync(rootDir).forEach((item) => {
  if (!keepPaths.includes(item)) {
    const fullPath = path.join(rootDir, item);
    fs.rmSync(fullPath, {recursive: true, force: true});
  }
});

console.log(
  '".devcontainer" cleaned. You can now re-create your container using `hass:start`.'
);
