"use client";
import { routes } from "@/config/routes";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CrearPaciente() {
  const router = useRouter();
  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => {
          router.push(routes.pacientes + "/crear");
        }}
        float="right"
        mr={4}
        mb={4}
      >
        Crear Paciente
      </Button>
    </>
  );
}
