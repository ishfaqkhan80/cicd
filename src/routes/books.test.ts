import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { BookRepository } from '../models/bookRepository.js';

const repository = new BookRepository();

describe('Books API Integration Tests', () => {
  // Clean database before each test
  beforeEach(() => {
    repository.deleteAll();
  });

  describe('GET /api/books', () => {
    it('should return empty array when no books exist', async () => {
      const response = await request(app).get('/api/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all books', async () => {
      // Arrange: Create test books
      const book1 = repository.create({ title: 'Book 1', author: 'Author 1', year: 2020 });
      const book2 = repository.create({ title: 'Book 2', author: 'Author 2', year: 2021 });

      // Act
      const response = await request(app).get('/api/books');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      // Verify both books are returned (order may vary due to same timestamp)
      const titles = response.body.map((b: any) => b.title);
      expect(titles).toContain('Book 1');
      expect(titles).toContain('Book 2');
    });
  });

  describe('GET /api/books/:id', () => {
    it('should return a book by id', async () => {
      const book = repository.create({
        title: 'Test Book',
        author: 'Test Author',
        year: 2023
      });

      const response = await request(app).get(`/api/books/${book.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: book.id,
        title: 'Test Book',
        author: 'Test Author',
        year: 2023,
      });
    });

    it('should return 404 when book not found', async () => {
      const response = await request(app).get('/api/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Book not found' });
    });

    it('should return 400 for invalid id', async () => {
      const response = await request(app).get('/api/books/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid book ID' });
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Clean Code',
        author: 'Robert Martin',
        year: 2008,
      };

      const response = await request(app)
        .post('/api/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newBook);
      expect(response.body.id).toBeDefined();
      expect(response.body.created_at).toBeDefined();
    });

    it('should create a book without year', async () => {
      const newBook = {
        title: 'Book without year',
        author: 'Unknown',
      };

      const response = await request(app)
        .post('/api/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body.year).toBeNull();
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/api/books')
        .send({ author: 'Author' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Title is required' });
    });

    it('should return 400 when title is empty string', async () => {
      const response = await request(app)
        .post('/api/books')
        .send({ title: '   ', author: 'Author' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Title is required' });
    });

    it('should return 400 when author is missing', async () => {
      const response = await request(app)
        .post('/api/books')
        .send({ title: 'Title' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Author is required' });
    });

    it('should return 400 for invalid year', async () => {
      const response = await request(app)
        .post('/api/books')
        .send({ title: 'Title', author: 'Author', year: -5 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Year must be a positive number' });
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update a book', async () => {
      const book = repository.create({
        title: 'Old Title',
        author: 'Old Author',
        year: 2020
      });

      const response = await request(app)
        .put(`/api/books/${book.id}`)
        .send({ title: 'New Title', year: 2023 });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: book.id,
        title: 'New Title',
        author: 'Old Author', // Unchanged
        year: 2023,
      });
    });

    it('should update only provided fields', async () => {
      const book = repository.create({
        title: 'Title',
        author: 'Author',
        year: 2020
      });

      const response = await request(app)
        .put(`/api/books/${book.id}`)
        .send({ author: 'New Author' });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: 'Title', // Unchanged
        author: 'New Author',
        year: 2020, // Unchanged
      });
    });

    it('should return 404 when book not found', async () => {
      const response = await request(app)
        .put('/api/books/999')
        .send({ title: 'New Title' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Book not found' });
    });

    it('should return 400 for invalid id', async () => {
      const response = await request(app)
        .put('/api/books/invalid')
        .send({ title: 'Title' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid book ID' });
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book', async () => {
      const book = repository.create({
        title: 'To Delete',
        author: 'Author'
      });

      const response = await request(app).delete(`/api/books/${book.id}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      // Verify book is deleted
      const getResponse = await request(app).get(`/api/books/${book.id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 when book not found', async () => {
      const response = await request(app).delete('/api/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Book not found' });
    });

    it('should return 400 for invalid id', async () => {
      const response = await request(app).delete('/api/books/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid book ID' });
    });
  });
});
