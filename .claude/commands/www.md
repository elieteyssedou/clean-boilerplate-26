---
description: "Quickly get back up to speed on where we left off in the previous development session"
allowed-tools: ["Read", "Bash", "TodoWrite"]
---

# Where Were We - Session Recap

Help me get back up to speed on this **SaaS UI Component Generator Tool** project.

## 1. Review Project Status

Check the organized documentation structure:
- **Root CLAUDE.md** - Project overview, common commands, and next priorities
- **DEVELOPMENT_HISTORY.md** - Use Grep to extract only the first `##` section (latest development work) to understand what was last implemented
- **Architecture docs** - `CLAUDE.md`, `back/CLAUDE.md`, `back/test/CLAUDE.md`, `front/CLAUDE.md`

Extract the latest development section using these steps:
1. First find all `##` header line numbers: `grep -n "^## " DEVELOPMENT_HISTORY.md`
2. Then read from the first header to just before the second header using the Read tool with dynamic offset/limit

Ask me if we want, during the session, to either work on:
- back
- front
- fullstack

When I give you the answer, you will read the corresponding documentation (you won't read what you don't need in the session).

## 2. Current Application State

This is a full-stack TypeScript monorepo with:
- **Backend**: Node.js GraphQL API (port 5100) with AI-powered component generation
- **Frontend**: Next.js app (port 5200) with HeroUI components and ChatGPT-style navigation
- **Features**: Generate React components via AI, component history, syntax highlighting, delete functionality

## 3. Recent Accomplishments

**Last Session (2025-07-19)**:
- ✅ Migrated from NextUI to HeroUI v2.8.1 
- ✅ Added component delete with confirmation dialog
- ✅ Reorganized documentation into focused files
- ✅ Enhanced component generation with post-generation redirect

## 4. Next Development Focus

Based on CLAUDE.md priorities:
1. **Component Preview & Display** - Live preview, syntax highlighting, sandbox testing
2. **Component Management** - Collections, export functionality 
3. **Enhanced AI Features** - Parameters, variations, multi-framework support

**Note**: Development servers should be started manually with `overmind s` when ready to begin development.