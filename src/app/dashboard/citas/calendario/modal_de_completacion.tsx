"use client";
import {
  completarCita,
  crearCitaDentista,
} from "@/controller/dashboard/citas/citasController";
import { crearCita } from "@/controller/paginaweb/citasController";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import generateTimeOptions from "@/utils/generate_time_options";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
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
  Select,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { Appointment, Patient } from "@prisma/client";
import { useState } from "react";

export default function ModalDeCompletacion({
  selectedAppointment,
  isSecondModalOpen,
  onCloseSecondModal,
  reloadData,
}: {
  selectedAppointment: (Appointment & { subject: Patient }) | undefined;
  isSecondModalOpen: boolean;
  onCloseSecondModal: () => void;
  reloadData: Function;
}) {
  const [isloading, setisloading] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisloading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await completarCita(selectedAppointment!.id, formData);
      onCloseSecondModal();
      mostrarAlertaExito(response.message);
      reloadData();
    } catch (e: any) {
      onCloseSecondModal();
      mostrarAlertaError(e.message);
    } finally {
      setisloading(false);
    }
  };
  return (
    <Modal isOpen={isSecondModalOpen} onClose={onCloseSecondModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalHeader>
          <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
            Completar la cita
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="full">
            <Box>
              <form onSubmit={handleFormSubmit}>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Diagnóstico de la cita
                  </FormLabel>
                  <Textarea
                    name="diagnostico"
                    placeholder="Ingrese el diagnóstico de la cita"
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
                  isLoading={isloading}
                >
                  Completar la cita
                </Button>
              </form>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
