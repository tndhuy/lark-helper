# Phase 2: Context-Mode Logic Implementation Plan

## Goal
Implement "Think in Code" (Sandbox) and "Knowledge Base" (FTS5) patterns for lark-helper to handle large Lark datasets efficiently.

## Success Criteria
- [ ] Large CLI outputs (>100KB) are automatically truncated and saved to a local file.
- [ ] `lark_execute` can run a Node.js script to process Lark data in a sandbox.
- [ ] `lark_index_wiki` can recursively fetch and index Lark Wiki nodes into SQLite FTS5.
- [ ] `lark_search` returns fast, relevant results from the local FTS5 database.

## Wave 1: Smart Truncation & Sandbox (02-01)
### Objective: Implement the "Think in Code" pattern.
1. **Update src/executor.ts**:
   - Detect output size > 100KB.
   - If large, write content to `~/.lark-helper/cache/large_output_[timestamp].json`.
   - Return a summary: `{"status": "truncated", "path": "...", "size_bytes": 123456}`.
2. **Create src/sandbox/executor.ts**:
   - Use `execa` to run temporary JS scripts.
   - Implement `lark_execute` tool: Accepts `script_code` (JS) and optional `input_data`.
3. **Register lark_execute** in `src/server.ts`.

## Wave 2: FTS5 Knowledge Base (02-02)
### Objective: Implement local document indexing.
1. **Install dependencies**: `npm install better-sqlite3`.
2. **Create src/store/db.ts**: Initialize SQLite with FTS5 virtual table.
3. **Create src/store/indexer.ts**: 
   - Recursive fetcher for Wiki nodes (`wiki +nodes`).
   - Content fetcher for Docs/Sheets.
   - Indexer logic to insert/update FTS5 records.
4. **Implement tools** in `src/tools/kb.ts`:
   - `lark_index_wiki`: Triggers recursive indexing of a specific space.
   - `lark_search`: Performs full-text search using `MATCH`.
5. **Register KB tools** in `src/server.ts`.

## Wave 3: Integration & Verification (02-03)
1. **Build verification**: Ensure project compiles with new dependencies.
2. **Performance check**: Index a small Wiki space and verify search speed.
3. **Sandbox isolation check**: Ensure `lark_execute` can't access unauthorized system files.
4. **Update STATE.md**.
