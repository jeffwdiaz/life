<script>
// EntryOld.svelte - Display old journal entry (read-only)
export let title = '';
export let content = '';
export let mood = '';
export let created_at = '';
let contentEl;

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

import { onMount } from 'svelte';
onMount(() => {
  if (contentEl) autoResize(contentEl);
});
</script>

<!-- EntryOld component: Read-only journal entry display -->

<div class="entry-old">
    <div>
        <br>
        <br>
    <textarea
      id="title"
      value={title}
      readonly
      rows="1"
    ></textarea>
    <div class="entry-meta">
      <span class="entry-date">{created_at}</span>
      {#if mood}
        <span class="entry-mood">Mood: {mood}</span>
      {/if}
    </div>
  </div>
  <div>
    <textarea
      id="content"
      value={content}
      readonly
      bind:this={contentEl}
      on:input={() => autoResize(contentEl)}
      rows="1"
    ></textarea>
  </div>
</div>

<style>
  .entry-old {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 2rem;
  }
  .entry-old textarea {
    width: 100%;
    box-sizing: border-box;
    margin-top: 25px;
    font-size: 2rem;
    font-family: inherit;
    font-weight: 700;
    padding: 0rem;
    border-radius: 0px;
    border: 0px;
    color: var(--color-dark);
    background-color: var(--color-light);
    resize: none;
    overflow: hidden;
  }
  .entry-old textarea#title {
    min-height: unset;
  }
  .entry-old textarea#content {
    background-color: var(--color-accent);
  }
  .entry-old > div {
    width: 100%;
  }
  .entry-old textarea:focus {
    border: none;
    outline: none;
  }
  .entry-meta {
    color: var(--color-dark);
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

</style> 