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
  Input,
} from "@chakra-ui/react";
import { CarePlan } from "@prisma/client";

import React from "react";

export default function ModalInformacion({
  isSecondModalOpen,
  onCloseSecondModal,
  selectedTreatment,
}: {
  isSecondModalOpen: boolean;
  onCloseSecondModal: () => void;
  selectedTreatment: CarePlan | undefined;
}) {
  return (
    <Modal isOpen={isSecondModalOpen} onClose={onCloseSecondModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalHeader>
          <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
            Ver información del Tratamiento
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="full">
            <Box>
              <form onSubmit={() => {}}>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Tipo de Tratamiento
                  </FormLabel>
                  <Input
                    name="treatmentType"
                    type="text"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.treatmentType}
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Título
                  </FormLabel>
                  <Input
                    name="title"
                    type="text"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.title}
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Descripción
                  </FormLabel>
                  <Input
                    name="name"
                    type="text"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.description}
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Citas totales
                  </FormLabel>
                  <Input
                    name="name"
                    type="number"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.totalAppointments || 0}
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Días entre tratamientos
                  </FormLabel>
                  <Input
                    name="name"
                    type="number"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.daysBetweenAppointments}
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Fecha Inicio
                  </FormLabel>
                  <Input
                    name="name"
                    type="date"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedTreatment?.startDate?.toISOString().split("T")[0]
                    }
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Fecha de Fin
                  </FormLabel>
                  <Input
                    name="name"
                    type="date"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedTreatment?.endDate?.toISOString().split("T")[0]
                    }
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Costo Total
                  </FormLabel>
                  <Input
                    name="costo_estimado"
                    type="number"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.costEstimation}
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    readOnly
                  />
                </FormControl>
              </form>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
