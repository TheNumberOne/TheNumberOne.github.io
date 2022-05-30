<script>
	import { defaultDateFormat } from '../lib/const/dateFormat';

	/**
	 * @type string
	 */
	export let title;
	/**
	 * @type string
	 */
	export let date;
</script>

<article>
	<h1>
		{ title }
	</h1>
	<p class="font-bold">{ defaultDateFormat.format(new Date(date)) }</p>
	<slot />
</article>
