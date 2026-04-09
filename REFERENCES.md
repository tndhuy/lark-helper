# References: lark-helper

This document provides conceptual mapping for the `lark-helper` toolkit and the underlying `lark-cli`.

## Core Concepts

### Wiki Spaces vs. Documents
- **Wiki Space**: A top-level container for related knowledge. Similar to a Notion workspace. Identified by a `spaceId`.
- **Node**: An entry within a Wiki Space. It can be a Document, a Sheet, a Mindnote, or a Shortcut to another file.
- **Document (Doc)**: A rich-text page within Lark. Identified by a `token`.

### Bitable (Base)
- **Base (Bitable)**: A low-code database within Lark (like Airtable).
- **Table**: A specific sheet within a Base.
- **Record**: A row within a Table.
- **Field**: A column within a Table.

### The Sandbox (Context-Mode)
- **Cache Directory**: `~/.lark-helper/cache/` - Where large outputs are stored as JSON.
- **lark_execute**: A sandboxed Node.js environment that can access the cache directory to process Lark data.
- **Truncation**: The process of replacing large JSON outputs with a file pointer (`@file:path`) to save context tokens.

## Common Token Formats
- **Space ID**: Usually an integer string (e.g., `7123456789`).
- **Doc Token**: A 27-character alphanumeric string (e.g., `doccnABC123xyz`).
- **Node Token**: A 27-character alphanumeric string used for Wiki nodes.

## Environment Variables
| Variable | Purpose |
|----------|---------|
| `LARK_CLI_PATH` | Path to the `lark-cli` binary. Defaults to `lark-cli`. |
| `LARK_HELPER_CACHE_DIR` | Custom location for the cache directory. |

## Tool Mapping (Helper vs CLI)

| Helper Tool | CLI Command Equivalent |
|-------------|-------------------------|
| `lark_index_wiki` | `lark wiki +nodes --recursive` |
| `lark_search` | Custom SQLite query on indexed data |
| `docs_show` | `lark docs show --token TOKEN` |
| `auth_login` | `lark-cli auth login` |
