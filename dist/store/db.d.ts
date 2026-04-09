import { Database } from "better-sqlite3";
/**
 * Initializes the Knowledge Base SQLite database with FTS5.
 */
export declare function initDB(): Database;
export declare const db: Database;
