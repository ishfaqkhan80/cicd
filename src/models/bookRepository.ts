import { db } from '../db/database.js';
import type { Book, CreateBookInput, UpdateBookInput } from './book.js';

export class BookRepository {
  // Get all books
  findAll(): Book[] {
    const stmt = db.prepare('SELECT * FROM books ORDER BY created_at DESC');
    return stmt.all() as Book[];
  }

  // Get book by ID
  findById(id: number): Book | undefined {
    const stmt = db.prepare('SELECT * FROM books WHERE id = ?');
    return stmt.get(id) as Book | undefined;
  }

  // Create new book
  create(input: CreateBookInput): Book {
    const stmt = db.prepare(
      'INSERT INTO books (title, author, year) VALUES (?, ?, ?)'
    );
    const result = stmt.run(input.title, input.author, input.year ?? null);

    const book = this.findById(result.lastInsertRowid as number);
    if (!book) {
      throw new Error('Failed to create book');
    }
    return book;
  }

  // Update book
  update(id: number, input: UpdateBookInput): Book | undefined {
    const book = this.findById(id);
    if (!book) return undefined;

    const updates: string[] = [];
    const values: any[] = [];

    if (input.title !== undefined) {
      updates.push('title = ?');
      values.push(input.title);
    }
    if (input.author !== undefined) {
      updates.push('author = ?');
      values.push(input.author);
    }
    if (input.year !== undefined) {
      updates.push('year = ?');
      values.push(input.year);
    }

    if (updates.length === 0) return book;

    values.push(id);
    const stmt = db.prepare(
      `UPDATE books SET ${updates.join(', ')} WHERE id = ?`
    );
    stmt.run(...values);

    return this.findById(id);
  }

  // Delete book
  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM books WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Clear all books (for testing)
  deleteAll(): void {
    db.prepare('DELETE FROM books').run();
  }
}
