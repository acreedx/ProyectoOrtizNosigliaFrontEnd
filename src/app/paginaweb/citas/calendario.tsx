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
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Appointment, Person } from "@prisma/client";
import { getDentistas } from "@/controller/paginaweb/dentistasController";
import { listarCitasPorPaciente } from "@/controller/paginaweb/citasController";
import ModalDeCreacion from "./modal_de_creacion";
import { mostrarAlertaError } from "@/utils/show_error_alert";
interface CustomEvent extends EventInput {
  extendedProps?: {
    appointment: Appointment;
  };
}
export default function Calendario() {
  const {
    isOpen: isSecondModalOpen,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>(
    events[0].extendedProps?.appointment as Appointment,
  );
  const [dentistas, setdentistas] = useState<Person[]>([]);
  const [eventos, seteventos] = useState<CustomEvent[]>([]);
  function handleDateSelect(selectInfo: DateSelectArg) {
    setSelectedDate(selectInfo.start);
    onOpen();
  }
  function handleClickEvent(selectInfo: EventClickArg) {
    setSelectedAppointment(selectInfo.event.extendedProps.appointment);
    onOpenSecondModal();
  }
  const fetchData = async () => {
    try {
      setdentistas(await getDentistas());
      const appointments: Appointment[] = await listarCitasPorPaciente();
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
  };
  useEffect(() => {
    fetchData();
  }, []);
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
        reloadData={fetchData}
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
                <pre>{JSON.stringify(selectedAppointment, null, 2)}</pre>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
