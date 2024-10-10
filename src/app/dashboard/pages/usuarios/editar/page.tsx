"use client";
import React from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
export default function Page() {
  const [formData, setFormData] = useState({
    active: true,
    name: {
      use: "Jhon",
      given: ["Doe"],
      family: "Jones",
    },
    gender: "Masculino",
    birthDate: "06/05/2003",
    telecom: [{ value: "73744202", use: "Telefóno", system: "" }],
    photo: { _url: { id: "https:image.jgp.com" } },
    address: {
      use: "Dirección",
      line: [""],
      city: "La Paz",
      state: "Murillo",
      postalCode: "0000",
    },
    maritalStatus: {
      coding: [{ system: "", code: "S", display: "Soltero" }],
    },
    systemUser: {
      username: "Jhon2cb",
      password: "",
      roles: [""],
      lastLogin: "",
      passwordExpiration: "",
      status: "",
    },
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes manejar la lógica de envío del formulario.
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar Usuario" />
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={5}
        borderWidth={1}
        borderRadius="md"
      >
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Uso"
              name="name.use"
              value={formData.name.use}
              onChange={handleChange}
            />
            <Input
              placeholder="Nombre"
              name="name.given[0]"
              value={formData.name.given[0]}
              onChange={handleChange}
            />
            <Input
              placeholder="Apellido"
              name="name.family"
              value={formData.name.family}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Género</FormLabel>
            <Select name="gender" onChange={handleChange}>
              <option value="">Selecciona...</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input type="date" name="birthDate" onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Teléfono</FormLabel>
            <Input
              placeholder="Valor"
              name="telecom[0].value"
              onChange={handleChange}
            />
            <Input
              placeholder="Uso"
              name="telecom[0].use"
              onChange={handleChange}
            />
            <Input
              placeholder="Sistema"
              name="telecom[0].system"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input
              placeholder="Uso"
              name="address.use"
              onChange={handleChange}
            />
            <Input
              placeholder="Línea"
              name="address.line[0]"
              onChange={handleChange}
            />
            <Input
              placeholder="Ciudad"
              name="address.city"
              onChange={handleChange}
            />
            <Input
              placeholder="Estado"
              name="address.state"
              onChange={handleChange}
            />
            <Input
              placeholder="Código Postal"
              name="address.postalCode"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Foto (ID)</FormLabel>
            <Input
              placeholder="ID de URL"
              name="photo._url.id"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Nombre de Usuario</FormLabel>
            <Input name="systemUser.username" onChange={handleChange} />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Enviar
          </Button>
        </VStack>
      </Box>
    </DefaultLayout>
  );
}
