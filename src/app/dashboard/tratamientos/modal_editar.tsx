import { editarTratamiento } from "@/controller/dashboard/tratamientos/editarTratamiento";
import { personFullNameFormater } from "@/utils/format_person_full_name";
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
  Select,
  Button,
  Input,
} from "@chakra-ui/react";
import { CarePlan, Person } from "@prisma/client";

import React, { useState } from "react";

export default function ModalEditar({
  isOpen,
  onClose,
  reloadData,
  selectedTreatment,
  pacientes,
}: {
  isOpen: boolean;
  onClose: () => void;
  reloadData: Function;
  selectedTreatment: CarePlan | undefined;
  pacientes: Person[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitEditar = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const tratamiento: CarePlan = {
      treatmentType: formData.get("treatmentType") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      startDate: new Date(formData.get("fecha_inicio") as string),
      estimatedAppointments: Number(formData.get("estimatedAppointments")),
      daysBetweenAppointments: Number(formData.get("daysBetweenAppointments")),
      costEstimation: Number(formData.get("costEstimation")),
      subjectId: formData.get("paciente") as string,
    } as CarePlan;
    try {
      const response = await editarTratamiento(
        formData.get("id") as string,
        tratamiento,
      );
      onClose();
      mostrarAlertaExito(response.message);
      reloadData();
    } catch (error: any) {
      onClose();
      mostrarAlertaError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalHeader>
          <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
            Editar Tratamiento
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="full">
            <Box>
              <form onSubmit={handleSubmitEditar}>
                <input
                  type="hidden"
                  name="id"
                  defaultValue={selectedTreatment?.id}
                />
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Tipo de tratamiento
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
                  />
                </FormControl>
                <FormControl mb={4} isRequired>
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
                  />
                </FormControl>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Paciente
                  </FormLabel>
                  <Select
                    name="paciente"
                    bg="transparent"
                    placeholder="Seleccione un Paciente"
                    borderColor="gray.400"
                    _hover={{ borderColor: "orange.500" }}
                    _focus={{ borderColor: "orange.500" }}
                    _dark={{
                      bg: "gray.700",
                      color: "white",
                      borderColor: "gray.600",
                      _hover: { borderColor: "orange.500" },
                    }}
                    defaultValue={selectedTreatment?.subjectId}
                  >
                    {pacientes.map((paciente, index) => {
                      return (
                        <option key={index} value={paciente.id}>
                          {personFullNameFormater(paciente) +
                            " - " +
                            paciente.identification}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Descripción
                  </FormLabel>
                  <Input
                    name="description"
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
                  />
                </FormControl>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Citas estimadas
                  </FormLabel>
                  <Input
                    name="estimatedAppointments"
                    type="number"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={selectedTreatment?.estimatedAppointments}
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
                    name="costEstimation"
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
                  />
                </FormControl>
                <FormControl mb={4} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Fecha Inicio
                  </FormLabel>
                  <Input
                    name="fecha_inicio"
                    type="date"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      selectedTreatment?.startDate.toISOString().split("T")[0]
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
                <FormControl mb={6} isRequired>
                  <FormLabel color="black" _dark={{ color: "white" }}>
                    Fecha Fin Estimada
                  </FormLabel>
                  <Input
                    name="fecha_fin"
                    type="date"
                    bg="transparent"
                    borderColor="gray.400"
                    defaultValue={
                      new Date(
                        new Date().setDate(
                          new Date().getDate() +
                            (selectedTreatment?.estimatedAppointments || 0) *
                              (selectedTreatment?.daysBetweenAppointments || 0),
                        ),
                      )
                        .toISOString()
                        .split("T")[0]
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
                <Button
                  type="submit"
                  w="full"
                  bg="orange.400"
                  color="white"
                  _hover={{ bg: "orange.500" }}
                  p={4}
                  borderRadius="lg"
                  isLoading={isLoading}
                >
                  Editar el Tratamiento
                </Button>
              </form>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
