# Changelog

## 2025-05-05 - Monday
### Added
- Button to navigate back home after submitting a new journal entry (`JournalEntry.jsx`).
- Full entry view (`FullEntryView.jsx`, `FullEntryView.css`) to display complete journal entries (later refactored).
- Route `/entry/:id` to display full entry view (`App.jsx`).
- Delete button and functionality to the journal entry form (`JournalEntry.jsx`).
- Default title for new journal entries to current date (YYYY-MM-DD) (`JournalEntry.jsx`).

### Changed
- Refactored entry view/edit functionality into a single component (`JournalEntry.jsx`).
- Updated routing (`App.jsx`) to use `JournalEntry` for both new (`/new-entry`) and edit (`/entry/:id`) paths.
- Refactored CSS organization:
    - Moved component-specific color rules into `colors.css`.
    - Consolidated global styles, removing redundancy between `style.css`, `components.css`, `NavButtons.css`.
    - Moved Home component specific styles from `style.css` to `Home.css`.
- Updated color variables and applications in `colors.css` based on user changes.
- Corrected global font selectors in `fonts.css` from `.body h1/h2` to `h1/h2`.

### Removed
- Borders (`border-bottom`) and rounded corners (`border-radius`) from various CSS files.
- Placeholder style comments from `style.css` (after manual deletion by user).

### Archived
- `FullEntryView.jsx` and `FullEntryView.css` (functionality merged into `JournalEntry.jsx`).
- `components.css` and `NavButtons.css` (styles merged into `style.css` or component CSS).

## 2025-04-29 - Tuesday
- Refactored: Moved component-specific styles to their own CSS files (`home.css`, `auth.css`, `journal-entry.css`) in `src/css`.
- Added: `body.css` for global styles and resets.
- Updated: Color variables to use `--color-light`, `--color-dark`, and `--color-accent` in `colors.css`.
- Updated: Font variables and Google Fonts imports in `fonts.css`.
- Updated: All components now import their CSS from the correct path.
- Updated: README.md to reflect new CSS organization and rules.

## 2025-04-28 - Monday
- Added: Initial project structure and documentation files. 
- Added: Created src/components, src/pages, src/hooks, and src/utils folders for React structure.
- Added: Minimal HTML5 template to src/index.html.
- Added: Minimal CSS templates to src/css/fonts.css and src/css/colors.css.
- Updated: README.md folder structure and to-do list for React setup. 