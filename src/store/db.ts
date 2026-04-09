import DatabaseConstructor, { Database } from "better-sqlite3";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";

const DB_DIR = path.join(os.homedir(), ".lark-helper", "db");
const DB_PATH = path.join(DB_DIR, "knowledge_base.sqlite");

/**
 * Initializes the Knowledge Base SQLite database with FTS5.
 */
export function initDB(): Database {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new DatabaseConstructor(DB_PATH);
  
  // Create FTS5 virtual table for full-text search
  // content_id: Lark token/ID
  // type: 'wiki', 'doc', 'sheet', etc.
  // title: Document title
  // content: Plain text content or snippet
  // metadata: JSON string for extra info (URL, Space ID, etc.)
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS kb_documents USING fts5(
      content_id UNINDEXED,
      type UNINDEXED,
      title,
      content,
      metadata UNINDEXED,
      tokenize='unicode61'
    );
  `);

  return db;
}

export const db: Database = initDB();
