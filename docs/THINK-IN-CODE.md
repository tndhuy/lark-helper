# The "Think in Code" Paradigm for Lark Data

## The Problem: Context Flooding
When you request a large Lark Wiki space or a Bitable with thousands of records, the raw JSON output can easily exceed **500KB - 2MB**.
- **Gemini/Claude** will struggle to process this much raw text.
- Token costs increase dramatically.
- Accuracy drops as the AI loses focus on the core request.

## The Solution: Local Sandboxed Processing
`lark-helper` solves this by **Smart Truncation**. Large outputs are saved to your local disk, and the AI is prompted to write a small script to process that data *locally* using `lark_execute`.

---

## How it works

1. **Discovery**: You call `wiki_nodes` or `docs_show`.
2. **Truncation**: If the output is >100KB, `lark-helper` saves it to `~/.lark-helper/cache/hash.json` and returns:
   `⚠️ OUTPUT TRUNCATED (>100KB). Data saved to: /path/to/cache.json`
3. **Execution**: You (the Agent) write a Node.js script to filter, search, or summarize that JSON file.

### Example: Finding specific milestones in a large Wiki Space
**Script for `lark_execute`:**
```javascript
const fs = require('fs');
const path = require('path');

// The AI knows the path from the previous tool output
const dataPath = '/Users/user/.lark-helper/cache/8a7b6c...json';
const rawData = fs.readFileSync(dataPath, 'utf8');
const wikiNodes = JSON.parse(rawData);

// Filter for nodes mentioning 'Milestone'
const milestones = wikiNodes.filter(node => node.title.toLowerCase().includes('milestone'));

// Return only what's necessary
console.log(JSON.stringify(milestones, null, 2));
```

---

## Best Practices for AI Agents

1. **Selective Retrieval**: Never fetch what you don't need. Use `lark_search` first.
2. **Summarize Locally**: If you need to summarize 10 documents, use `lark_execute` to read all 10 files from the cache and return a 1-paragraph summary of each.
3. **Handle Errors**: Always wrap your sandbox code in basic try-catch blocks to provide meaningful feedback.

## Available Libraries in Sandbox
The `lark_execute` sandbox has access to standard Node.js modules:
- `fs`, `path`, `os`, `crypto`
- `util`

*Note: Network access is restricted in the sandbox for security.*
