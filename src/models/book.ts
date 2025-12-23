export interface Book {
  id: number;
  title: string;
  author: string;
  year: number | null;
  created_at: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  year?: number;
}

export interface UpdateBookInput {
  title?: string;
  author?: string;
  year?: number | null;
}
