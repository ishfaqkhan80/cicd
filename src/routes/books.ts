import { Router, Request, Response } from 'express';
import { BookRepository } from '../models/bookRepository.js';
import type { CreateBookInput, UpdateBookInput } from '../models/book.js';

export const booksRouter = Router();
const repository = new BookRepository();

// GET /api/books - Get all books
booksRouter.get('/', (req: Request, res: Response) => {
  const books = repository.findAll();
  res.json(books);
});

// GET /api/books/:id - Get book by ID
booksRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid book ID' });
    return;
  }

  const book = repository.findById(id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  res.json(book);
});

// POST /api/books - Create new book
booksRouter.post('/', (req: Request, res: Response) => {
  const input = req.body as CreateBookInput;

  // Validation
  if (!input.title || typeof input.title !== 'string' || input.title.trim() === '') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  if (!input.author || typeof input.author !== 'string' || input.author.trim() === '') {
    res.status(400).json({ error: 'Author is required' });
    return;
  }

  if (input.year !== undefined && (typeof input.year !== 'number' || input.year < 0)) {
    res.status(400).json({ error: 'Year must be a positive number' });
    return;
  }

  try {
    const book = repository.create(input);
    res.status(201).json(book);
  } catch {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// PUT /api/books/:id - Update book
booksRouter.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid book ID' });
    return;
  }

  const input = req.body as UpdateBookInput;

  try {
    const book = repository.update(id, input);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.json(book);
  } catch {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE /api/books/:id - Delete book
booksRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid book ID' });
    return;
  }

  const deleted = repository.delete(id);

  if (!deleted) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  res.status(204).send();
});
