<script>
  // mdsvex only supports javascript in layout files for now
  /**
   * @type string
   */
  export let title
  /**
   * @type string
   */
  export let description
</script>

<svelte:head>
  <title>{title}</title>
  <meta type="description" content={description} />
</svelte:head>

<slot />
