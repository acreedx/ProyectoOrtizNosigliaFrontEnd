import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
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
          <Link href="/paginaweb/login">
            <Button
              as="a"
              colorScheme="orange"
              size="lg"
              className="no-underline transition duration-300 "
              variant="solid" // Button with solid background
            >
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/paginaweb/registro">
            <Button
              as="a"
              size="lg"
              className="border border-orange-400 text-orange-400 no-underline transition duration-300 hover:bg-orange-500 "
              variant="outline"
            >
              Crear Cuenta
            </Button>
          </Link>
        </Flex>
      </Box>
    </div>
  );
}
