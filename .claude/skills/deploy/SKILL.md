---
name: deploy
description: Build and deploy to Vercel. Use when the user says /deploy or asks to deploy.
disable-model-invocation: true
---

# Deploy to Vercel

Run these steps in order. Stop and report if any step fails.

1. **Build**: Run `cd ${CLAUDE_PROJECT_DIR}/frontend && npm run build`
2. **Verify**: Confirm build succeeds with 0 errors and report the bundle size
3. **Deploy**: Run `cd ${CLAUDE_PROJECT_DIR}/frontend && vercel --prod`
4. **Report**: Show the deployment URL to the user

If the build fails, show the errors and do NOT proceed to deploy.
