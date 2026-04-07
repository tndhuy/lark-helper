# Lark Helper Skill 🚀

A specialized skill for **Gemini CLI** and **Antigravity** designed to streamline your documentation workflow by synchronizing local Markdown files directly to **Lark (Feishu) Wiki**.

## 🌟 Key Features

- **Wiki Management**: List and explore your Lark Wiki Spaces and Nodes directly from the CLI.
- **Smart Sync**: Create or update Lark Documents/Wiki Nodes using local Markdown content.
- **Project Structure Alignment**: Follows a standard hierarchy (Overview, Engineering, Technical Spec) for consistent internal documentation.
- **Raw API Access**: Provides a bridge to any Lark Open Platform API via `lark-cli`.

## 🛠 Prerequisites

- [lark-cli](https://github.com/larksuite/lark-cli) installed and configured.
- Appropriate permissions (**Admin** or **Editor**) on your target Lark Wiki Space.

## 📦 Installation

To use this skill in your Gemini CLI or Antigravity environment, clone this repository into your agent skills directory:

```bash
mkdir -p ~/.agents/skills/lark-helper
git clone https://github.com/tndhuy/lark-helper.git ~/.agents/skills/lark-helper
```

Then, activate it within your AI session:
`activate_skill(name="lark-helper")`

## 🚀 Usage

### 1. Explore Wiki
```bash
# List all available Wiki Spaces
lark-cli wiki spaces list --as user

# List Nodes within a specific Space
lark-cli wiki nodes list --as user --params '{"space_id": "<SPACE_ID>"}'
```

### 2. Synchronize Documentation
```bash
# Create a new Wiki Node from a local Markdown file
lark-cli docs +create --title "My Doc" --markdown "$(cat README.md)" --wiki-node <PARENT_NODE_TOKEN> --as user
```

### 3. Search & Discovery
```bash
lark-cli docs +search --query "Keyword" --as user
```

## ⚠️ Important Notes

- **Link Handling**: Local relative links (`./docs/`) in Markdown are not supported by Lark Wiki and will be displayed as plain text.
- **Permissions**: Ensure your user token has collaborator access to the target node.

## 🤝 Contributing

This project is part of the [Developer Vault](https://github.com/tndhuy/Developer-Vault) ecosystem. Contributions and suggestions are welcome!

---
Developed by **tndhuy** | Integrated with **Gemini CLI** & **Antigravity**.
