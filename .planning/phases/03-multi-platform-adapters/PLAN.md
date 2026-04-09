# Phase 3: Multi-Platform Adapters Implementation Plan

## Goal
Ensure `lark-helper` tools are automatically discovered and correctly used by different AI platforms (Gemini CLI, Claude Code, Antigravity, and Codex).

## Success Criteria
- [ ] Gemini CLI can automatically trigger "Context-Mode" for large Lark outputs using `PreToolUse` hooks.
- [ ] Claude Code can discover and use `lark-helper` tools via standard MCP configuration.
- [ ] Codex and Antigravity can understand the capabilities of `lark-helper` through standardized `SKILL.md` and rules.

## Wave 1: Gemini CLI Integration (ADAP-01)
### Objective: Professional integration with Gemini's hook system.
1. **Create `src/hooks/index.ts`**: 
   - Export standard hook definitions for Gemini CLI.
   - Implement `PreToolUse` to handle large data truncation and suggest `lark_execute`.
2. **Create `.gemini/rules/lark-helper.md`**:
   - Define rules for when to use `lark_search` vs `lark_execute`.
   - Set up the "Think in Code" persona for Lark data processing.

## Wave 2: Claude Code & MCP Standardization (ADAP-02)
### Objective: Ensure seamless discovery in Claude and other MCP clients.
1. **Create `scripts/setup-mcp.js`**:
   - A utility script to register `lark-helper` in `claude_desktop_config.json`.
   - Handle environment variable validation (Lark CLI paths).
2. **Update `package.json`**:
   - Add a `setup` script to run the MCP configuration utility.

## Wave 3: Platform Compatibility (ADAP-03)
### Objective: Universal rules for Codex and Antigravity.
1. **Create `SKILL.md`**:
   - Follow the standardized Skill format for modern agents.
   - Define triggers: "search lark", "analyze wiki", "process lark data".
2. **Create `REFERENCES.md`**:
   - Map `lark-cli` concepts to AI-friendly descriptions.

## Wave 4: Integration & Verification (03-01)
1. **Build verification**: Ensure project compiles.
2. **Manual verification**: Test tools in Gemini CLI and Claude Code (if possible).
3. **Update STATE.md & ROADMAP.md**.
