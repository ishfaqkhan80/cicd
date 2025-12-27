import { test, expect } from '@playwright/test';

test.describe('Books API E2E Tests', () => {
  const testBook = {
    title: 'E2E Test Book',
    author: 'Test Author',
    year: 2024,
  };

  let createdBookId: number;

  test('GET /health - should return ok status', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toEqual({ status: 'ok' });
  });

  test('POST /api/books - should create a new book', async ({ request }) => {
    const response = await request.post('/api/books', {
      data: testBook,
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.title).toBe(testBook.title);
    expect(data.author).toBe(testBook.author);
    expect(data.year).toBe(testBook.year);

    createdBookId = data.id;
  });

  test('GET /api/books - should return all books', async ({ request }) => {
    const response = await request.get('/api/books');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('GET /api/books/:id - should return specific book', async ({ request }) => {
    // First create a book
    const createResponse = await request.post('/api/books', {
      data: testBook,
    });
    const createdBook = await createResponse.json();

    // Then fetch it
    const response = await request.get(`/api/books/${createdBook.id}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBe(createdBook.id);
    expect(data.title).toBe(testBook.title);
  });

  test('PUT /api/books/:id - should update book', async ({ request }) => {
    // First create a book
    const createResponse = await request.post('/api/books', {
      data: testBook,
    });
    const createdBook = await createResponse.json();

    // Then update it
    const updatedData = {
      title: 'Updated Title',
      author: 'Updated Author',
      year: 2025,
    };

    const response = await request.put(`/api/books/${createdBook.id}`, {
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.title).toBe(updatedData.title);
    expect(data.author).toBe(updatedData.author);
    expect(data.year).toBe(updatedData.year);
  });

  test('DELETE /api/books/:id - should delete book', async ({ request }) => {
    // First create a book
    const createResponse = await request.post('/api/books', {
      data: testBook,
    });
    const createdBook = await createResponse.json();

    // Then delete it
    const response = await request.delete(`/api/books/${createdBook.id}`);
    expect(response.status()).toBe(204);

    // Verify it's deleted
    const getResponse = await request.get(`/api/books/${createdBook.id}`);
    expect(getResponse.status()).toBe(404);
  });

  test('GET /api/books/:id - should return 404 for non-existent book', async ({ request }) => {
    const response = await request.get('/api/books/99999');
    expect(response.status()).toBe(404);
  });

  test('POST /api/books - should validate required fields', async ({ request }) => {
    const invalidBook = { title: 'Only Title' };

    const response = await request.post('/api/books', {
      data: invalidBook,
    });

    expect(response.status()).toBe(400);
  });
});
