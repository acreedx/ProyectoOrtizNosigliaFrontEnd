"use server";
import { postValidation } from "@/app/dashboard/pages/prismatest/zod/postValidation";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData: FormData) {
  const prisma = new PrismaClient();
  const data = {
    slug: formData.get("slug")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    body: formData.get("body")?.toString() || "",
    author: formData.get("author")?.toString() || "",
    authorId: formData.get("authorId")?.toString() || "",
    comments: formData.getAll("comments").map((comment) => comment.toString()),
  };
  const result = postValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  await prisma.post.create({
    data: result.data,
  });
  revalidatePath("/dashboard/prismatest");
  return { success: true };
}

export async function handleLogin(formData: FormData) {
  const prisma = new PrismaClient();
  const data = {
    slug: formData.get("slug")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    body: formData.get("body")?.toString() || "",
    author: formData.get("author")?.toString() || "",
    authorId: formData.get("authorId")?.toString() || "",
    comments: formData.getAll("comments").map((comment) => comment.toString()),
  };
  const result = postValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  await prisma.post.create({
    data: result.data,
  });
  revalidatePath("/dashboard/prismatest");
  return { success: true };
}
