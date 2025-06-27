export interface Request {
  id: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
}

export interface RequestFormData {
  title: string;
  description: string;
  category: string;
}

export interface RequestFormErrors {
  title?: string;
  description?: string;
  category?: string;
}

export const REQUEST_CATEGORIES = [
  "Ремонт",
  "Поставка",
  "Обслуживание",
  "Другое",
] as const;
