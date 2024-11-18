"use client";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { Heading, Box, Flex, FormLabel, Button, Input } from "@chakra-ui/react";
import React from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { generarPDFTratamientos } from "./reporteTratamientos";
import { generarPDFTipoTratamiento } from "./reporteTipoTratamientos";

export default function Page() {
  const handleSubmitTratamientos = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await generarPDFTratamientos(formData);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleSubmitTipoTratamiento = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await generarPDFTipoTratamiento(formData);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reportes" />
      <Heading fontSize={"20"} color={"orange"} textAlign={"center"} mb={"2"}>
        Reporte de Tratamientos
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmitTratamientos}
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
              Generar Reporte de Tratamientos PDF
            </Button>
          </Box>
        </Flex>
      </Box>
      <Heading fontSize={"20"} color={"orange"} textAlign={"center"} mb={"2"}>
        Reporte de Tipos de Tratamiento
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmitTipoTratamiento}
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
              Generar Reporte de Tipos de Tratamiento PDF
            </Button>
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  );
}
