import { z } from "zod";

export const postValidation = z.object({
  slug: z.string().min(5, "El slug es obligatorio y de mínimo 5 carácteres"),
  title: z.string().min(5, "El título es obligatorio y de mínimo 5 carácteres"),
  body: z
    .string()
    .min(5, "El contenido es obligatorio y de mínimo 5 carácteres"),
  author: z.string().min(5, "El autor es obligatorio y de mínimo 5 carácteres"),
  authorId: z
    .string()
    .min(5, "El ID del autor es obligatorio y de mínimo 5 carácteres"),
  comments: z.array(z.string()).optional(),
});
