#!/bin/bash
# SessionEnd hook — logs session end timestamp
# Lightweight: just appends a line to the session log

MEMORY_DIR="${CLAUDE_PROJECT_DIR:-.}/.claude/memory"
LOG_FILE="$MEMORY_DIR/sessions/.session-log"

mkdir -p "$(dirname "$LOG_FILE")"

TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)

# Get git state snapshot
BRANCH=""
UNCOMMITTED=""
if [ -d "${CLAUDE_PROJECT_DIR:-.}/.git" ]; then
    BRANCH=$(cd "${CLAUDE_PROJECT_DIR:-.}" && git branch --show-current 2>/dev/null)
    UNCOMMITTED=$(cd "${CLAUDE_PROJECT_DIR:-.}" && git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
fi

echo "[$TIMESTAMP] Session ended | branch=$BRANCH | uncommitted=$UNCOMMITTED" >> "$LOG_FILE"

exit 0
