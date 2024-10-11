import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  TableCaption,
  Link,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import BotonHabilitar from "./components/botonHabilitar";
import BotonInformacion from "./components/botonInformacion";
import BotonEditar from "./components/botonEditar";
import { birthDateFormater } from "@/pages/utils/birth_date_formater";
export default async function Usuarios() {
  const prisma = new PrismaClient();
  const persons = await prisma.person.findMany({ include: { rol: true } });
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Usuarios" />
      <Button
        as={Link}
        href="/dashboard/pages/usuarios/crear"
        colorScheme="teal"
        variant="solid"
        mb={8}
      >
        Crear Usuario
      </Button>
      {persons.length === 0 ? (
        <>No se encontraron Usuarios por el momento</>
      ) : (
        <Box
          p={4}
          bg="gray.50"
          borderRadius="md"
          boxShadow="md"
          overflowX="auto"
        >
          <Table colorScheme="orange">
            <TableCaption>Lista de Usuarios</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Género</Th>
                <Th>Fecha de Nacimiento</Th>
                <Th>Estado Civil</Th>
                <Th>Teléfono</Th>
                <Th>Celular</Th>
                <Th>Rol</Th>
              </Tr>
            </Thead>
            <Tbody>
              {persons.map((person, index) => (
                <Tr key={index}>
                  <Td>{`${person.firstName} ${person.secondName ? person.secondName : ""} ${person.familyName}`}</Td>
                  <Td>{person.gender}</Td>
                  <Td>{birthDateFormater(person.birthDate)}</Td>
                  <Td>
                    {person.maritalStatus === "Married" ? "Casado" : "Soltero"}
                  </Td>
                  <Td>{person.phone}</Td>
                  <Td>{person.mobile}</Td>
                  <Td>{person.rol.roleName}</Td>
                  <Td>
                    <HStack spacing={3}>
                      <BotonHabilitar
                        userId={person.id}
                        active={person.active}
                      />
                      <BotonInformacion />
                      <BotonEditar
                        route={`/dashboard/pages/usuarios/editar/${person.id}`}
                      />
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
