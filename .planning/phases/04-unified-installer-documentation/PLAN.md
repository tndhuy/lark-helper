# Phase 4: Unified Installer & Documentation Implementation Plan

## Goal
Create a seamless, one-command installation experience and professional documentation for `lark-helper` across all supported platforms.

## Success Criteria
- [ ] Users can install and configure the entire toolkit with a single command: `npx lark-helper install`.
- [ ] Installer automatically detects the OS (macOS/Windows) and AI platforms (Gemini/Claude).
- [ ] Documentation provides a "Getting Started" guide and "Advanced Usage" (Think in Code) examples.

## Wave 1: Unified Installer (INST-01, INST-02)
### Objective: Automate everything.
1. **Create `src/cli/installer.ts`**:
   - Platform detection (OS, shell, active AI CLIs).
   - Check and prompt for `lark-cli` installation.
   - Run `scripts/setup-mcp.js` automatically.
   - Set up `.gemini/rules` and hooks in the user's workspace.
2. **Update `package.json`**:
   - Add `lark-helper` as a CLI command that triggers the installer when called with `install`.

## Wave 2: Professional Documentation (DOCS-01)
### Objective: Educate users and AI agents.
1. **Update `README.md`**:
   - Add "One-liner" installation instructions.
   - Add a "Platform Support" table.
   - Include a "Quick Start" guide for Gemini CLI and Claude Code.
2. **Create `docs/THINK-IN-CODE.md`**:
   - Explain the philosophy of local data processing vs. context flooding.
   - Provide copy-pasteable script examples for `lark_execute`.

## Wave 3: Final Polishing & Verification (04-01)
### Objective: Ship a production-ready tool.
1. **Build check**: Ensure the installer and all new docs are correctly bundled.
2. **Smoke Test**: Run the installer in a clean environment (simulated).
3. **Update STATE.md & ROADMAP.md** to 100% completion.
