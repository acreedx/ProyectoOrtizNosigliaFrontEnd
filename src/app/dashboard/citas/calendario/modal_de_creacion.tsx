"use client";
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
import { useState } from "react";

export default function ModalDeCreacion({
  selectedDate,
  dentistas,
  isOpen,
  onClose,
  reloadData,
}: {
  selectedDate: any;
  dentistas: any[];
  isOpen: boolean;
  onClose: () => void;
  reloadData: Function;
}) {
  const [errors, setErrors] = useState<any>({});
  const [isloading, setisloading] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisloading(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    try {
      const response = await crearCita(formData);
      if (response.message) {
        onClose();
        reloadData();
        mostrarAlertaExito(response.message);
      }
      if (response.errors) {
        setErrors(response.errors);
      }
      if (response.error) {
        onClose();
        mostrarAlertaError(response.error);
      }
    } catch (e: any) {
      onClose();
      mostrarAlertaError(e.message);
    } finally {
      setisloading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalHeader>
          <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
            Creación de citas
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="full">
            <Box>
              <form onSubmit={handleFormSubmit}>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Motivo de la cita
                  </FormLabel>
                  <Textarea
                    name="descripcion"
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
                  {errors.descripcion && (
                    <Text color="red.500">
                      {errors.descripcion._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>
                <FormControl mb={6} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Fecha
                  </FormLabel>
                  <Input
                    name="fecha"
                    type="date"
                    value={selectedDate.toISOString().split("T")[0]}
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
                    readOnly
                  />
                  {errors.fecha && (
                    <Text color="red.500">
                      {errors.fecha._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>
                <FormControl mb={6} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Hora
                  </FormLabel>
                  <Select
                    name="hora"
                    placeholder="Seleccione una hora"
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
                    {generateTimeOptions("08:00", "17:00", 30).map(
                      (time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ),
                    )}
                  </Select>
                  {errors.hora && (
                    <Text color="red.500">
                      {errors.hora._errors.join(", ")}
                    </Text>
                  )}
                </FormControl>
                <FormControl mb={6} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Paciente
                  </FormLabel>
                  <Select
                    name="doctor"
                    placeholder="Seleccione un paciente"
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
                    {dentistas.map((dentista, index) => {
                      return (
                        <option key={index} value={dentista.id}>
                          {personFullNameFormater(dentista)}
                        </option>
                      );
                    })}
                  </Select>
                  {errors.doctor && (
                    <Text color="red.500">
                      {errors.doctor._errors.join(", ")}
                    </Text>
                  )}
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
                  Registrar cita
                </Button>
              </form>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
