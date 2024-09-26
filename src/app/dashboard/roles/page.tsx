"use client";
import React from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Tag,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Roles() {
  const router = useRouter();
  const initialRoles = [
    {
      roleName: "Administrador",
      description: "Acceso total a toda la información",
      permissions: "Leer, Escribir, Eliminar",
      status: "Active",
    },
    {
      roleName: "Dentista",
      description: "Puede ver la información de los pacientes y citas",
      permissions: "Leer, Escribir",
      status: "Active",
    },
    {
      roleName: "Secretario",
      description: "Puede ver la información contable de los pacientes",
      permissions: "Leer",
      status: "Inactive",
    },
  ];

  // Estado para manejar los roles
  const [roles, setRoles] = useState(initialRoles);

  // Función para obtener el color del estado
  const getStatusColor = (status: any) => {
    return status === "Active" ? "green" : "red";
  };

  // Función para cambiar el estado de un rol
  const toggleStatus = (index: any) => {
    const updatedRoles = [...roles];
    updatedRoles[index].status =
      updatedRoles[index].status === "Active" ? "Inactive" : "Active";
    setRoles(updatedRoles);
  };

  const editRole = (role: any) => {
    router.push("/dashboard/roles/editar");
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Roles y Permisos" />
      <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
        <Table variant="simple" colorScheme="purple">
          <TableCaption>Roles y Permisos</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre del rol</Th>
              <Th>Descripción</Th>
              <Th>Permisos</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role, index) => (
              <Tr key={index}>
                <Td>{role.roleName}</Td>
                <Td>{role.description}</Td>
                <Td>{role.permissions}</Td>
                <Td>
                  <Tag colorScheme={getStatusColor(role.status)}>
                    {role.status === "Active" ? "Activo" : "Deshabilitado"}
                  </Tag>
                </Td>
                <Td>
                  <HStack spacing={4}>
                    {/* Botón para habilitar/deshabilitar según el estado */}
                    <Button
                      colorScheme={role.status === "Active" ? "red" : "green"}
                      onClick={() => toggleStatus(index)}
                    >
                      {role.status === "Active" ? "Deshabilitar" : "Habilitar"}
                    </Button>
                    <Button colorScheme="blue" onClick={() => editRole(role)}>
                      Editar
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </DefaultLayout>
  );
}
