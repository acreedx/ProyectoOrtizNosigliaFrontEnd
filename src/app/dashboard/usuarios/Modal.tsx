"use client";
import React, { useEffect } from "react";
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
  HStack,
  useToast,
  TableCaption,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PersonService } from "@/repositories/PersonService";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/Common/Breadcrumb";
import { Person } from "@prisma/client";
export default function Usuarios() {
  const router = useRouter();
  const toast = useToast();

  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
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
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
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
    </DefaultLayout>
  );
}
