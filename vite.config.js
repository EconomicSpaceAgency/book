import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'
import { readdirSync } from 'fs'
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  build: {
    rollupOptions: {
      // manual chunks for entries
      input: {
        'index': path.resolve(__dirname, 'index.html'),  // Add this line
        // 'main': path.resolve(__dirname, 'main.js'),  
        ...getFilesFromDir('web3'),
        ...getFilesFromDir('db'),
        ...getFilesFromDir('ux'),
        ...getFilesFromDir('util')
      }
    },
    assetsDir: '.', // Flatten the asset directory structure
  },
  // resolve: {
  //   alias: {
  //     assert: 'assert',
  //     buffer: 'buffer',
  //     crypto: 'crypto-browserify',
  //     http: 'stream-http',
  //     https: 'https-browserify',
  //     os: 'os-browserify/browser',
  //     process: 'process/browser',
  //     stream: 'stream-browserify',
  //     util: 'util'
  //   }
  // },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'imgs/*', dest: 'imgs' },         // Just 'imgs', not 'dist/imgs'
        { src: 'orbs/*', dest: 'orbs' },
        { src: '/book/imgs/*', dest: 'book/imgs' },         // Just 'orbs', not 'dist/orbs'
        { src: 'glossary.json', dest: '' },      // Just '' to place directly under dist/
        { src: 'audiobook/*', dest: 'audiobook' },
        { src: 'css/*', dest: 'css' },
      ]
    }),
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ['path'],
      // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
      exclude: [
        'fs', // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        util: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    svgr()
  ],
  server: {
    port: 3000,
    strictPort: true,
  }
})

// Helper function to get all .js files for a given directory
function getFilesFromDir(dir) {
  return readdirSync(path.resolve(__dirname, dir))
      .filter(file => file.endsWith('.js'))
      .reduce((acc, curr) => {
          const name = path.basename(curr, '.js')
          acc[`${dir}/${name}`] = path.resolve(__dirname, dir, curr)
          return acc
      }, {})
}
