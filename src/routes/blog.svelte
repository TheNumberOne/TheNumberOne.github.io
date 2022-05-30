<script type='module' lang="ts">
	import { sortBy } from '../lib/util/sortBy';
	import { defaultDateFormat } from '../lib/const/dateFormat';

	function stripPath(path: string): string {
		return path.replace(/(?:\/index)?\.svx$/, '')
	}

	const files: Record<string,
		{ metadata: { date: string; title: string } }> = import.meta.globEager('./blog/*{,/*}.svx');

	const filesAsList = Object.entries(files).map(([path, imported]) => ({ path, ...imported }));

	const sortedFiles = sortBy(filesAsList, (file) => file.metadata.date);
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1 class='title'>Blog</h1>

<ul>
	{#each sortedFiles as file}
		<li><a href={stripPath(file.path)}>{defaultDateFormat.format(new Date(file.metadata.date))} - {file.metadata.title}</a></li>
	{/each}
</ul>
