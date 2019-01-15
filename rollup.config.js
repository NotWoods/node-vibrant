import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";

const entryWithWorker = './src/bundle.worker.ts';
function plugins(minify = true) {
    const plugins = [typescript({ target: 'es2018' })];
    if (minify) plugins.push(terser());
    return plugins;
}

/** @type {import('rollup').RollupFileOptions} */
const workerBundleConfig = {
    input: entryWithWorker,
    output: {
        format: 'esm',
        sourcemap: true,
        file: 'dist/vibrant.js'
    },
    plugins: plugins(true)
};

const workerConfig = {
    input: 'src/quantizer/worker/worker.ts',
    output: {
        format: 'esm',
        sourcemap: true,
        file: 'dist/worker.js'
    },
    plugins: plugins(true)
};

export default [workerBundleConfig, workerConfig];
