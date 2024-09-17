"use client";
import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";
import { AppointmentService } from "@/app/repositories/appointment";
import Appointment from "@/app/interfaces/Appointment";

export default function ListadoCitas() {
  useEffect(() => {
    const getData = async () => {
      const eventos: Appointment[] = await AppointmentService.getAppointments();
      let inputs: EventInput[] = [];
      eventos.forEach((e) => {
        inputs.push({
          id: e._id,
          title: e.description,
          start: e.start,
          end: e.end,
          paciente: e.participant[0].actor.display,
          doctor: e.participant[1].actor.display,
        });
      });
      setEventos(inputs);
    };
    getData();
  }, []);
  const [eventos, setEventos] = useState<EventInput[]>([
    {
      id: "1",
      title: "Extracción de muelas",
      start: "2024-09-10T10:00:00",
      end: "2024-09-10T11:00:00",
      paciente: "Martin García",
      doctor: "Ortiz",
    },
    {
      id: "2",
      title: "Revisión Dental",
      start: "2024-09-16T12:00:00",
      end: "2024-09-16T13:00:00",
      paciente: "Juan Pérez",
      doctor: "Ortiz",
    },
    {
      id: "3",
      title: "Control de Salud",
      start: "2024-09-16T14:00:00",
      end: "2024-09-16T15:00:00",
      paciente: "Camilo Mendoza",
      doctor: "Ortiz",
    },
  ]);
  const personas = [
    { id: 1, nombre: "Martin García" },
    { id: 2, nombre: "Juan Pérez" },
    { id: 3, nombre: "Camilo Mendoza" },
  ];
  function handleDateSelect(selectInfo: DateSelectArg) {
    Swal.fire({
      title: "Agendar Cita",
      html: `
        <label for="motivo">Motivo de la cita:</label>
        <input id="motivo" class="swal2-input" placeholder="Motivo de la cita" /></br></br>
        <label for="persona">Elige a una persona:</label>
        <select id="persona" class="swal2-input">
          ${personas
            .map(
              (persona) =>
                `<option value="${persona.nombre}">${persona.nombre}</option>`,
            )
            .join("")}
        </select>
      `,
      focusConfirm: false,
      confirmButtonText: "Confirmar cita",
      confirmButtonColor: "#28a745",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#dc3545",
      preConfirm: () => {
        const motivo = (document.getElementById("motivo") as HTMLInputElement)
          .value;
        const persona = (
          document.getElementById("persona") as HTMLSelectElement
        ).value;
        if (!motivo || !persona) {
          Swal.showValidationMessage("Por favor, completa ambos campos");
        }
        return { motivo, persona };
      },
    }).then((result: any) => {
      if (result.isConfirmed) {
        const { motivo, persona } = result.value;

        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        const newEvent = {
          id: String(eventos.length + 1),
          title: `${motivo}`,
          start: selectInfo.startStr,
          end: selectInfo.endStr ? selectInfo.endStr : selectInfo.startStr,
          paciente: persona,
          doctor: "Ortiz",
        };
        calendarApi.addEvent(newEvent);
        setEventos([...eventos, newEvent]);
      }
    });
  }
  function convertDate(fecha: Date) {
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  function convertTime(fecha: Date) {
    return fecha.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const manejarDropEvento = async (info: EventDropArg) => {
    const fechaPrevia = info.oldEvent.start
      ? convertDate(info.oldEvent.start)
      : "";
    const fechaInicio = info.event.start ? convertDate(info.event.start) : "";
    const horaInicio = info.event.start ? convertDate(info.event.start) : "";
    const horaFinal = info.event.end ? convertDate(info.event.end) : "";
    const title = info.event.title || "(sin título)";
    let mensaje;
    if (info.event.allDay) {
      mensaje = `Cita "${title}" movido a la fecha ${fechaInicio}`;
    } else {
      mensaje = `Cita "${title}" movido a la fecha ${fechaInicio} de ${horaInicio} a ${horaFinal}`;
    }
    await Swal.fire({
      title: "Confirmación",
      text: `Esta seguro de mover la cita: '${title}' de la fecha ${fechaPrevia} a ${fechaInicio}`,
      icon: "question",
      confirmButtonText: "Ok",
      confirmButtonColor: "#28a745",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#dc3545",
    }).then((result) => {
      if (result.isConfirmed) {
        const eventosActualizados = eventos.map((evento: EventInput) => {
          if (evento.id === String(info.event.id)) {
            return {
              ...evento,
              start: info.event.startStr,
              end: info.event.endStr,
            };
          }
          return evento;
        });
        setEventos(eventosActualizados);
      } else {
        info.revert();
      }
    });
  };
  function renderEventContent(eventInfo: EventContentArg) {
    const currentView = eventInfo.view.type;
    return (
      <div className="flex h-full w-full flex-wrap overflow-hidden">
        {eventInfo.event.allDay ? (
          <div className="mr-2">
            <b>{`Hora sin asignar `}</b>
          </div>
        ) : (
          <div className="mr-2">
            <b>Hora:{` `}</b>
            {eventInfo.event.start
              ? ` ${convertTime(eventInfo.event.start)}`
              : ""}
            {eventInfo.event.end
              ? ` - ${convertTime(eventInfo.event.end)}`
              : ""}
          </div>
        )}
        {eventInfo.event.extendedProps.paciente ? (
          <div className="mr-2">
            <div>
              <b>Paciente:</b>
              <i>{` ${eventInfo.event.extendedProps.paciente}`}</i>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="mr-2">
          <div>
            <b>Descripción:</b>
            <i>{` ${eventInfo.event.title}`}</i>
          </div>
        </div>
      </div>
    );
  }
  const handleResize = (info: EventResizeDoneArg) => {
    const eventosActualizados = eventos.map((evento: EventInput) => {
      if (evento.id === String(info.event.id)) {
        return {
          ...evento,
          start: info.event.startStr,
          end: info.event.endStr,
        };
      }
      return evento;
    });
    setEventos(eventosActualizados);
  };
  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;

    Swal.fire({
      title: `Detalles de la cita`,
      html: `
        <strong>Título:</strong> ${event.title}<br>
        <strong>Paciente:</strong> ${event.extendedProps.paciente}<br>
        <strong>Doctor:</strong> ${event.extendedProps.doctor}<br>
        <strong>Inicio:</strong> ${event.start ? event.start.toLocaleString("es-ES") : "N/A"}<br>
        <strong>Fin:</strong> ${event.end ? event.end.toLocaleString("es-ES") : "N/A"}<br>
        <strong><a href="/dashboard/pacientes" class="hover:text-orange-400">Ver información del paciente</a></strong>
      `,
      icon: "info",
      confirmButtonText: "Editar",
      confirmButtonColor: "#28a745",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cambiar detalles de la cita",
          html: `
          <label for="motivo">Motivo de la cita:</label>
          <input id="motivo" class="swal2-input" placeholder="Motivo de la cita" value='${event.title}' /></br></br>
          <label for="persona">Elige a una persona:</label>
          <select id="persona" class="swal2-input">
            ${personas
              .map(
                (persona) =>
                  `<option ${persona.nombre == event.extendedProps.paciente ? "selected" : ""} value="${persona.nombre}">${persona.nombre}</option>`,
              )
              .join("")}
          </select>
          `,
          focusConfirm: false,
          showDenyButton: true,
          confirmButtonText: "Editar cita",
          confirmButtonColor: "#28a745",
          denyButtonText: "Cancelar cita",
          denyButtonColor: "#dc3545",
          showCloseButton: true,
          preConfirm: () => {
            const motivo = (
              document.getElementById("motivo") as HTMLInputElement
            ).value;
            const persona = (
              document.getElementById("persona") as HTMLSelectElement
            ).value;
            if (!motivo || !persona) {
              Swal.showValidationMessage("Por favor, completa ambos campos");
            }
            return { motivo, persona };
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const { motivo, persona } = result.value;

            let calendarApi = info.view.calendar;
            calendarApi.unselect();

            const eventosActualizados = eventos.map((evento: EventInput) => {
              if (evento.id === String(info.event.id)) {
                return {
                  ...evento,
                  title: `${motivo}`,
                  start: info.event.startStr,
                  end: info.event.endStr,
                  paciente: persona,
                  doctor: "Ortiz",
                };
              }
              return evento;
            });
            setEventos(eventosActualizados);
          } else if (result.isDenied) {
            info.event.remove();
            const eventosActualizados = eventos.filter(
              (evento: EventInput) => evento.id !== String(info.event.id),
            );
            setEventos(eventosActualizados);
          }
        });
      }
    });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendario de Citas" />
      <div className="rounded-sm border border-stroke bg-white p-8 text-black shadow-default dark:border-strokedark dark:bg-boxdark">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          selectable={true}
          select={handleDateSelect}
          editable={true}
          locale={esLocale}
          events={eventos}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          eventDrop={manejarDropEvento}
          eventResize={handleResize}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          weekends={false}
        />
      </div>
    </DefaultLayout>
  );
}
