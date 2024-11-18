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
} from "@chakra-ui/react";
import React, { FormEventHandler } from "react";

export default function CrearPaciente() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmitCreate: FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {};
  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => {
          onOpen();
        }}
        float="right"
        mr={4}
        mb={4}
      >
        Crear Paciente
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Crear Paciente
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={handleSubmitCreate}>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Nombre
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
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
                  <FormControl mb={6} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Dirección
                    </FormLabel>
                    <Input
                      name="hora"
                      type="text"
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
                    type="submit"
                    w="full"
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    p={4}
                    borderRadius="lg"
                  >
                    Editar Organización
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
