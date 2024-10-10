import React, { useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { Spinner } from "@chakra-ui/react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Prisma, PrismaClient } from "@prisma/client";
import Form from "./components/form";

export default async function page() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pruebas con prisma" />
      {posts.length === 0 ? (
        <>No se encontraron posts por el momento</>
      ) : (
        <div className="h-[400px] overflow-y-scroll">
          {posts.map((post, index) => (
            <div
              key={index}
              className="mb-5 rounded border border-solid border-[#ccc] p-3"
            >
              <p>{index + 1}</p>
              <h2>
                <strong>Title:</strong> {post.title}
              </h2>
              <p>
                <strong>Slug:</strong> {post.slug}
              </p>
              <p>
                <strong>Body:</strong> {post.body}
              </p>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Author ID:</strong> {post.authorId}
              </p>
              <div>
                <strong>Comments:</strong>
                {post.comments.length > 0 ? (
                  <ul>
                    {post.comments.map((comment, commentIndex) => (
                      <li key={commentIndex}>{comment}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div>Posts {posts.length}</div>

      <Form />
    </DefaultLayout>
  );
}
