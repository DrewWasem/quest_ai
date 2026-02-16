# FFmpeg Video Concatenation with Image Cards

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Source:** session
**Confidence:** high
**Tags:** ffmpeg, video, rendering, concatenation

## Summary
FFmpeg pattern for creating video clips from static images and concatenating multiple clips with matching properties.

## Details

### Create Video Clip from Static Image
```bash
ffmpeg -y \
  -loop 1 \
  -i img.jpg \
  -c:v libx264 \
  -t DURATION \
  -pix_fmt yuv420p \
  -r 30 \
  -vf "scale=1920:1080" \
  output.mp4
```

- `-loop 1`: Loop the image
- `-t DURATION`: Clip duration in seconds
- `-r 30`: Frame rate (match source video)
- `-pix_fmt yuv420p`: Pixel format for compatibility
- `scale=1920:1080`: Match source video resolution

### Concatenate Multiple Clips

1. Create a text file (`list.txt`) with absolute paths:
```
file '/absolute/path/to/clip1.mp4'
file '/absolute/path/to/clip2.mp4'
file '/absolute/path/to/clip3.mp4'
```

2. Concatenate:
```bash
ffmpeg -y \
  -f concat \
  -safe 0 \
  -i list.txt \
  -c:v libx264 \
  -crf 18 \
  -preset medium \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 192k \
  output.mp4
```

### Important Notes
- **MUST use absolute paths** in concat file (relative paths resolve from the file's directory, not working directory)
- Match source video properties: resolution, frame rate, pixel format
- `-crf 18`: High quality (lower = better, 18 = visually lossless)
- `-preset medium`: Balance between encoding speed and compression

### Example Usage
Created for Quest AI hackathon submission video:
- Original demo video (~2:35)
- End card 1 (7s): Stats + photo variant 1
- End card 2 (6s): Stats + photo variant 2
- End card 3 (6s): Stats + photo variant 3
- Final output: `QuestAI_Combined_WithCards.mp4` (~3:00)

## Related
- `videos/QuestAI_Combined_WithCards.mp4` - Final assembled video
- `videos/end-card-{1,2,3}.jpg` - Source images for cards
- Pattern: html-to-jpeg-rendering.md
