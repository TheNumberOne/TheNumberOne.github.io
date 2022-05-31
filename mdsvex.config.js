import { defineMDSveXConfig as defineConfig } from 'mdsvex'

const config = defineConfig({
  extensions: ['.svx'],
  layout: {
    _: './src/layouts/base.svelte',
    blog: './src/layouts/blog.svelte'
  },
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [],
  rehypePlugins: []
})

export default config
