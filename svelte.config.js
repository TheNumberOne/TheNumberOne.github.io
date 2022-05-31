import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { visualizer } from 'rollup-plugin-visualizer'
import { join } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexConfig)
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $layouts: 'src/layouts'
    },
    vite: {
      plugins: [
        visualizer((opts) => {
          return { filename: join(opts.dir, 'stats.html') }
        })
      ]
    }
  }
}

export default config
