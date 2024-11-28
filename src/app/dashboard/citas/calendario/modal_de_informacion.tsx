import { birthDateFormater } from "@/utils/birth_date_formater";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { timeFormatter } from "@/utils/time_formater";
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
  Textarea,
  Input,
} from "@chakra-ui/react";
import { Appointment, Patient, Person } from "@prisma/client";
import React from "react";

export default function ModalDeInformacion({
  selectedAppointment,
  isSecondModalOpen,
  onCloseSecondModal,
}: {
  selectedAppointment: (Appointment & { subject: Patient }) | undefined;
  isSecondModalOpen: boolean;
  onCloseSecondModal: () => void;
}) {
  return (
    <Modal isOpen={isSecondModalOpen} onClose={onCloseSecondModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalHeader>
          <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
            Detalles de la cita
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="full">
            <Box>
              <form>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Motivo de la cita
                  </FormLabel>
                  <Textarea
                    name="descripcion"
                    placeholder="Describa brevemente el motivo de su consulta"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedAppointment ? selectedAppointment.reason : ""
                    }
                    readOnly
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
                    Fecha
                  </FormLabel>
                  <Input
                    name="fecha"
                    type="text"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedAppointment
                        ? birthDateFormater(selectedAppointment.start)
                        : ""
                    }
                    readOnly
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
                    Hora
                  </FormLabel>
                  <Input
                    name="fecha"
                    type="text"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedAppointment
                        ? timeFormatter(selectedAppointment.start)
                        : ""
                    }
                    readOnly
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
                    Paciente
                  </FormLabel>
                  <Input
                    name="fecha"
                    type="text"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedAppointment
                        ? personFullNameFormater(selectedAppointment.subject)
                        : ""
                    }
                    readOnly
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
              </form>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
