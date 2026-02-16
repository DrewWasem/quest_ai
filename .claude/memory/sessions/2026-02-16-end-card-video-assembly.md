# End Card Video Assembly

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** session, video, end-card, rendering, ffmpeg, chrome, hackathon

## Summary
Created 3 end card images for the hackathon submission video. Designed HTML layouts with village background + stats on left + family photo on right. Fixed Google Fonts rendering race condition in headless Chrome. Rendered to JPEG. Assembled final video with FFmpeg concatenation.

## Work Completed

### 1. End Card Design
- Created 3 HTML end card variants with different family photos
- Layout: village background + left stats column + right photo column
- Switched from CSS grid to absolute positioning (grid caused crowding)
- Left column positioned at 180px from edge for breathing room
- Typography: Fredoka 32px for numbers, Nunito 18px for labels

### 2. Rendering Pipeline
- Discovered Google Fonts race condition in headless Chrome
- First renders showed fallback fonts, later renders (with cached fonts) worked
- Implemented fix: `--virtual-time-budget=5000` + `document.fonts.ready` + CSS visibility toggle
- Added preconnect hints for faster font loading
- Rendered all 3 cards to PNG, converted to JPEG at 95% quality (~520KB each)

### 3. Video Assembly
- Created video clips from each JPEG (7s, 6s, 6s durations)
- Used FFmpeg concat demuxer with absolute paths
- Assembled final video: original demo + 3 end cards
- Output: `QuestAI_Combined_WithCards.mp4` (~3:00 total)

## Key Outcomes
- 3 JPEG end cards ready for video (1920x1080, 95% quality)
- Final hackathon submission video rebuilt with end cards
- Reproducible rendering pipeline documented

## Technical Decisions
1. **Absolute positioning over grid:** Grid caused crowding, absolute gives fine control
2. **Virtual time budget:** Essential for consistent Google Fonts loading
3. **Three photo variants:** Flexibility to choose best shot without re-rendering
4. **JPEG at 95%:** Balance between quality and file size for video concatenation

## Files Created/Modified
- `videos/final-card-{1,2,3}.html` - HTML source files
- `videos/end-card-{1,2,3}.jpg` - Rendered JPEG outputs
- `videos/QuestAI_Combined_WithCards.mp4` - Final assembled video

## Patterns Documented
- HTML to JPEG rendering with headless Chrome
- FFmpeg video concatenation with image cards
- Google Fonts race condition fix

## Related Sessions
- 2026-02-16-demo-runner-and-logos.md (earlier video work)
- 2026-02-16-vignette-timing-fixes.md (demo content fixes)
