<script type="module" lang="ts">
  import { sortBy } from '../../lib/util/sortBy'
  import { defaultDateFormat } from '../../lib/const/dateFormat'
  import Base from '../../layouts/base.svelte'

  function getUrl(path: string): string {
    return path.replace(/\+page\.(?:svx|svelte)$/, '').replace(/^.\//, '/blog/')
  }

  const files: Record<string, { metadata: { date: string; title: string } }> =
    import.meta.glob('./*/+page.{svx,svelte}', {eager: true})

  const filesAsList = Object.entries(files).map(([path, imported]) => ({ url: getUrl(path), ...imported }))

  const sortedFiles = sortBy(filesAsList, (file) => file.metadata.date).reverse()
</script>

<Base title="Blog" description="A blog for Numeral's ramblings">
  <h1 class="title">Blog</h1>

  <ul>
    {#each sortedFiles as file}
      <li>
        <a href={file.url}>
          {defaultDateFormat.format(new Date(file.metadata.date))} - {file.metadata.title}
        </a>
      </li>
    {/each}
  </ul>
</Base>
