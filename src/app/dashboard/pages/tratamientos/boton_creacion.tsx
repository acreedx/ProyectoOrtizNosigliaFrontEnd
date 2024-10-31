import { listarPacientes } from "@/serveractions/dashboard/pacientes/listarPacientes";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { mostrarAlertaError } from "@/utils/show_error_alert";
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
import { CarePlan, Organization, Person, Treatments } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function BotonCreacion() {
  const [careplan, setcareplan] = useState<CarePlan>();
  const [pacientes, setpacientes] = useState<Person[]>([]);
  const [tratamientos, settratamientos] = useState<Treatments[]>([]);
  const [nuevotratamiento, setnuevotratamiento] = useState<Treatments>();
  const [selectedtreatmentType, setselectedtreatmentType] =
    useState<Treatments>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    try {
      const fetchData = async () => {
        setpacientes(await listarPacientes());
        settratamientos([
          {
            id: "1",
            resourceType: "Treatment",
            treatmentType: "Ortodoncia",
            title: "Tratamiento de ortodoncia básico",
            description: "Tratamiento para corregir la alineación dental.",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-12-31"),
            estimatedAppointments: 10,
            daysBetweenAppointments: 30,
            totalAppointments: 10,
            costEstimation: 1200.0,
          } as Treatments,
          {
            id: "2",
            resourceType: "Treatment",
            treatmentType: "Blanqueamiento",
            title: "Blanqueamiento dental avanzado",
            description:
              "Tratamiento para mejorar la apariencia de los dientes.",
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-15"),
            estimatedAppointments: 2,
            daysBetweenAppointments: 7,
            totalAppointments: 2,
            costEstimation: 300.0,
          } as Treatments,
          {
            id: "3",
            resourceType: "Treatment",
            treatmentType: "Implantes",
            title: "Implante dental",
            description: "Colocación de un implante dental.",
            startDate: new Date("2024-03-01"),
            endDate: new Date("2024-06-01"),
            estimatedAppointments: 5,
            daysBetweenAppointments: 30,
            totalAppointments: 5,
            costEstimation: 2000.0,
          } as Treatments,
        ]);
      };
      fetchData();
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  }, []);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedTreatment = tratamientos.find(
      (tratamiento) => tratamiento.id === selectedId,
    );
    setselectedtreatmentType(selectedTreatment);
  };
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} float="right" mr={4} mb={4}>
        Crear Tratamiento
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading fontSize="2xl" color="black" _dark={{ color: "white" }}>
              Crear nuevo Tratamiento
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <Box>
                <form onSubmit={() => {}}>
                  <FormControl mb={4} isRequired>
                    <FormLabel color="black" _dark={{ color: "white" }}>
                      Tipo de Tratamiento
                    </FormLabel>
                    <Select
                      name="tipo_tratamiento"
                      bg="transparent"
                      borderColor="gray.400"
                      value={selectedtreatmentType?.id || ""}
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
                          <option key={index} value={tratamiento.id}>
                            {tratamiento.description}
                          </option>
                        );
                      })}
                    </Select>
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
                      name="name"
                      type="text"
                      bg="transparent"
                      value={selectedtreatmentType?.description}
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
                      name="name"
                      type="number"
                      value={selectedtreatmentType?.estimatedAppointments}
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
                      name="costo_estimado"
                      type="number"
                      bg="transparent"
                      borderColor="gray.400"
                      value={selectedtreatmentType?.costEstimation}
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
                        new Date(new Date().setMonth(new Date().getMonth() + 3))
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
