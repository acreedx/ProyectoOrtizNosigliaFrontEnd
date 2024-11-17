"use client";
import { Box, Flex, Stack, Text, IconButton, Heading } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
import Calendario from "./calendario";

export default function CrearCitas() {
  return (
    <Flex direction={{ base: "column", md: "row" }} w="100%">
      <Stack
        spacing={4}
        mt={4}
        w={{ base: "100%", md: "40%" }}
        paddingX={4}
        marginBottom={4}
      >
        <Heading fontSize={20} color="teal.600">
          Panel de citas
        </Heading>
        <Heading fontSize={18} color="orange.500">
          Citas Pendientes
        </Heading>
        <Box
          overflowY="auto"
          maxHeight="400px"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="sm"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          bg="gray.50"
        >
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
        </Box>
        <Heading fontSize={18} color="green.500">
          Citas Confirmadas
        </Heading>
        <Box
          overflowY="auto"
          maxHeight="400px"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="sm"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          bg="gray.50"
        >
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
        </Box>
        <Heading fontSize={18} color="red.500">
          Citas Canceladas
        </Heading>
        <Box
          overflowY="auto"
          maxHeight="400px"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="sm"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          bg="gray.50"
        >
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
        </Box>
        <Heading fontSize={18} color="purple.500">
          Historial
        </Heading>
        <Box
          overflowY="auto"
          maxHeight="400px"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="sm"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          bg="gray.50"
        >
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
        </Box>
      </Stack>
      <Stack
        mt={4}
        w={{ base: "100%", md: "60%" }}
        alignItems="start"
        marginBottom={4}
        px={4}
      >
        <Heading fontSize={20} mb={2} color="teal.600" alignSelf={"center"}>
          Calendario de citas
        </Heading>
        <Heading fontSize={18} mb={2} color="orange.500">
          Escoja una fecha para empezar...
        </Heading>
        <Calendario />
      </Stack>
    </Flex>
  );
}

function AppointmentCard() {
  return (
    <Flex
      direction="row"
      bg="orange.400"
      py={2}
      px={4}
      shadow="lg"
      _hover={{ shadow: "2xl" }}
      align="center"
    >
      <Box>
        <Text color="white">
          <b>Fecha:</b>
        </Text>
        <Text color="white">
          <b>Hora:</b>
        </Text>
      </Box>
      <Flex w="full" justify="flex-end" gap={4} textColor="white">
        <IconButton
          aria-label="Confirm"
          icon={<CheckIcon />}
          _hover={{ shadow: "lg" }}
          backgroundColor={"green.400"}
          color={"white"}
        />
        <IconButton
          aria-label="Cancel"
          icon={<CloseIcon />}
          _hover={{ shadow: "lg" }}
          backgroundColor={"red.400"}
          color={"white"}
        />
        <IconButton
          aria-label="Info"
          icon={<InfoIcon />}
          _hover={{ shadow: "lg" }}
          backgroundColor={"blue.400"}
          color={"white"}
        />
      </Flex>
    </Flex>
  );
}
