import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
    // optimizeDeps: {
    //     esbuildOptions: {
    //         define: {
    //             global: 'globalThis'
    //         },
    //         plugins: [
    //             NodeGlobalsPolyfillPlugin({ buffer: true }),
    //             NodeModulesPolyfillPlugin()
    //         ]
    //     }
    // },
    plugins: [react()],
    server: {
        host: '0.0.0.0',
    }
})
