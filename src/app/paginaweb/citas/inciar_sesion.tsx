"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function IniciarSesion() {
  return (
    <div className="flex h-150 w-full items-center justify-center">
      <Box className="bg-gray-100 flex flex-col items-center justify-center rounded-lg p-6 shadow-md">
        <Text className="mb-4 text-lg font-semibold">
          ¿Ya tienes una cuenta? Inicia sesión o crea una nueva cuenta para
          realizar una cita.
        </Text>
        <Flex gap={4}>
          <Button
            href="/paginaweb/login"
            as="a"
            colorScheme="orange"
            size="lg"
            className="no-underline transition duration-300 "
            variant="solid"
          >
            Iniciar Sesión
          </Button>
          <Button
            href="/paginaweb/registro"
            as="a"
            size="lg"
            className="border border-orange-400 text-orange-400 no-underline transition duration-300 hover:bg-orange-500 "
            variant="outline"
          >
            Crear Cuenta
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
