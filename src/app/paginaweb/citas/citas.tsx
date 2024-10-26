"use client";
import { Box, Flex, Stack, Text, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
import Calendario from "./calendario";

export default function CrearCitas() {
  return (
    <Flex direction="column" alignItems="center" w="full">
      <Stack
        spacing={4}
        mt={4}
        w="full"
        alignItems={"center"}
        paddingX={40}
        marginBottom={4}
      >
        <Calendario />
      </Stack>
      <Stack spacing={4} mt={4} w="full" paddingX={40} marginBottom={4}>
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </Stack>
    </Flex>
  );
}

function AppointmentCard() {
  return (
    <Flex
      direction="row"
      bg="orange.400"
      p={4}
      shadow="lg"
      _hover={{ shadow: "2xl" }}
      align="center"
    >
      <Box>
        <Text color="white">
          <b>Fecha:</b>
        </Text>
        <Text color="white">
          <b>Hora:</b> de
        </Text>
        <Text color="white">
          <b>Motivo:</b>
        </Text>
        <Text color="white">
          <b>Doctor:</b>
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
