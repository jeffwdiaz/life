# Changelog

## 2025-05-13 - Tuesday
- Changed: Clarified tech stack in README.md to SvelteKit, HTML, CSS
- Changed: Reviewed and prepared changelog.md and to-do.md for updates
- Changed: Reviewed .gitignore for compliance with project-specific rules

## [Day 2] - 2025-05-14
- Added: EntryOld.svelte component for displaying old journal entries (read-only)
- Added: Supabase integration for fetching journal entries from the 'journal_entries' table
- Changed: EntryOld and EntryNew now both use auto-resizing textareas for content
- Changed: Consolidated and cleaned up CSS for EntryOld and EntryNew components
- Fixed: Table name bug in Supabase query (journal → journal_entries)
- Fixed: Environment variable and module resolution issues for Supabase client
- Fixed: Old entries now display correctly with mood and formatted date
