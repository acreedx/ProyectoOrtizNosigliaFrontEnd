"use client";
import { listarPacientes } from "@/controller/dashboard/pacientes/listarPacientes";
import { crearTratamiento } from "@/controller/dashboard/tratamientos/crearTratamiento";
import { listarTiposTratamientoActivos } from "@/controller/dashboard/tratamientos/tipos_de_tratamiento/listarTiposTratamiento";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { CarePlan, Person, Treatments } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function BotonCreacion({
  reloadData,
}: {
  reloadData: Function;
}) {
  const [careplan, setcareplan] = useState<CarePlan>();
  const [pacientes, setpacientes] = useState<Person[]>([]);
  const [tratamientos, settratamientos] = useState<Treatments[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nuevotratamiento, setnuevotratamiento] = useState<Treatments>();
  const [selectedtreatmentType, setselectedtreatmentType] =
    useState<Treatments>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  const fetchData = async () => {
    setpacientes(await listarPacientes());
    settratamientos(await listarTiposTratamientoActivos());
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  }, []);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedTreatment = tratamientos.find(
      (tratamiento) => tratamiento.treatmentType === selectedId,
    );
    setselectedtreatmentType(selectedTreatment);
  };
  const handleSubmit = async (event: React.FormEvent) => {
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
      practitionerId: session?.user.id,
    } as CarePlan;
    try {
      const response = await crearTratamiento(tratamiento);
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
    <>
      <Button colorScheme="teal" onClick={onOpen} float="right" mr={4} mb={4}>
        Asignar Tratamiento
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Asignar Tratamiento
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={handleSubmit}>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Tipo de Tratamiento
                    </FormLabel>
                    <Select
                      name="treatmentType"
                      placeholder="Selecciona un tipo de tratamiento"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedtreatmentType?.treatmentType || ""}
                      onChange={handleSelectChange}
                      _hover={{ borderColor: "orange.500" }}
                      _focus={{ borderColor: "orange.500" }}
                      _dark={{
                        bg: "gray.700",
                        color: "white",
                        borderColor: "gray.600",
                        _hover: { borderColor: "orange.500" },
                      }}
                    >
                      {tratamientos.map((tratamiento, index) => {
                        return (
                          <option key={index} value={tratamiento.treatmentType}>
                            {tratamiento.treatmentType}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Título
                    </FormLabel>
                    <Input
                      name="title"
                      type="text"
                      bg="transparent"
                      defaultValue={selectedtreatmentType?.title || ""}
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Paciente
                    </FormLabel>
                    <Select
                      name="paciente"
                      placeholder="Selecciona un paciente"
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
                      defaultValue={selectedtreatmentType?.description || ""}
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Citas estimadas
                    </FormLabel>
                    <Input
                      name="estimatedAppointments"
                      type="number"
                      defaultValue={
                        selectedtreatmentType?.estimatedAppointments || ""
                      }
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Días entre citas
                    </FormLabel>
                    <Input
                      name="daysBetweenAppointments"
                      type="number"
                      defaultValue={
                        selectedtreatmentType?.daysBetweenAppointments || ""
                      }
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
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Costo Estimado
                    </FormLabel>
                    <Input
                      name="costEstimation"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={selectedtreatmentType?.costEstimation || ""}
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
                      defaultValue={new Date().toISOString().split("T")[0]}
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
                              (selectedtreatmentType?.estimatedAppointments ||
                                0) *
                                (selectedtreatmentType?.daysBetweenAppointments ||
                                  0),
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
                  >
                    Crear nuevo Tratamiento
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
