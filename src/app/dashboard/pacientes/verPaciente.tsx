"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
  Input,
  UseDisclosureProps,
  IconButton,
} from "@chakra-ui/react";
import { Person } from "@prisma/client";
import React, { FormEventHandler } from "react";
import { MdMenuBook } from "react-icons/md";

export default function VerPaciente({ paciente }: { paciente: Person }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Ver información"
        title="Ver información"
        icon={<MdMenuBook color="#919191" />}
        onClick={() => {
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Ver Información del paciente
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Nombre
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      readOnly
                      defaultValue={paciente.firstName}
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
                  <FormControl mb={6} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Dirección
                    </FormLabel>
                    <Input
                      name="hora"
                      type="text"
                      readOnly
                      defaultValue={paciente.addressLine}
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

                  <Button
                    type="button"
                    w="full"
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    p={4}
                    borderRadius="lg"
                    onClick={onClose}
                  >
                    Aceptar
                  </Button>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
