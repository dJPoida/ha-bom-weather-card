import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import serve from "rollup-plugin-serve";

const production = !process.env.ROLLUP_WATCH;
const serveOptions = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 4000,
  allowCrossOrigin: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bom-weather-card.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', declaration: false, declarationMap: false }),
    ...(production ? [terser()] : [serve(serveOptions)]),
  ],
  external: ['react', 'react-dom'],
};