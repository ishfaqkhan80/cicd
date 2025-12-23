import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database file path (relative to project root)
const dbPath = process.env.NODE_ENV === 'test'
  ? ':memory:'  // In-memory database for tests
  : path.join(__dirname, '../../data/books.db');

// Create database connection
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize schema
export function initializeDatabase() {
  const schema = `
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `;

  db.exec(schema);
}
