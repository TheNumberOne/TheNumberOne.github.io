<script>
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
        {{ title }}
    </h1>
    <p class="subtitle"><strong>{{ date }}</strong></p>
    <slot></slot>
</article>