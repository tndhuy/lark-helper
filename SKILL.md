# Skill: lark-helper

A professional AI-native toolkit for managing and processing Lark (Feishu) data. Designed for context efficiency with built-in sandboxed execution and high-performance indexing.

## Triggers

- "Search Lark Wiki/Docs for X"
- "Analyze this large sheet from Lark"
- "Process Lark documentation"
- "Index Lark knowledge base"
- "Run a script on Lark data"

## Tools Overview

| Tool | Purpose | Context Mode |
|------|---------|--------------|
| `lark_execute` | Runs a Node.js script in a sandbox to process Lark data. | **Primary** (for large datasets) |
| `lark_search` | Performs fast full-text search across indexed Lark content. | **Knowledge Base** |
| `lark_index_wiki` | Recursively indexes a Lark Wiki space into a local SQLite database. | **Maintenance** |
| `auth_login` | Authenticates the `lark-cli` with your account. | **Setup** |
| `docs_show` | Retrieves the content of a specific Lark document. | **Retrieval** |

## Best Practices (Thinking in Code)

1. **Efficiency First**: When a tool returns a `@file:` pointer, do not try to read it. Always use `lark_execute`.
2. **Local Processing**: Prefer writing a small script to filter data locally rather than fetching thousands of rows into the chat context.
3. **Knowledge First**: Use `lark_search` to find relevant documents before requesting their full content.

## Example Workflow: Analyzing a Large Wiki Space

1. **Discovery**: `lark_index_wiki({ spaceId: "ABC" })` to build the local index.
2. **Search**: `lark_search({ query: "Project Roadmap" })` to find relevant nodes.
3. **Analysis**: If a node's content is too large, use `lark_execute` to extract key milestones.

```javascript
// Example lark_execute script
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('~/.lark-helper/cache/node_content.json', 'utf8'));
const milestones = data.content.filter(line => line.includes('Milestone'));
console.log(JSON.stringify(milestones, null, 2));
```

## Security

- All scripts run via `lark_execute` are sandboxed.
- No user credentials are logged or shared.
