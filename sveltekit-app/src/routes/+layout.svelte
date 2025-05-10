<script>
  import Navigation from '$lib/Navigation.svelte';
  import '$lib/css/app.css';
  import '$lib/css/fonts.css';
  import '$lib/css/colors.css';
</script>

<div class="main-layout">
  <Navigation />
  <slot />
</div>

<style>
  .main-layout {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 50px;
    width: 100%;
    max-width: 1200px;
  }
</style> 