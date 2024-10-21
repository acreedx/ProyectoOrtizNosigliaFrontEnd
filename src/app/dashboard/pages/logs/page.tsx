import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from "@chakra-ui/react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
export default function Logs() {
  const logs = [
    {
      timestamp: "2024-09-26 10:30:00",
      user: "Administrador 1",
      messageType: "Paciente",
      event: "Creación de paciente",
      status: "Exitoso",
      description: "Se registro un nuevo paciente",
    },
    {
      timestamp: "2024-09-26 10:45:00",
      user: "Administrador 1",
      messageType: "Usuario",
      event: "Creación de usuario",
      status: "Pendiente",
      description: "Se registro un nuevo usuario",
    },
    {
      timestamp: "2024-09-26 11:00:00",
      user: "Administrador 1",
      messageType: "Historia clínica",
      event: "Solicitud de historia clínica",
      status: "Error",
      description: "El dentista solicito una historia clínica",
    },
    {
      timestamp: "2024-09-26 11:00:00",
      user: "Administrador 1",
      messageType: "Cita",
      event: "Creación de cita",
      status: "Exitoso",
      description: "El paciente creo una cita el día 18",
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Actividades" />
      <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
        <Table variant="striped" colorScheme="orange">
          <TableCaption>Tabla de Logs</TableCaption>
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Usuario</Th>
              <Th>Recurso solicitado</Th>
              <Th>Evento</Th>
              <Th>Estado</Th>
              <Th>Descripción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, index) => (
              <Tr key={index}>
                <Td>{log.timestamp}</Td>
                <Td>{log.user}</Td>
                <Td>{log.messageType}</Td>
                <Td>{log.event}</Td>
                <Td>{log.status}</Td>
                <Td>{log.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </DefaultLayout>
  );
}
