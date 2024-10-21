"use client";
import React from "react";
import CancelIcon from "@/app/dashboard/components/Icons/CancelIcon";
import CheckSmallIcon from "@/app/dashboard/components/Icons/CheckSmallIcon";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
export default function CrearCitas() {
  const { data: session, status } = useSession();
  return (
    <Flex direction="column" alignItems="center" w="full">
      <Box w="full">
        <Box p={{ base: 4, sm: 12, xl: 16 }}>
          <Heading
            mb={9}
            fontSize="2xl"
            color="black"
            _dark={{ color: "white" }}
          >
            Crear una cita
          </Heading>

          <form>
            {/* Motivo de la cita */}
            <FormControl mb={4} isRequired>
              <FormLabel color="black" _dark={{ color: "white" }}>
                Motivo de la cita
              </FormLabel>
              <Textarea
                placeholder="Describa brevemente el motivo de su consulta"
                bg="transparent"
                borderColor="gray.400"
                _hover={{ borderColor: "orange.500" }}
                _focus={{ borderColor: "orange.500" }}
                _dark={{
                  bg: "gray.700",
                  color: "white",
                  borderColor: "gray.600",
                  _hover: { borderColor: "orange.500" },
                }}
              />
            </FormControl>

            {/* Fecha y hora */}
            <FormControl mb={6} isRequired>
              <FormLabel color="black" _dark={{ color: "white" }}>
                Fecha y hora
              </FormLabel>
              <Input
                type="datetime-local"
                bg="transparent"
                borderColor="gray.400"
                _hover={{ borderColor: "orange.500" }}
                _focus={{ borderColor: "orange.500" }}
                _dark={{
                  bg: "gray.700",
                  color: "white",
                  borderColor: "gray.600",
                  _hover: { borderColor: "orange.500" },
                }}
              />
            </FormControl>

            {/* Doctor */}
            <FormControl mb={6} isRequired>
              <FormLabel color="black" _dark={{ color: "white" }}>
                Doctor
              </FormLabel>
              <Select
                placeholder="Seleccione un doctor"
                bg="transparent"
                borderColor="gray.400"
                _hover={{ borderColor: "orange.500" }}
                _focus={{ borderColor: "orange.500" }}
                _dark={{
                  bg: "gray.700",
                  color: "white",
                  borderColor: "gray.600",
                  _hover: { borderColor: "orange.500" },
                }}
              >
                {/* Options can be added here */}
              </Select>
            </FormControl>

            {/* Submit */}
            <Button
              type="submit"
              w="full"
              bg="orange.400"
              color="white"
              _hover={{ bg: "orange.500" }}
              p={4}
              borderRadius="lg"
            >
              Registrar cita
            </Button>
          </form>
        </Box>
      </Box>

      {/* Lista de citas */}
      <Stack spacing={4} mt={4} w="full" paddingX={40} marginBottom={40}>
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
