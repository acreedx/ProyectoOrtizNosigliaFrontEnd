"use client";
import {
  Box,
  Flex,
  Stack,
  Text,
  IconButton,
  Heading,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
import Calendario from "./calendario";
import { SetStateAction, useEffect, useState } from "react";
import { Appointment, Person } from "@prisma/client";
import {
  cancelarCita,
  confirmarCita,
  listarCitasPorPaciente,
} from "@/controller/paginaweb/citasController";
import { AppointmentStatus } from "@/enums/appointmentsStatus";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { timeFormatter } from "@/utils/time_formater";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { mostrarAlertaExito } from "@/utils/show_success_alert";
import { mostrarAlertaConfirmacion } from "@/utils/show_question_alert";
import { getDentistas } from "@/controller/paginaweb/dentistasController";
import ModalDeInformacion from "./modal_de_informacion";

export default function CrearCitas() {
  const [loading, setloading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointment, setselectedAppointment] = useState<
    Appointment & { practitioner: Person }
  >();
  const [dentistas, setdentistas] = useState<Person[]>([]);
  const [citaspaciente, setcitaspaciente] = useState<
    (Appointment & { practitioner: Person })[]
  >([]);
  const [citaspacientependientes, setcitaspacientependientes] = useState<
    (Appointment & { practitioner: Person })[]
  >([]);
  const [citaspacienteconfirmadas, setcitaspacienteconfirmadas] = useState<
    (Appointment & { practitioner: Person })[]
  >([]);
  const [citaspacientecanceladas, setcitaspacientecanceladas] = useState<
    (Appointment & { practitioner: Person })[]
  >([]);
  const [citaspacientehistorial, setcitaspacientehistorial] = useState<
    (Appointment & { practitioner: Person })[]
  >([]);
  const fetchData = async () => {
    const citas: (Appointment & { practitioner: Person })[] =
      (await listarCitasPorPaciente()) as (Appointment & {
        practitioner: Person;
      })[];
    console.log(citas);
    setcitaspaciente(citas);
    setcitaspacientependientes(
      citas.filter(
        (cita) =>
          cita.status === AppointmentStatus.STATUS_PENDIENTE &&
          new Date(cita.start) > new Date(),
      ),
    );
    setcitaspacienteconfirmadas(
      citas.filter(
        (cita) =>
          cita.status === AppointmentStatus.STATUS_CONFIRMADA &&
          new Date(cita.start) > new Date(),
      ),
    );
    setcitaspacientecanceladas(
      citas.filter(
        (cita) =>
          cita.status === AppointmentStatus.STATUS_CANCELADA &&
          new Date(cita.start) > new Date(),
      ),
    );
    setcitaspacientehistorial(
      citas.filter(
        (cita) =>
          new Date(cita.start) < new Date() ||
          cita.status === AppointmentStatus.STATUS_COMPLETADA,
      ),
    );
    setdentistas(await getDentistas());
    setloading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Flex direction={{ base: "column", md: "row" }} w="100%">
      <Stack
        spacing={4}
        mt={4}
        w={{ base: "100%", md: "40%" }}
        paddingX={4}
        marginBottom={4}
      >
        <Heading fontSize={20} color="teal.600">
          Panel de citas
        </Heading>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <Heading fontSize={18} color="orange.500">
              Citas Pendientes
            </Heading>
            <Box
              overflowY="auto"
              maxHeight="400px"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="sm"
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              bg="gray.50"
            >
              {citaspacientependientes.length === 0 && (
                <div>No se encontraron citas pendientes</div>
              )}
              {citaspacientependientes.map((citaspaciente, index) => {
                return (
                  <AppointmentCard
                    key={index}
                    setselectedappointment={setselectedAppointment}
                    onOpen={onOpen}
                    appointmentData={citaspaciente}
                    reloadData={fetchData}
                  />
                );
              })}
            </Box>
            <Heading fontSize={18} color="green.500">
              Citas Confirmadas
            </Heading>
            <Box
              overflowY="auto"
              maxHeight="400px"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="sm"
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              bg="gray.50"
            >
              {citaspacienteconfirmadas.length === 0 && (
                <div>No se encontraron citas confirmadas</div>
              )}
              {citaspacienteconfirmadas.map((citaspaciente, index) => {
                return (
                  <AppointmentCard
                    key={index}
                    setselectedappointment={setselectedAppointment}
                    onOpen={onOpen}
                    appointmentData={citaspaciente}
                    reloadData={fetchData}
                  />
                );
              })}
            </Box>
            <Heading fontSize={18} color="red.500">
              Citas Canceladas
            </Heading>
            <Box
              overflowY="auto"
              maxHeight="400px"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="sm"
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              bg="gray.50"
            >
              {citaspacientecanceladas.length === 0 && (
                <div>No se encontraron citas canceladas</div>
              )}
              {citaspacientecanceladas.map((citaspaciente, index) => {
                return (
                  <AppointmentCard
                    key={index}
                    setselectedappointment={setselectedAppointment}
                    appointmentData={citaspaciente}
                    onOpen={onOpen}
                    reloadData={fetchData}
                  />
                );
              })}
            </Box>
            <Heading fontSize={18} color="purple.500">
              Historial
            </Heading>
            <Box
              overflowY="auto"
              maxHeight="400px"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="sm"
              display={"flex"}
              flexDirection={"column"}
              gap={4}
              bg="gray.50"
            >
              {citaspacientehistorial.length === 0 && (
                <div>No se encontraron citas en el historial</div>
              )}
              {citaspacientehistorial.map((citaspaciente, index) => {
                return (
                  <AppointmentCard
                    key={index}
                    setselectedappointment={setselectedAppointment}
                    appointmentData={citaspaciente}
                    onOpen={onOpen}
                    reloadData={fetchData}
                  />
                );
              })}
            </Box>
          </>
        )}
      </Stack>
      <Stack
        mt={4}
        w={{ base: "100%", md: "60%" }}
        alignItems="start"
        marginBottom={4}
        px={4}
      >
        <Heading fontSize={20} mb={2} color="teal.600" alignSelf={"center"}>
          Calendario de citas
        </Heading>
        <Heading fontSize={18} mb={2} color="orange.500">
          Escoja una fecha para empezar...
        </Heading>
        <Calendario
          dentistas={dentistas}
          appointments={citaspaciente}
          reloadData={fetchData}
        />
      </Stack>
      <ModalDeInformacion
        selectedAppointment={selectedAppointment}
        isSecondModalOpen={isOpen}
        onCloseSecondModal={onClose}
      />
    </Flex>
  );
}

function AppointmentCard({
  appointmentData,
  reloadData,
  setselectedappointment,
  onOpen,
}: {
  appointmentData: Appointment & { practitioner: Person };
  reloadData: Function;
  setselectedappointment: Function;
  onOpen: () => void;
}) {
  const handleConfirm = async (e: string) => {
    try {
      const isAccepted = await mostrarAlertaConfirmacion(
        "Confirmación",
        "Esta seguro de confirmar esta cita?",
      );
      if (isAccepted) {
        const response = await confirmarCita(e);
        mostrarAlertaExito(response.message);
        reloadData();
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleCancel = async (e: Appointment & { practitioner: Person }) => {
    try {
      const isAccepted = await mostrarAlertaConfirmacion(
        "Confirmación",
        `Esta seguro de cancelar su cita para el día ${birthDateFormater(e.start)} a las ${timeFormatter(e.start)}? Si cancela la cita con menos de un día de anticipación no podrá realizar mas citas`,
      );
      if (isAccepted) {
        const response = await cancelarCita(e.id);
        mostrarAlertaExito(response.message);
        reloadData();
      }
    } catch (e: any) {
      mostrarAlertaError(e);
    }
  };
  const handleShowInfo = async (e: Appointment & { practitioner: Person }) => {
    setselectedappointment(e);
    onOpen();
  };
  return (
    <Flex
      direction="row"
      bg="orange.400"
      py={2}
      px={4}
      shadow="lg"
      _hover={{ shadow: "2xl" }}
      align="center"
    >
      <Box w={"full"}>
        <Text color="white">
          <b>Fecha:</b> {birthDateFormater(appointmentData.start)}
        </Text>
        <Text color="white">
          <b>Hora:</b> {timeFormatter(appointmentData.start)}
        </Text>
        <Text color="white">
          <b>Doctor:</b>{" "}
          <span>{personFullNameFormater(appointmentData.practitioner)}</span>
        </Text>
      </Box>
      <Flex
        w="full"
        justify="flex-end"
        gap={4}
        textColor="white"
        width={"fit-content"}
      >
        {appointmentData.status === AppointmentStatus.STATUS_PENDIENTE && (
          <IconButton
            aria-label="Confirm"
            icon={<CheckIcon />}
            onClick={() => {
              handleConfirm(appointmentData.id);
            }}
            _hover={{ shadow: "lg" }}
            backgroundColor={"green.400"}
            color={"white"}
          />
        )}
        {appointmentData.status === AppointmentStatus.STATUS_CONFIRMADA ||
          (appointmentData.status === AppointmentStatus.STATUS_PENDIENTE && (
            <IconButton
              aria-label="Cancel"
              onClick={() => {
                handleCancel(appointmentData);
              }}
              icon={<CloseIcon />}
              _hover={{ shadow: "lg" }}
              backgroundColor={"red.400"}
              color={"white"}
            />
          ))}
        <IconButton
          aria-label="Info"
          onClick={() => {
            handleShowInfo(appointmentData);
          }}
          icon={<InfoIcon />}
          _hover={{ shadow: "lg" }}
          backgroundColor={"blue.400"}
          color={"white"}
        />
      </Flex>
    </Flex>
  );
}
