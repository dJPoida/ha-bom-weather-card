import {readFileSync, writeFileSync} from 'fs';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * A Rollup plugin that increments the build number in the package.json file.
 * This is useful for ensuring that the build number is always incremented.
 *
 * @returns {import('rollup').Plugin}
 */
export default function incrementBuildNumber() {
  return {
    name: 'increment-build-number',
    buildStart() {
      const pkgPath = resolve(__dirname, '../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      const versionParts = pkg.version.split('.');
      const buildNumber = parseInt(versionParts[2], 10) || 0;
      versionParts[2] = (buildNumber + 1).toString();
      pkg.version = versionParts.join('.');
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

      console.info(`Build number incremented to ${pkg.version}`);
    },
  };
}
