# Image White Removal Pattern

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** image-processing, pillow, patterns, logo, transparent-backgrounds

## Summary
Technique for removing white backgrounds from logo PNGs using Python Pillow while preserving yellow outlines and colored anti-aliased edges.

## Details

### Installation (macOS PEP 668 workaround)
```bash
python3 -m pip install --break-system-packages Pillow
```

### Conservative White Removal
**Rule:** Only remove pixels where ALL RGB channels > 248
- Preserves all yellow/cream tones
- Avoids removing legitimate content edges

```python
mask = (r > 248) & (g > 248) & (b > 248)
alpha[mask] = 0
```

### Off-White Fringe Removal
**Rule:** `min(R,G,B) > 230 AND saturation < 30`
- Catches near-white halos around content
- Uses HSV color space to measure saturation

```python
hsv = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2HSV)
saturation = hsv[:,:,1]
min_channel = np.min(rgb_image, axis=2)
fringe_mask = (min_channel > 230) & (saturation < 30)
alpha[fringe_mask] = 0
```

### Icon/Text Separation for Stacked Logos
1. Find row with minimum pixel density in middle third of content area
2. Split image at that row
3. Watch for decorative elements (stars, swirls) between icon and text
4. Erase them from text crop using column-range masking

### Anti-Patterns
**DO NOT use scipy binary_erosion** — Too aggressive, removes legitimate content edges (Drew rolled this back)

### Pre-Processing Check
Always analyze alpha channel first — many AI-generated images already have partial transparency

## Related
- `.claude/memory/context/logo-files.md` (logo inventory)
- Python Pillow library
- HSV color space analysis
