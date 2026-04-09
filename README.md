# 🦜 lark-helper: Professional AI-Native Toolkit for Lark (Feishu)

`lark-helper` is a specialized **Model Context Protocol (MCP)** server and **Gemini CLI Skill** designed to transform how AI agents interact with Lark (Feishu) data. 

Built on top of the powerful `lark-cli`, it introduces the **"Think in Code"** paradigm, allowing AI to handle massive datasets (Wiki, Docs, Bitable) efficiently through local sandboxed processing and FTS5 full-text indexing.

---

## 🚀 Quick Install

### 1. Prerequisites
- [lark-cli](https://github.com/lark-opdev/lark-cli) installed and authenticated (`lark-cli auth login`).
- Node.js 18+ installed.

### 2. Automatic Setup
```bash
git clone https://github.com/tndhuy/lark-helper.git
cd lark-helper
npm install
npm run setup
```
The `setup` command will build the project and automatically register the MCP server with **Claude Desktop**.

---

## 💎 Platform Integration

### Gemini CLI
To enable professional context-mode and sandboxing for Gemini:
1. Copy `.gemini/rules/lark-helper.md` to your project's `.gemini/rules/` directory.
2. Update your `GEMINI.md` to include:
   ```markdown
   # Lark Helper Integration
   - Always use the tools from this workspace.
   - Follow rules in .gemini/rules/lark-helper.md for large datasets.
   ```

### Claude Code / Claude Desktop
`lark-helper` is a standard MCP server. After running `npm run setup`, restart Claude to see the new tools:
- `lark_execute`: Run Node.js scripts in a sandbox.
- `lark_search`: Fast full-text search across indexed Wiki nodes.
- `lark_index_wiki`: Recursive indexing for high-performance retrieval.
- `wiki_nodes`, `docs_show`, `base_list`, and more.

---

## 🏗 The "Think in Code" Paradigm
`lark-helper` prevents **Context Flooding** by automatically truncating large JSON outputs (>100KB) and saving them to a local cache. 

Instead of reading a 2MB JSON file, the AI writes a small script (via `lark_execute`) to process the data locally and only returns the summarized results to the chat.

👉 [Learn more in docs/THINK-IN-CODE.md](./docs/THINK-IN-CODE.md)

---

## 🛠 Features

- **Standardized MCP Server**: Works with Gemini CLI, Claude Code, and all MCP-compliant tools.
- **Smart Truncation**: Automatically saves large outputs to `~/.lark-helper/cache/`.
- **Node.js Sandbox**: Secure local execution environment for data analysis.
- **FTS5 Knowledge Base**: High-performance local search for thousands of Lark documents.
- **Unified Installer**: Auto-configures your environment in seconds.

---

## 📜 License
ISC License. Built with ❤️ for the Lark Developer ecosystem.
