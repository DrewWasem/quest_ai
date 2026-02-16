# Google Fonts Race Condition in Headless Chrome

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** chrome, fonts, rendering, bug, headless

## Summary
Headless Chrome screenshots captured before Google Fonts finish loading, resulting in fallback system fonts.

## Problem
When rendering multiple HTML files sequentially with `--headless --screenshot`, earlier files capture before Google Fonts finish loading, displaying fallback fonts (e.g., Times New Roman instead of Fredoka).

## Root Cause
Chrome's headless screenshot mode captures immediately after DOMContentLoaded, not after external resources (fonts) finish downloading. Font caching from later renders makes the issue inconsistent.

## Symptoms
- First HTML file in a batch: fallback fonts
- Later files: correct Google Fonts (cached)
- Inconsistent results across runs

## Fix: Three-Part Solution

### 1. Virtual Time Budget Flag
```bash
--virtual-time-budget=5000
```
Allocates 5 seconds of virtual time for the page to fully load before screenshot.

### 2. Font Preconnect Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
Speeds up font loading by establishing connections early.

### 3. JavaScript Font Ready Check
```html
<script>
  document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
  });
</script>
```

### 4. CSS Visibility Toggle
```css
body {
  visibility: hidden;
}

body.fonts-loaded {
  visibility: visible;
}
```

## Verification
All three end card renders now show correct Fredoka and Nunito fonts consistently.

## Related
- Pattern: html-to-jpeg-rendering.md
- `videos/final-card-{1,2,3}.html` - Fixed HTML sources
