"use client";
import NavBar from "@/app/paginaweb/components/NavBar";
import React, { ChangeEvent, useState } from "react";
import { localDomain } from "@/types/domain";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../../../../firebase.config.js";
import Image from "next/image";
import Layout from "../../../components/Layout.jsx";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import User from "@/interfaces/User.js";
interface FileWithPreview extends File {
  preview?: string;
}

export default function Registro() {
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const router = useRouter();
  const [confirmPassword, setconfirmPassword] = useState("");
  const [formData, setFormData] = useState<Partial<User>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0] as FileWithPreview;
      selectedImage.preview = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const storageRef = await ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    const snapshot = await uploadBytes(storageRef, image);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      },
      (error) => {
        console.error("Error al subir la imagen: ", error);
        setImage(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            fotoDePerfil: downloadURL,
          });
        });
      },
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (confirmPassword != formData.password) {
      Swal.fire({
        title: "Error",
        text: "El password debe ser igual a la confirmacion",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
      return;
    }
    if (image) {
      await handleUpload();
    } else {
      setFormData({
        ...formData,
        ["fotoDePerfil"]:
          "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
      });
    }
    const url = localDomain + "person";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error("Error al crear al paciente: " + error.message);
    }
    const data = await response.json();

    Swal.fire({
      title: "Éxito",
      text: "Bienvenido al centro Ortiz Nosiliga " + data.primerNombre,
      icon: "success",
      confirmButtonText: "Continuar al listado",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      router.push("/dashboard/pacientes");
    });
  };

  return (
    <Layout>
      <Box
        mx={12}
        my={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        p={5}
        bg="white"
      >
        <Heading as="h3" textAlign="center" my={10} color="orange">
          Formulario de registro
        </Heading>
        <form onSubmit={handleSubmit}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={5}
            mb={5}
            className="w-full justify-center"
          >
            <FormControl w={"400px"}>
              <FormLabel>Imagen</FormLabel>
              <Flex direction="column" align="center">
                {image ? (
                  <Image
                    src={image!.preview!}
                    alt="Previsualizacion imagen"
                    width={250}
                    height={250}
                    className="mb-4 max-h-[250px]"
                  />
                ) : (
                  <Image
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Imagen por defecto"
                    width={250}
                    height={250}
                    className="mb-4 max-h-[250px]"
                  />
                )}
                <Input
                  type="file"
                  name="fotoDePerfil"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="pt-1"
                />
              </Flex>
            </FormControl>
          </Flex>

          {/* Nombre Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Apellido Paterno:</FormLabel>
              <Input
                type="text"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Apellido Materno:</FormLabel>
              <Input
                type="text"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          {/* Names Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Primer Nombre:</FormLabel>
              <Input
                type="text"
                name="primerNombre"
                value={formData.primerNombre}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Segundo Nombre:</FormLabel>
              <Input
                type="text"
                name="segundoNombre"
                value={formData.segundoNombre}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          {/* User and Password Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Nombre de usuario:</FormLabel>
              <Input
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirmar Password:</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
              />
            </FormControl>
          </Flex>

          {/* Birth Date and Location Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Fecha de Nacimiento:</FormLabel>
              <Input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Lugar de Nacimiento:</FormLabel>
              <Input
                type="text"
                name="lugarNacimiento"
                value={formData.lugarNacimiento}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Sexo:</FormLabel>
              <Select name="sexo" value={formData.sexo} onChange={handleChange}>
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Select>
            </FormControl>
          </Flex>

          {/* ID and Address Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Carnet de Identidad:</FormLabel>
              <Input
                type="text"
                name="carnetIdentidad"
                value={formData.carnetIdentidad}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Dirección/Zona:</FormLabel>
              <Input
                type="text"
                name="direccionZona"
                value={formData.direccionZona}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          {/* Contact Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Teléfono:</FormLabel>
              <Input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Celular:</FormLabel>
              <Input
                type="tel"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          {/* Email and Allergy Fields */}
          <Flex direction={{ base: "column", md: "row" }} gap={5} mb={5}>
            <FormControl isRequired>
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Alergia a algún medicamento:</FormLabel>
              <Textarea
                name="alergiaMedicamento"
                rows={4}
                value={formData.alergiaMedicamento}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          <Button
            colorScheme="orange"
            variant="solid"
            width="full"
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </Box>
    </Layout>
  );
}
