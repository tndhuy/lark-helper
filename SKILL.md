---
name: lark-helper
description: Cooperate with lark-cli to manage Lark/Feishu resources, specifically for synchronizing project documentation to Wiki. Use when the user needs to sync local Markdown files, manage Wiki nodes, or interact with Lark APIs.
---

# Lark Helper Skill

This skill provides specialized workflows for using the `lark-cli` to synchronize local project documentation with Lark Wiki.

## Prerequisites
- `lark-cli` must be installed and configured.
- User/Bot must have **Admin** or **Editor** permission on the target Wiki Space.

## Project Documentation Sync

### Happyland Project Structure
Follow this standard hierarchy under the `[Internal Docs Sync]` node:
- `Project Name`
  - `Overview` (README.md)
  - `Engineering & Architecture` (.planning/codebase/*.md)
  - `Technical Specification` (docs/*.md)

### Key Commands
- **List Spaces**: `lark-cli wiki spaces list --as user`
- **List Nodes**: `lark-cli wiki nodes list --as user --params '{"space_id": "<SPACE_ID>"}'`
- **Create Document/Wiki Node**:
  ```bash
  lark-cli docs +create --title "<TITLE>" --markdown "$(cat <FILE_PATH>)" --wiki-node <PARENT_NODE_TOKEN> --as user
  ```

## Advanced Usage
- **Search**: `lark-cli docs +search --query "<KEYWORD>" --as user`
- **Raw API**: Use `lark-cli api <METHOD> <PATH>` for direct access to Lark Open Platform.

## Error Handling
- **131006 (Permission Denied)**: Verify that the user token used has collaborator access to the specific Space/Node.
- **Link Warnings**: Local relative links (`./docs/`) in Markdown will not work on Lark Wiki and will be displayed as plain text.
