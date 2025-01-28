import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import svg from 'rollup-plugin-svg';

const production = !process.env.ROLLUP_WATCH;
const serveOptions = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
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
      sourcemap: true,
    },
  ],
  plugins: [
    replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
    svg(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
    }),
    json(),
    ...(production ? [terser()] : [serve(serveOptions)]),
  ],
  external: ['react', 'react-dom'],
};
