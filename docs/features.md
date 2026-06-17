# Theme Toggle

## Purpose

Allow learners to switch between light and dark mode based on their environment or preference. Dark mode reduces eye strain during long study sessions, while light mode improves readability in bright environments.

## Implementation

### CSS Variables

The design system uses HSL CSS custom properties defined in `:root` (light) and `.dark` (dark):

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  /* ... */
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

All component colors reference these variables via `hsl(var(--background))`, so toggling the `.dark` class on `<body>` instantly switches every element.

### Toggle Button

A pill-shaped icon button is placed in the header navigation (desktop) and mobile menu. It displays a sun icon in dark mode (switch to light) and a moon icon in light mode (switch to dark).

```html
<button class="theme-toggle" aria-label="Toggle theme">
  <svg class="sun-icon">...</svg>   <!-- visible in dark mode -->
  <svg class="moon-icon">...</svg>  <!-- visible in light mode -->
</button>
```

CSS controls visibility:

```css
.theme-toggle .sun-icon { display: block; }
.theme-toggle .moon-icon { display: none; }
.dark .theme-toggle .sun-icon { display: none; }
.dark .theme-toggle .moon-icon { display: block; }
```

### JavaScript

Theme switching is handled at the end of the main script IIFE:

1. On load, reads `localStorage.getItem('theme')` — defaults to `'dark'`
2. Applies the theme by adding/removing the `.dark` class on `<body>`
3. Persists the choice to localStorage on every toggle
4. Both desktop and mobile toggle buttons trigger the same `applyTheme()` function

```js
function applyTheme(theme) {
  if (theme === 'light') body.classList.remove('dark');
  else body.classList.add('dark');
  localStorage.setItem('theme', theme);
}
```

### User Experience

- **Default**: Dark mode (matches the brand aesthetic and reduces glare for study sessions)
- **Persistence**: Choice survives page reloads and browser sessions
- **Instant**: No flash — inline script could be moved to `<head>` for FOUC prevention, but the CSS variable system ensures a clean transition
- **Both toggles stay in sync**: Desktop and mobile buttons share the same state

## Future Improvements

- Respect `prefers-color-scheme` system setting on first visit
- Add a transition/animation on theme switch for a smoother visual shift
- Expose theme state in the URL for shareable course links
