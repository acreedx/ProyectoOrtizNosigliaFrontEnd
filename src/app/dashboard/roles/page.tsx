"use client";
import React, { useEffect } from "react";
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
  Stack,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Role from "@/interfaces/Rol";
import { RolService } from "@/repositories/RolService";
import Swal from "sweetalert2";
export default function Roles() {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const RolesLista: Role[] = await RolService.getRoles();
    console.log(RolesLista);
    setRoles(RolesLista);
    setloading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  // Estado para manejar los roles
  const [roles, setRoles] = useState<Role[]>([]);

  // Función para obtener el color del estado
  const getStatusColor = (status: any) => {
    return status ? "green" : "red";
  };

  // Función para cambiar el estado de un rol
  const toggleStatus = async (index: any, state: boolean) => {
    let data;
    if (state) {
      data = await RolService.disableRol(index);
    } else {
      data = await RolService.enableRol(index);
    }
    if (data) {
      Swal.fire("Exito");
      getData();
    }
  };

  const editRole = (role: any) => {
    router.push("/dashboard/roles/editar");
  };

  const addRoles = () => {
    router.push("/dashboard/roles/crear");
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Roles y Permisos" />
      {loading ? (
        <Spinner />
      ) : (
        <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
          <Stack mb={4} direction="row" justify="flex-end">
            <Button colorScheme="teal" onClick={addRoles}>
              Añadir nuevo rol
            </Button>
          </Stack>
          <Table variant="simple" colorScheme="purple">
            <TableCaption>Roles y Permisos</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre del rol</Th>
                <Th>Permisos asignados</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {roles.map((role, index) => (
                <Tr key={index}>
                  <Td>{role.roleName}</Td>
                  <Td>{role.permissions.length}</Td>
                  <Td>
                    <Tag colorScheme={getStatusColor(role.active)}>
                      {role.active ? "Activo" : "Deshabilitado"}
                    </Tag>
                  </Td>
                  <Td>
                    <HStack spacing={4}>
                      {/* Botón para habilitar/deshabilitar según el estado */}
                      <Button
                        colorScheme={role.active ? "red" : "green"}
                        onClick={() => toggleStatus(role._id, role.active)}
                      >
                        {role.active ? "Deshabilitar" : "Habilitar"}
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => editRole(role)}
                        as="a"
                        href={`/dashboard/roles/${encodeURIComponent(role._id)}`} // Enlace real
                      >
                        Editar
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </DefaultLayout>
  );
}
