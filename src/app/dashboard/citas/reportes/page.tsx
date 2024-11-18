"use client";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { Heading, Box, Flex, FormLabel, Button, Input } from "@chakra-ui/react";
import React from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { generarPDFCitas } from "./reporteCitas";

export default function Page() {
  const handleSubmitCitas = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await generarPDFCitas(formData);
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reportes" />
      <Heading fontSize={"20"} color={"orange"} textAlign={"center"} mb={"2"}>
        Reporte de Citas
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmitCitas}
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
              Generar Reporte de citas PDF
            </Button>
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  );
}
