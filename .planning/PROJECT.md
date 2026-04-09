# PROJECT: lark-helper Context-Mode Expansion

## Overview
Transform `lark-helper` into a professional, AI-native agent by adopting the `context-mode` architecture. This includes sandboxed execution for data processing, FTS5 indexing for large Wiki/Doc search, and automated system hooks for better reliability.

## Core Goals
1. **AI-Native Architecture**: Move from simple CLI wrapping to a hybrid model (Skill + MCP Server + Hooks).
2. **Context Efficiency**: Implement sandboxing and indexing to handle large Lark datasets without flooding the context window.
3. **Professionalism**: Prepare the tool for wider usage (internal team and potential open-source) with better error handling and automated setup.
4. **Think in Code**: Enable the agent to write and run scripts to process Lark data directly.

## Tech Stack
- **Languages**: TypeScript/Node.js (Core), Shell (CLI interaction).
- **Storage**: SQLite FTS5 (for indexing Lark documents).
- **Execution**: Sandboxed subprocesses (similar to `ctx_execute`).
- **Lark Integration**: `lark-cli` (Official Lark/Feishu CLI).
- **Framework**: Model Context Protocol (MCP) for tool definitions.

## Project Structure (Target)
- `src/`: Core TypeScript source code.
- `src/server.ts`: MCP Server implementation.
- `src/sandbox/`: Sandboxed execution logic.
- `src/store/`: FTS5 indexing and retrieval logic.
- `hooks/`: System hooks for Gemini CLI integration.
- `SKILL.md`: Updated AI agent instructions.

## Initial Seed
- Based on SEED-001: Mở rộng lark-helper với mô hình Context-Mode (Sandbox, FTS5).
