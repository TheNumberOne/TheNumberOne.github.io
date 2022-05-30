<script>
	// mdsvex only supports javascript in layout files for now
	/**
	 * @type string
	 */
	export let title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />
