/* eslint-disable no-console */
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import svg from 'rollup-plugin-svg';
import incrementBuildNumber from './tools/increment-build-number.mjs';

const production = !process.env.ROLLUP_WATCH;

if (production) console.log('\x1b[33m%s\x1b[0m', 'Building for production');

// Set the log level
const logLevel = production ? 'warn' : 'debug';

// Enable debug styles (outline sections in red etc...)
// Enable this if you need to debug layout issues
const enableDebugStyles = false;

const serveOptions = {
  contentBase: ['./dist'],
  host: 'localhost',
  port: 4000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bom-weather-card.js',
      format: 'esm',
      name: 'BomWeatherCard',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    incrementBuildNumber(),

    replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),

    // Set the Log Level
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      delimiters: ['', ''],
      "log.setLevel('info');": `log.setLevel('${logLevel}');`,
    }),

    // Enable debug styles
    replace({
      preventAssignment: false,
      'compileTimeDebugStyles = debugStyles': enableDebugStyles
        ? 'compileTimeDebugStyles = debugStyles'
        : 'compileTimeDebugStyles = css``',
    }),

    svg(),

    resolve(),

    commonjs(),

    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
    }),

    json(),

    eslint({
      throwOnError: true,
      throwOnWarning: false,
      include: ['src/**/*.ts'],
    }),

    // Copy the Background images to the dist folder
    copy({
      targets: [
        {
          src: 'src/img/backgrounds/**/*',
          dest: 'dist/img/backgrounds',
          copyOnce: true,
        },
      ],
      copyOnce: true,
    }),

    ...(production ? [terser()] : [serve(serveOptions)]),
  ],
  external: ['react', 'react-dom'],
  watch: {
    exclude: ['package.json'],
  },
};
