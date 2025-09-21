---
description: "Properly end a development session by updating documentation and optionally running quality checks and git operations. Accepts free-form notes for additional context."
allowed-tools: ["Read", "Edit", "MultiEdit", "Bash", "TodoWrite"]
---

# End Development Session

Help me properly end this development session by following these steps.

**Usage**: `/end-session [additional notes for history or next session priorities]`

**Examples**: 
- `/end-session`
- `/end-session Remember to fix authentication bug in next session`
- `/end-session Add component export feature to priorities`

## 1. Update Development Documentation

**Dual Documentation Strategy**:

### A. Add Completed Work to DEVELOPMENT_HISTORY.md
Add a new `## ` section **after the main title and description, but before any existing development sections** with:
- Session date (today's date)  
- List of files created/modified
- List of completed tasks with ✅ checkmarks
- Key technical improvements and features delivered
- Any important implementation notes

**Format**: Insert after line 4 (after description paragraph) so new sessions appear first chronologically

### B. Update Next Session Priorities in Root CLAUDE.md
1. **Review current priorities**: Read "Next Development Session Priorities" in root CLAUDE.md
2. **Update based on session**: 
   - Remove or update completed priorities
   - Add any new tasks discovered during this session
   - Incorporate any user-provided notes from the command
   - **Limit to 1-3 focused goals maximum**
3. **Maintenance**: Remove outdated or irrelevant priorities to keep the list actionable

## 2. Code Quality Check (Optional)

Ask me: **"Would you like me to run code quality checks (tests and linting) before ending the session?"**

If I say yes:
- Run `yarn test` from the back directory
- Run `npx eslint .` from the back directory  
- Report any critical issues found
- Offer to fix any simple linting errors

## 3. Git Operations (Optional)

Ask me: **"Would you like me to commit and push the changes to GitHub?"**

If I say yes:
- Check git status to see what files have changed
- Create a meaningful commit message summarizing the session's work
- Commit the changes with the message
- Push to the remote repository

## 4. Session Summary

Provide a brief summary of:
- What was accomplished in this session
- Current status of the project
- What should be prioritized in the next session (referencing updated root CLAUDE.md priorities)
- Any user-provided notes that were incorporated

**Important**: Always follow ALL ESLint rules configured in the project when making any file changes during this process.

Execute these steps in order and wait for my responses before proceeding to optional steps.