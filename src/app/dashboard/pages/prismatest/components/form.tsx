"use client";
import React, { useState, useTransition } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  FormLabel,
  FormControl,
  Stack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { handleSubmit } from "../serveractions/actions";
import Swal from "sweetalert2";
import { title } from "process";
export default function Form() {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading
  const [errors, setErrors] = useState<any>({}); // Estado para los errores de validación

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const response = await handleSubmit(formData);
    if (!response.success) {
      setErrors(response.errors);
    } else {
      Swal.fire({
        title: "Éxito",
        text: "El post ha sido creado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      });
    }
    setIsLoading(false);
  };
  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={4}>
          <FormControl id="slug" isRequired>
            <FormLabel>Slug</FormLabel>
            <Input name="slug" required />
            {errors.slug && (
              <Text color="red.500">{errors.slug._errors.join(", ")}</Text>
            )}
          </FormControl>

          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" required />
            {errors.title && (
              <Text color="red.500">{errors.title._errors.join(", ")}</Text>
            )}
          </FormControl>

          <FormControl id="body" isRequired>
            <FormLabel>Body</FormLabel>
            <Textarea name="body" required />
            {errors.body && (
              <Text color="red.500">{errors.body._errors.join(", ")}</Text>
            )}
          </FormControl>

          <FormControl id="author" isRequired>
            <FormLabel>Author</FormLabel>
            <Input name="author" required />
            {errors.author && (
              <Text color="red.500">{errors.author._errors.join(", ")}</Text>
            )}
          </FormControl>

          <FormControl id="authorId" isRequired>
            <FormLabel>Author ID</FormLabel>
            <Input name="authorId" required />
            {errors.authorId && (
              <Text color="red.500">{errors.authorId._errors.join(", ")}</Text>
            )}
          </FormControl>

          <FormControl id="comments" isRequired>
            <FormLabel>Comments</FormLabel>
            <Input name="comments" placeholder="Comment 1" />
            <Input name="comments" placeholder="Comment 2" />
            <Input name="comments" placeholder="Comment 3" />
          </FormControl>

          <Button colorScheme="teal" type="submit" isDisabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
