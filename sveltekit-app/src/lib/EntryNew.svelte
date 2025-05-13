<script>
// EntryNew.svelte - Journal entry component
let title = '';
let content = '';
let titleEl;
let contentEl;

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// Get today's date in mm/dd/yyyy format
const today = new Date();
const pad = n => n.toString().padStart(2, '0');
const todayStr = `${pad(today.getMonth() + 1)}/${pad(today.getDate())}/${today.getFullYear()}`;
</script>

<!-- EntryNew component: Journal entry form -->
<form class="entry-form">
  <div>
    <textarea
      id="title"
      bind:value={title}
      placeholder={todayStr}
      bind:this={titleEl}
      on:input={() => autoResize(titleEl)}
      style="font-size: 3rem; font-weight: 700; overflow: hidden; resize: none;"
      rows="1"
    ></textarea>
  </div>
  <div>
    <textarea
      id="content"
      bind:value={content}
      placeholder="Write your journal entry here..."
      bind:this={contentEl}
      on:input={() => autoResize(contentEl)}
      style="overflow: hidden;"
      rows="8"
    ></textarea>
  </div>
  <button type="submit" class="submit-btn">Submit</button>
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
  .entry-form textarea {
    width: 100%;
    box-sizing: border-box;
    margin-top: 25px;
    font-size: 3rem;
    font-family: inherit;
    font-weight: 700;
    padding: 0rem;
    border-radius: 0px;
    border: 0px solid #ccc;
    color: var(--color-dark);
    background-color: var(--color-light);
    resize: none;
  }
  .entry-form textarea#content {
    min-height: 100px;
  }
  .entry-form > div {
    width: 100%;
  }
  .entry-form textarea:focus {
    border: none;
    outline: none;
  }
  .submit-btn {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-light);
    background-color: var(--color-accent);
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .submit-btn:hover {
    background-color: var(--color-accent2);
  }
</style> 