# Logo Files Inventory

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** logo, assets, branding, quest-ai, transparent-backgrounds

## Summary
Multiple logo variants exist after processing session. All processed versions have transparent backgrounds.

## Details

### File Inventory

**`QuestAI Logo.png`**
- Stacked layout (icon above text)
- Tight-cropped
- Transparent background
- Dimensions: 907×624

**`QuestAI Logo long.png`**
- Original source file
- Stacked layout with white background
- Dimensions: 1408×768

**`questai-logo.png`**
- Horizontal layout (icon left of text)
- Transparent background
- Dimensions: 1552×317

**`frontend/public/assets/questai-logo.png`**
- Copy of horizontal version
- **Used by the app**
- Transparent background

**`Gemini_Generated_Image_h9ypv8h9ypv8h9yp.png`**
- Alternate horizontal logo from Google Gemini
- Transparent background
- Dimensions: 1301×350
- Original preserved at `~/Downloads/Gemini_Generated_Image_h9ypv8h9ypv8h9yp.png`

### Processing Notes
- All transparent backgrounds created using Python Pillow
- Conservative white removal (RGB > 248) preserves yellow outlines
- Icon-left-of-text layout created by splitting and rearranging stacked originals

## Related
- `frontend/public/assets/questai-logo.png` (active app logo)
- `.claude/memory/patterns/image-white-removal.md` (processing technique)
