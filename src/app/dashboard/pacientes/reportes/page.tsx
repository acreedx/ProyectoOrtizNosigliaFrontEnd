"use client";
import { Box, Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { generarPDFPacientes } from "./reportePacientes";
import { generarPDFOrganizaciones } from "./reporteOrganizaciones";

export default function Page() {
  const handleSubmitPacientes = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await generarPDFPacientes(formData);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleSubmitOrganizaciones = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await generarPDFOrganizaciones(formData);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reportes" />
      <Heading fontSize={"20"} color={"orange"} textAlign={"center"} mb={"2"}>
        Reporte de Pacientes
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmitPacientes}
        maxW="500px"
        margin="0 auto"
        marginBottom={"20"}
      >
        <Flex gap={4} align="center" wrap="wrap">
          <Box flex="1">
            <FormLabel>Fecha de Inicio</FormLabel>
            <Input type="date" name="startDate" />
          </Box>
          <Box flex="1">
            <FormLabel>Fecha de Límite</FormLabel>
            <Input type="date" name="endDate" />
          </Box>
          <Box flex="2" justifyContent={"center"} display={"flex"}>
            <Button colorScheme="blue" type="submit" mt={6}>
              Generar Reporte de pacientes PDF
            </Button>
          </Box>
        </Flex>
      </Box>
      <Heading fontSize={"20"} color={"orange"} textAlign={"center"} mb={"2"}>
        Reporte de Organizaciones
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmitOrganizaciones}
        maxW="500px"
        margin="0 auto"
      >
        <Flex gap={4} align="center" wrap="wrap">
          <Box flex="1">
            <FormLabel>Fecha de Inicio</FormLabel>
            <Input type="date" name="startDate" />
          </Box>
          <Box flex="1">
            <FormLabel>Fecha de Límite</FormLabel>
            <Input type="date" name="endDate" />
          </Box>
          <Box flex="2" justifyContent={"center"} display={"flex"}>
            <Button colorScheme="blue" type="submit" mt={6}>
              Generar Reporte de pacientes PDF
            </Button>
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  );
}
