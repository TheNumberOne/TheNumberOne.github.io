import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

const config: UserConfig = {
  plugins: [
    sveltekit(),
    visualizer({
      emitFile: true,
      filename: 'stats.html'
    })
  ]
}

export default config
