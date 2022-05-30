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
	<h1 class="title">
		{ title }
	</h1>
	<p class="subtitle"><strong>{ defaultDateFormat.format(new Date(date)) }</strong></p>
	<slot />
</article>
