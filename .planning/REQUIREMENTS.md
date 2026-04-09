# Requirements: lark-helper Context-Mode Expansion

**Defined:** 2026-04-08
**Core Value:** Transform `lark-helper` into a professional, AI-native agent with sandboxed execution and high-performance indexing.

## v1 Requirements

Requirements for the initial context-mode release.

### Universal MCP Engine

- [ ] **MCP-01**: Universal TypeScript MCP server wrapping `lark-cli`.
- [ ] **MCP-02**: Tool definitions for all `lark-cli` operations (list, read, search, base, etc.).
- [ ] **MCP-03**: Graceful handling of Lark API rate limits and retries.
- [ ] **MCP-04**: Support for interactive OAuth flow within `lark-cli` through MCP.

### Context-Mode Logic

- [ ] **SAND-01**: Implement `lark_execute` tool for sandboxed data processing scripts.
- [ ] **SAND-02**: Provide a local execution environment for `lark_execute` with `lark-cli` access.
- [ ] **FTS5-01**: SQLite-based FTS5 indexer for Lark documents (Wiki/Docs/Base).
- [ ] **FTS5-02**: `lark_index` and `lark_search` tools for local fast retrieval.

### Multi-Platform Adapters

- [ ] **ADAP-01**: `PreToolUse` hooks and system instructions for Gemini CLI integration.
- [ ] **ADAP-02**: Automated configuration for Claude Code (`claude-code.settings.json`).
- [ ] **ADAP-03**: Compatibility rules for Antigravity and Codex platforms.

### Unified Installer & Documentation

- [ ] **INST-01**: Unified installer script `lark-helper install` for all platforms.
- [ ] **INST-02**: Platform auto-detection for shell, OS, and AI environment setup.
- [ ] **DOCS-01**: Comprehensive documentation with "Think in Code" usage examples.

## v2 Requirements

Deferred to future release.

- **SYNC-01**: Background synchronization of Lark documents to local FTS5 index.
- **TEAM-01**: Multi-user support and shared team indices.
- **UI-01**: Web dashboard for managing local indices and sandbox runs.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Direct API integration | We use `lark-cli` as the primary interface to reduce maintenance overhead. |
| Non-sandboxed execution | Security risk; all processing must happen in a controlled environment. |
| Global public hosting | This is designed as a local-first tool for individual developers/teams. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MCP-01 | Phase 1 | Pending |
| MCP-02 | Phase 1 | Pending |
| MCP-03 | Phase 1 | Pending |
| MCP-04 | Phase 1 | Pending |
| SAND-01 | Phase 2 | Pending |
| SAND-02 | Phase 2 | Pending |
| FTS5-01 | Phase 2 | Pending |
| FTS5-02 | Phase 2 | Pending |
| ADAP-01 | Phase 3 | Pending |
| ADAP-02 | Phase 3 | Pending |
| ADAP-03 | Phase 3 | Pending |
| INST-01 | Phase 4 | Pending |
| INST-02 | Phase 4 | Pending |
| DOCS-01 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-08*
*Last updated: 2026-04-08 after research summary*
