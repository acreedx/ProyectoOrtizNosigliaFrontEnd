import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
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
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import BotonHabilitar from "./botonHabilitar";

export default async function Roles() {
  const prisma = new PrismaClient();
  const roles = await prisma.rol.findMany({
    include: {
      permissions: true,
    },
  });
  console.log(roles);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Roles y Permisos" />
      <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
        <Stack mb={4} direction="row" justify="flex-end"></Stack>
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
                <Td>{role.permissionIDs.length}</Td>
                <Td>
                  <Tag>{role.active ? "Activo" : "Deshabilitado"}</Tag>
                </Td>
                <Td>
                  <HStack spacing={4}>
                    <BotonHabilitar rolId={role.id} active={role.active} />
                    <Button
                      colorScheme="blue"
                      as="a"
                      href={`/dashboard/pages/roles/${role.id}`}
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
    </DefaultLayout>
  );
}
