import express, { Request, Response } from 'express';

export const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});
