"use client";
import {
  Flex,
  FormControl,
  FormLabel,
  Box,
  Image,
  Input,
} from "@chakra-ui/react";
import { Patient, Allergy, Contact } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
interface FileWithPreview extends File {
  preview?: string;
}
export default function SeccionFoto({
  paciente,
}: {
  paciente: Patient & { allergies: Allergy[] } & { contacts: Contact[] };
}) {
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0] as FileWithPreview;
      selectedImage.preview = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  };
  return (
    <Flex direction={"row"} gap={5} mb={5} className="w-full justify-center">
      <FormControl w="400px">
        <Flex direction="column" align="center">
          <FormLabel>Foto de Perfil</FormLabel>
          <Box
            borderRadius="full"
            overflow="hidden"
            borderWidth="2px"
            borderColor="gray.300"
            width="250px"
            height="250px"
            mb={4}
            boxShadow="md"
          >
            {image ? (
              <Image
                src={image!.preview!}
                alt="Previsualización imagen"
                width="250px"
                height="250px"
                objectFit="cover"
              />
            ) : (
              <Image
                src={paciente.photoUrl}
                alt="Imagen por defecto"
                width="250px"
                height="250px"
                objectFit="cover"
              />
            )}
          </Box>
          <Input
            type="file"
            name="photoUrl"
            onChange={handleImageChange}
            accept="image/*"
            className="pt-1"
          />
        </Flex>
      </FormControl>
    </Flex>
  );
}
