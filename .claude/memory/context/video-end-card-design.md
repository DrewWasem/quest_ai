# Video End Card Design

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** video, end-card, layout, design, hackathon

## Summary
Layout specifications and file inventory for the hackathon submission video end cards.

## Design Specifications

### Layout System
- **Positioning:** Absolute (NOT grid - grid caused crowding)
- **Background:** `videos/Screenshot 2026-02-16 at 12.36.25 PM.png` (village overview, blue sky border)
- **Resolution:** 1920x1080 (matches source video)

### Left Column - Stats
- **Position:** `left: 180px`, vertically centered
- **Typography:**
  - Numbers: Fredoka 32px, purple (#7C3AED)
  - Labels: Nunito 18px, dark text (#1E1337)
- **Content:**
  - 7,686 lines (vignette code)
  - 27 characters
  - 1,686 props
  - 139 animations
  - 665 sounds

### Right Column - Photo + Text
- **Position:** `right: 60px`, vertically centered
- **Photo:** 340px width, rounded corners
- **Typography:**
  - Name: Fredoka 34px
  - Hackathon line: Nunito 24px, purple (#7C3AED)
- **Content:**
  - "Built by Drew"
  - "Claude Code Hackathon 2026"

## File Inventory

### Source Files
- `videos/final-card-1.html` - End card with drew-photo-1.jpg
- `videos/final-card-2.html` - End card with drew-photo-2.jpg
- `videos/final-card-3.html` - End card with drew-photo-3.jpg

### Output Files
- `videos/end-card-1.jpg` - 1920x1080, 95% quality, ~520KB
- `videos/end-card-2.jpg` - 1920x1080, 95% quality, ~520KB
- `videos/end-card-3.jpg` - 1920x1080, 95% quality, ~520KB

### Family Photos
- `videos/drew-photo-1.jpg` - Photo variant 1
- `videos/drew-photo-2.jpg` - Photo variant 2
- `videos/drew-photo-3.jpg` - Photo variant 3

### Background
- `videos/Screenshot 2026-02-16 at 12.36.25 PM.png` - Village world screenshot

## Video Assembly
- **Original demo:** ~2:35
- **Card 1 duration:** 7 seconds
- **Card 2 duration:** 6 seconds
- **Card 3 duration:** 6 seconds
- **Total runtime:** ~3:00
- **Output:** `videos/QuestAI_Combined_WithCards.mp4`

## Design Decisions
1. **Absolute positioning over grid:** Grid caused elements to crowd together
2. **Left column offset (180px):** Provides breathing room from edge
3. **Three photo variants:** Allows choosing best shot without re-rendering
4. **Descending card duration:** 7s → 6s → 6s creates natural pacing

## Related
- Pattern: html-to-jpeg-rendering.md
- Pattern: ffmpeg-video-concatenation.md
- Bug: google-fonts-race-condition.md
