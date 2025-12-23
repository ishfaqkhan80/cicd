import express, { Request, Response } from 'express';
import { initializeDatabase } from './db/database.js';
import { booksRouter } from './routes/books.js';

// Initialize database
initializeDatabase();

export const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api/books', booksRouter);
