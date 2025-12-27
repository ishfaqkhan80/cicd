import express, { Request, Response } from 'express';
import { initializeDatabase } from './db/database.js';
import { booksRouter } from './routes/books.js';

// Initialize database
initializeDatabase();

export const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Books API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      books: '/api/books'
    }
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api/books', booksRouter);
