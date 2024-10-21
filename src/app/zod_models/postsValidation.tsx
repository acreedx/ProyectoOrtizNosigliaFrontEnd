import { z } from "zod";

const postsValidation = z.object({
  slug: z.string().min(1, "El slug no puede estar vacío"),
  title: z.string().min(1, "El título no puede estar vacío"),
  body: z.string().min(1, "El cuerpo no puede estar vacío"),
  author: z.string().min(1, "El autor no puede estar vacío"),
  authorId: z.string().min(1, "El ID del autor no puede estar vacío"),
});
export default postsValidation;
