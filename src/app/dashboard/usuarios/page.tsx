import React, { useEffect } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  HStack,
  Stack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  TableCaption,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Person from "@/interfaces/Person";
import { PersonService } from "@/repositories/PersonService";
export default async function Usuarios() {
  const router = useRouter();
  const toast = useToast();
  const initialUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Active",
      role: "Administrador",
      FechaNacimiento: "26/09/2002",
      Sexo: "Masculino",
      CI: "13674445",
      Teléfono: "20770722",
      Celular: "70755202",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "Inactive",
      role: "Usuario",
      FechaNacimiento: "26/09/2002",
      Sexo: "Masculino",
      CI: "13674445",
      Teléfono: "20770722",
      Celular: "70755202",
    },
    {
      id: 3,
      name: "Carlos Alvarez",
      email: "carlos.alvarez@example.com",
      status: "Active",
      role: "Secretario",
      FechaNacimiento: "26/09/2002",
      Sexo: "Masculino",
      CI: "13674445",
      Teléfono: "20770722",
      Celular: "70755202",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(); // Almacena el usuario seleccionado para mostrar en el modal

  const toggleStatus = (index: any) => {
    const updatedUsers = [...users];
    updatedUsers[index].status =
      updatedUsers[index].status === "Active" ? "Inactive" : "Active";
    setUsers(updatedUsers);
    toast({
      title: `${updatedUsers[index].name} is now ${updatedUsers[index].status}`,
      status: updatedUsers[index].status === "Active" ? "success" : "warning",
      duration: 2000,
      isClosable: true,
    });
  };
  const viewUserInfo = (user: any) => {
    setSelectedUser(user); // Asigna el usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedUser(null); // Limpia el usuario seleccionado
  };
  const editUser = (user: any) => {
    router.push("/dashboard/usuarios/editar");
  };

  const addUser = () => {
    router.push("/dashboard/usuarios/crear");
  };
  const [persons, setpersons] = useState<Person[]>([]);
  const getdata = async () => {
    setpersons(await PersonService.getPerson());
    console.log(await PersonService.getPerson());
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Usuarios" />
      <Box overflowX="auto">
        <Table variant="simple">
          <TableCaption>Lista de Personas</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Género</Th>
              <Th>Fecha de Nacimiento</Th>
              <Th>Estado Civil</Th>
              <Th>Nombre de Usuario</Th>
            </Tr>
          </Thead>
          <Tbody>
            {persons.map((person, index) => (
              <Tr key={person._id}>
                <Td>{`${person.name.given.join(" ")} ${person.name.family}`}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.birthDate}</Td>
                <Td>{person.maritalStatus.coding[0].display}</Td>
                <Td>{person.systemUser.username}</Td>
                <Td>
                  <HStack spacing={3}>
                    <Button
                      size="sm"
                      colorScheme={person.active ? "red" : "green"}
                      onClick={async () => {
                        if (person.active) {
                          await PersonService.disablePerson(person!._id!).then(
                            async () => {
                              getdata();
                            },
                          );
                        } else {
                          await PersonService.enablePerson(person!._id!).then(
                            async () => {
                              getdata();
                            },
                          );
                        }
                      }}
                    >
                      {person.active ? "Deshabilitar" : "Habilitar"}
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => viewUserInfo(person)}
                    >
                      Ver información
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => editUser(person)}
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
      <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
        {/* Botón para agregar nuevo usuario 
        <Stack mb={4} direction="row" justify="flex-end">
          <Button colorScheme="teal" onClick={addUser}>
            Añadir nuevo usuario
          </Button>
        </Stack>*/}

        {/* Tabla de usuarios */}
        {/*
        <Table variant="simple" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>CI</Th>
              <Th>Celular</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.CI}</Td>
                <Td>{user.Celular}</Td>
                <Td>
                  <Tag colorScheme={user.status === "Active" ? "green" : "red"}>
                    {user.status === "Active" ? "Activo" : "Inactivo"}
                  </Tag>
                </Td>
                <Td>
                  <HStack spacing={3}>
                    <Button
                      size="sm"
                      colorScheme={user.status === "Active" ? "red" : "green"}
                      onClick={() => toggleStatus(index)}
                    >
                      {user.status === "Active" ? "Deshabilitar" : "Habilitar"}
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => viewUserInfo(user)}
                    >
                      Ver información
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => editUser(user)}
                    >
                      Editar
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
 */}
        {/* Modal para mostrar la información del usuario */}
        {selectedUser && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Información del Usuario</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  <strong>Nombre:</strong>{" "}
                  {`${selectedUser.name.given.join(" ")} ${selectedUser.name.family}`}
                </Text>
                <Text>
                  <strong>Correo:</strong>{" "}
                  {selectedUser.telecom[0]?.value || "No disponible"}
                </Text>
                <Text>
                  <strong>Fecha de Nacimiento:</strong> {selectedUser.birthDate}
                </Text>
                <Text>
                  <strong>Sexo:</strong> {selectedUser.gender}
                </Text>
                <Text>
                  <strong>CI:</strong> {selectedUser.carnetDeIdentidad}
                </Text>
                <Text>
                  <strong>Teléfono:</strong>{" "}
                  {selectedUser.telecom[1]?.value || "No disponible"}
                </Text>
                <Text>
                  <strong>Celular:</strong>{" "}
                  {selectedUser.telecom[2]?.value || "No disponible"}
                </Text>
                <Text>
                  <strong>Estado:</strong>{" "}
                  {selectedUser.systemUser.status
                    ? "Habilitado"
                    : "Deshabilitado"}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </DefaultLayout>
  );
}
