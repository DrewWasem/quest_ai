#!/bin/bash
# PostToolUse hook — runs after Edit/Write completes
# Quick typecheck to catch TS errors immediately
# Only checks .ts/.tsx files in frontend/src/

INPUT=$(cat)

# Extract the file path from the tool input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty' 2>/dev/null)

# Only typecheck frontend TypeScript files
if [ -z "$FILE_PATH" ]; then
    echo '{}'
    exit 0
fi

case "$FILE_PATH" in
    */frontend/src/*.ts|*/frontend/src/*.tsx)
        ;;
    *)
        echo '{}'
        exit 0
        ;;
esac

# Run tsc --noEmit (fast, no output files)
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}/frontend" 2>/dev/null || exit 0
ERRORS=$(npx tsc --noEmit --pretty 2>&1 | grep -c "error TS" 2>/dev/null || echo "0")

if [ "$ERRORS" -gt 0 ]; then
    # Show last 8 lines of errors
    TSC_OUTPUT=$(npx tsc --noEmit --pretty 2>&1 | tail -8)
    echo "{\"decision\":\"allow\",\"reason\":\"TypeScript: $ERRORS error(s) detected after edit:\\n$TSC_OUTPUT\"}"
else
    echo '{}'
fi

exit 0
