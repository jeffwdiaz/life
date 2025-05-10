<script>
// EntryNew.svelte - Journal entry component
let title = '';
let content = '';
</script>

<!-- EntryNew component: Journal entry form -->
<form class="entry-form">
  <div>
    <br>
    <br>
    <input id="title" type="text" bind:value={title} placeholder="Entry title" />
  </div>
  <div>
    <textarea id="content" bind:value={content} placeholder="Write your journal entry here..." rows="8"></textarea>
  </div>
</form>

<style>
  .entry-form {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 2rem;
  }
  .entry-form label {
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 10px;
    display: block;
  }
  .entry-form input,
  .entry-form textarea {
    width: 100%;
    box-sizing: border-box;
    margin-top: 25px;
    font-size: 3rem;
    font-family: inherit;
    font-weight: 700;
    padding: 0.5rem;
    border-radius: 0px;
    border: 0px solid #ccc;
    color: var(--color-dark);
    background-color: var(--color-light);
  }
  .entry-form textarea {
    resize: vertical;
    min-height: calc(100vh - 400px); /* Adjust 300px as needed for header/nav/spacing */
  }
  .entry-form > div {
    width: 100%;
  }
  .entry-form input:focus,
  .entry-form textarea:focus {
    border: none;
    outline: none;
  }
</style> 