# 🦜 lark-helper: Professional AI-Native Toolkit for Lark (Feishu)

`lark-helper` is a specialized **Model Context Protocol (MCP)** server and **Gemini CLI Skill** designed to transform how AI agents interact with Lark (Feishu) data. 

Built on top of the powerful `lark-cli`, it introduces the **"Think in Code"** paradigm, allowing AI to handle massive datasets (Wiki, Docs, Sheets, Bitable) efficiently through local sandboxed processing and FTS5 full-text indexing.

---

## 📋 Prerequisites (Requirements)
Before installing, ensure you have the following:
- **Node.js**: v18.0.0 or higher.
- **lark-cli**: Installed globally and authenticated.
  ```bash
  npm install -g @lark-opdev/lark-cli
  lark-cli auth login
  ```
- **Git**: For cloning the repository.
- **Supported AI Platforms**: Gemini CLI, Claude Code, or any MCP-compliant client.

---

## 🚀 Installation

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/tndhuy/lark-helper.git
cd lark-helper
npm install
```

### 2. Automatic Configuration
Run the unified installer to build the project and register it with your AI environment:
```bash
npm run setup
```
This command will:
- Compile TypeScript to JavaScript.
- Automatically register the MCP server with **Claude Desktop**.
- Provide workspace-specific rules for **Gemini CLI**.

---

## 💡 Usage

### For Gemini CLI
To enable professional "Context-Mode" and sandboxing:
1. Copy `.gemini/rules/lark-helper.md` to your project's `.gemini/rules/` directory.
2. Update your `GEMINI.md` instructions:
   ```markdown
   # Lark Helper Integration
   - Always use the tools from this workspace for Lark data.
   - Follow rules in .gemini/rules/lark-helper.md for large datasets.
   ```

### For Claude Code / Claude Desktop
`lark-helper` is a standard MCP server. After setup, restart Claude to access the following tools:
- `lark_execute`: Run Node.js scripts in a sandbox to process large data.
- `lark_search`: Fast full-text search across indexed Wiki nodes.
- `lark_index_wiki`: Recursive indexing for high-performance retrieval.
- `wiki_nodes`, `docs_show`, `base_list`, etc.

---

## 🎯 What You Get

### 1. The "Think in Code" Paradigm
`lark-helper` prevents **Context Flooding** by automatically truncating large JSON outputs (>100KB) and saving them to a local cache. Instead of overwhelming the AI with raw data, it prompts the Agent to write a small script (via `lark_execute`) to process the data locally.

### 2. High-Performance Knowledge Base
- **Local Indexing**: Convert thousands of Lark Wiki nodes into a local SQLite FTS5 database.
- **Instant Search**: Retrieve relevant information across your entire workspace in milliseconds.

### 3. Secure Sandboxed Execution
A safe Node.js environment where the AI can:
- Filter and aggregate large Bitables (Base).
- Summarize multiple long documents simultaneously.
- Extract specific insights from complex Wiki structures.

### 4. Zero-Config Deployment
A unified installer that detects your OS and AI platform, ensuring you are ready to work in seconds.

---

## 🏗 Project Structure
- `src/server.ts`: Core MCP server implementation.
- `src/sandbox/`: Secure execution environment logic.
- `src/store/`: FTS5 indexing and SQLite management.
- `src/hooks/`: Pre/Post tool hooks for Gemini CLI.
- `docs/THINK-IN-CODE.md`: Detailed guide on the processing philosophy.

---

## 📜 License
ISC License. Built for the modern AI-native developer ecosystem.
