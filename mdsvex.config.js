import { defineMDSveXConfig as defineConfig } from 'mdsvex'

const config = defineConfig({
  extensions: ['.svx'],
  layout: {
    _: './src/layouts/base.svelte',
    blog: './src/layouts/+page.svelte'
  },
  smartypants: {
    dashes: 'oldschool'
  }
})

export default config
