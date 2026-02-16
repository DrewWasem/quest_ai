#!/bin/bash
# retime-video.sh — Change playback speed of a video, optionally add music.
#
# Usage:
#   ./scripts/retime-video.sh <input> <recorded_speed> <target_speed> [--music] [output]
#
# Examples:
#   ./scripts/retime-video.sh videos/slow.mov 0.3 0.9
#   ./scripts/retime-video.sh videos/slow.mov 0.3 0.9 --music
#   ./scripts/retime-video.sh videos/slow.mov 0.3 1.0 --music videos/final.mov

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ISLAND_MUSIC="${SCRIPT_DIR}/frontend/public/assets/audio/music/Island-Adventure.ogg"

if [ $# -lt 3 ]; then
  echo "Usage: $0 <input> <recorded_speed> <target_speed> [--music] [output]"
  echo ""
  echo "  input           Path to source video"
  echo "  recorded_speed  Speed the content was recorded at (e.g. 0.3)"
  echo "  target_speed    Desired playback speed (e.g. 0.9, 1.0)"
  echo "  --music         Add Island-Adventure background music with fade in/out"
  echo "  output          Optional output path (default: auto-named)"
  exit 1
fi

INPUT="$1"
RECORDED="$2"
TARGET="$3"
shift 3

ADD_MUSIC=false
OUTPUT=""

while [ $# -gt 0 ]; do
  case "$1" in
    --music) ADD_MUSIC=true; shift ;;
    *) OUTPUT="$1"; shift ;;
  esac
done

if [ ! -f "$INPUT" ]; then
  echo "Error: Input file not found: $INPUT"
  exit 1
fi

# Auto-generate output name if not provided
if [ -z "$OUTPUT" ]; then
  DIR=$(dirname "$INPUT")
  BASE=$(basename "$INPUT" .mov)
  SUFFIX="${TARGET}x"
  if $ADD_MUSIC; then SUFFIX="${SUFFIX}_music"; fi
  OUTPUT="${DIR}/${BASE}_${SUFFIX}.mov"
fi

# Calculate setpts factor: recorded/target
FACTOR=$(python3 -c "print(${RECORDED}/${TARGET})")
SPEEDUP=$(python3 -c "print(${TARGET}/${RECORDED})")

echo "=========================================="
echo "  Retime Video"
echo "=========================================="
echo "  Input:     $INPUT"
echo "  Output:    $OUTPUT"
echo "  Recorded:  ${RECORDED}x"
echo "  Target:    ${TARGET}x"
echo "  Speedup:   ${SPEEDUP}x"
echo "  PTS factor: ${FACTOR}"
echo "  Music:     $ADD_MUSIC"
echo "=========================================="

# Copy to temp file to handle special chars in filename
TMPDIR=$(mktemp -d)
TMPINPUT="${TMPDIR}/input.mov"
cp "$INPUT" "$TMPINPUT"

if $ADD_MUSIC; then
  if [ ! -f "$ISLAND_MUSIC" ]; then
    echo "Error: Music file not found: $ISLAND_MUSIC"
    rm -rf "$TMPDIR"
    exit 1
  fi

  # Step 1: Retime video (no audio)
  TMPVIDEO="${TMPDIR}/retimed.mov"
  ffmpeg -y -i "$TMPINPUT" -vf "setpts=${FACTOR}*PTS" -c:v libx264 -preset fast -crf 18 -an "$TMPVIDEO" 2>&1

  # Get video duration for fade-out timing
  VDURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMPVIDEO" 2>/dev/null)
  FADE_OUT_START=$(python3 -c "print(max(0, ${VDURATION} - 2.0))")

  # Step 2: Mux with music (fade in 1s, fade out 2s at end)
  ffmpeg -y -i "$TMPVIDEO" -i "$ISLAND_MUSIC" \
    -c:v copy -c:a aac -b:a 192k \
    -af "afade=t=in:st=0:d=1,afade=t=out:st=${FADE_OUT_START}:d=2" \
    -shortest "$OUTPUT" 2>&1
else
  ffmpeg -y -i "$TMPINPUT" -vf "setpts=${FACTOR}*PTS" -c:v libx264 -preset fast -crf 18 -an "$OUTPUT" 2>&1
fi

rm -rf "$TMPDIR"

# Show result
INSIZE=$(du -h "$INPUT" | cut -f1)
OUTSIZE=$(du -h "$OUTPUT" | cut -f1)
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUTPUT" 2>/dev/null | cut -d. -f1)

echo ""
echo "=========================================="
echo "  Done!"
echo "  Input:    $INSIZE"
echo "  Output:   $OUTSIZE  (${DURATION}s)"
echo "  File:     $OUTPUT"
echo "=========================================="
