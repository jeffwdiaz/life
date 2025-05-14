<script>
  import EntryNew from '$lib/EntryNew.svelte';
  import EntryOld from '$lib/EntryOld.svelte';
  import { supabase } from '$lib/supabaseClient.js';
  import { onMount } from 'svelte';

  let oldEntries = [];

  function formatDate(dateStr) {
    // Format date as yyyy-mm-dd
    const d = new Date(dateStr);
    return d.toISOString().slice(0, 10);
  }

  onMount(async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('id, created_at, title, content, mood')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching journal entries:', error);
    } else {
      oldEntries = (data || []).map(entry => ({
        ...entry,
        created_at: formatDate(entry.created_at)
      }));
    }
  });
</script>

<EntryNew />

<!-- Old entries list -->
{#each oldEntries as { title, content, mood, created_at, id }}
  <EntryOld {title} {content} {mood} {created_at} />
{/each} 