import {
  useDisclosure,
  Button,
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
  Input,
} from "@chakra-ui/react";
import { Treatments } from "@prisma/client";
import React, { useState } from "react";

export default function CreacionTipoTratamiento() {
  const [selectedtreatmentType, setselectedtreatmentType] =
    useState<Treatments>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} float="right" mr={4} mb={4}>
        Crear nuevo tipo Tratamiento
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Crear nuevo tipo de Tratamiento
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={() => {}}>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Tipo de tratamiento
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedtreatmentType?.treatmentType}
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Título
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedtreatmentType?.title}
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Descripción
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedtreatmentType?.description}
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Citas estimadas
                    </FormLabel>
                    <Input
                      name="name"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={
                        selectedtreatmentType?.estimatedAppointments
                      }
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Días entre tratamientos
                    </FormLabel>
                    <Input
                      name="name"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={
                        selectedtreatmentType?.estimatedAppointments
                      }
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Costo Estimado
                    </FormLabel>
                    <Input
                      name="costo_estimado"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedtreatmentType?.costEstimation}
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
                    Crear nuevo tipo de Tratamiento
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
