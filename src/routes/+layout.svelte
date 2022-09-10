<script lang="ts">
  import '../app.css'

  const navItems = [
    ['/', 'Numeral'],
    ['/blog', 'Blog'],
    ['/ideas', 'Ideas']
  ]
</script>

<header class="max-w-screen-md mx-auto px-4">
  <nav>
    <ul class="list-none mx-0">
      {#each navItems as [path, name], i}
        <li class="inline">
          {#if i !== 0}
            <span aria-hidden="true"> | </span>
          {/if}
          <a href={path}>{name}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<main class="max-w-screen-md mx-auto px-4">
  <slot />
</main>
