import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50)
});

export type Category = z.infer<typeof categorySchema>;

export interface EditingCategory {
  id: string;
  name: string;
  isNew?: boolean;
}