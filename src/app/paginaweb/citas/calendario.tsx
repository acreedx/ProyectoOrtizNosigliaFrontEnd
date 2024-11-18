"use client";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import listPlugin from "@fullcalendar/list";
import {
  DateSelectArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import interactionPlugin from "@fullcalendar/interaction";
import { events } from "./eventos_prueba";
import {
  Box,
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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Appointment, Person } from "@prisma/client";
import { getDentistas } from "@/controller/paginaweb/dentistasController";
import { listarCitasPorPaciente } from "@/controller/paginaweb/citasController";
import ModalDeCreacion from "./modal_de_creacion";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { timeFormatter } from "@/utils/time_formater";
import ModalDeInformacion from "./modal_de_informacion";
interface CustomEvent extends EventInput {
  extendedProps?: {
    appointment: Appointment;
  };
}
export default function Calendario({
  appointments,
  dentistas,
  reloadData,
}: {
  appointments: (Appointment & {
    practitioner: Person;
  })[];
  dentistas: Person[];
  reloadData: Function;
}) {
  const {
    isOpen: isSecondModalOpen,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment & { practitioner: Person }
  >();
  const [eventos, seteventos] = useState<CustomEvent[]>([]);
  function handleDateSelect(selectInfo: DateSelectArg) {
    if (selectInfo.start < new Date()) {
      mostrarAlertaError("Escoja una fecha posterior para crear una cita");
      return;
    }
    setSelectedDate(selectInfo.start);
    onOpen();
  }
  function handleClickEvent(selectInfo: EventClickArg) {
    setSelectedAppointment(selectInfo.event.extendedProps.appointment);
    onOpenSecondModal();
  }
  useEffect(() => {
    try {
      let customEvents: CustomEvent[] = [];
      appointments.map((appointment, index) => {
        customEvents.push({
          title: appointment.reason,
          start: appointment.start,
          end: appointment.end,
          description: appointment.specialty,
          color: "#ce5e31",
          extendedProps: {
            appointment: appointment,
          },
        });
      });
      seteventos(customEvents);
    } catch (error: any) {
      mostrarAlertaError(error);
    }
  }, [appointments]);
  return (
    <div className="w-full rounded-sm border border-stroke bg-white p-8 text-black shadow-default dark:border-strokedark dark:bg-boxdark">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth,listMonth",
        }}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        locale={esLocale}
        slotMinTime="08:00:00"
        slotMaxTime="17:00:00"
        weekends={false}
        events={eventos}
        eventClick={handleClickEvent}
      />
      <ModalDeCreacion
        selectedDate={selectedDate}
        dentistas={dentistas}
        isOpen={isOpen}
        onClose={onClose}
        reloadData={reloadData}
      />
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
                          ? selectedAppointment.start
                              .toISOString()
                              .split("T")[0]
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
                      Doctor
                    </FormLabel>
                    <Input
                      name="fecha"
                      type="text"
                      bg="transparent"
                      borderColor="gray.400"
                      defaultValue={
                        selectedAppointment
                          ? personFullNameFormater(
                              selectedAppointment.practitioner,
                            )
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
      <ModalDeInformacion
        selectedAppointment={selectedAppointment}
        isSecondModalOpen={isSecondModalOpen}
        onCloseSecondModal={onCloseSecondModal}
      />
    </div>
  );
}
