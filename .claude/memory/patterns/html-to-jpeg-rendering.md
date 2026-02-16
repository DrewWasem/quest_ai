# HTML to JPEG Rendering Pipeline

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** rendering, chrome, fonts, jpeg, video, headless

## Summary
Headless Chrome pipeline for rendering HTML to JPEG with proper Google Fonts loading and PNG-to-JPEG conversion.

## Details

### Headless Chrome Command
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --disable-gpu \
  --virtual-time-budget=5000 \
  --screenshot=output.png \
  --window-size=1920,1080 \
  file:///path/to/file.html
```

### Critical Flags
- `--virtual-time-budget=5000`: Ensures Google Fonts load before capture (5 seconds virtual time)
- Without this flag, sequential renders may use fallback fonts for early files (font cached by later files)

### HTML Font Loading Protection
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<script>
  document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
  });
</script>
```

### CSS Visibility Toggle
```css
body {
  visibility: hidden; /* Hide until fonts ready */
}

body.fonts-loaded {
  visibility: visible;
}
```

This prevents fallback font flash in screenshots.

### PNG to JPEG Conversion
```bash
sips -s format jpeg -s formatOptions 95 input.png --out output.jpg
```

- Quality: 95% (high quality, reasonable file size)
- Used for video end cards (~520KB per 1920x1080 image)

## Related
- `videos/final-card-{1,2,3}.html` - End card HTML sources
- `videos/end-card-{1,2,3}.jpg` - Rendered outputs
- Pattern: ffmpeg-video-concatenation.md
- Bug: google-fonts-race-condition.md
