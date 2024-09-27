"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
export default function Page() {
  const [roleData, setRoleData] = useState({
    roleName: "Administrador",
    description: "Tiene acceso total a la información y los datos",
    permissions: ["Leer", "Escribir", "Eliminar"],
  });

  const allPermissions = [
    "Leer",
    "Escribir",
    "Eliminar",
    "Manejar Usuarios",
    "Manejar Configuraciones",
  ];
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };
  const handlePermissionsChange = (permissions: any) => {
    setRoleData({ ...roleData, permissions });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Role Data Updated:", roleData);
    alert(`El rol ${roleData.roleName} se ha actualizado exitosamente.`);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Crear Rol" />
      <Box
        maxW="600px"
        mx="auto"
        p={6}
        bg="gray.50"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading size="lg" mb={6}>
          Crear Rol
        </Heading>
        <form onSubmit={handleSubmit}>
          {/* Campo para el nombre del rol */}
          <FormControl id="roleName" mb={4}>
            <FormLabel>Nombre del rol</FormLabel>
            <Input
              type="text"
              name="roleName"
              onChange={handleInputChange}
              required
            />
          </FormControl>

          {/* Campo para la descripción del rol */}
          <FormControl id="description" mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name="description"
              onChange={handleInputChange}
              required
            />
          </FormControl>

          {/* Lista de permisos con checkboxes */}
          <FormControl id="permissions" mb={4}>
            <FormLabel>Permisos</FormLabel>
            <CheckboxGroup onChange={handlePermissionsChange}>
              <Stack spacing={2}>
                {allPermissions.map((permission) => (
                  <Checkbox key={permission} value={permission}>
                    {permission}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Guardar Rol
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
}
