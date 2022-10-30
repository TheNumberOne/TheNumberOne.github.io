<script>
  import { defaultDateFormat } from '../lib/const/dateFormat'
  import Base from './base.svelte'

  /**
   * @type string
   */
  export let title
  /**
   * @type string
   */
  export let description
  /**
   * @type string
   */
  export let date
</script>

<Base {title} {description}>
  <article class='my-4'>
    <h1>
      {title}
    </h1>
    <p class="font-bold">{defaultDateFormat.format(new Date(date))}</p>
    <slot />
  </article>
</Base>
