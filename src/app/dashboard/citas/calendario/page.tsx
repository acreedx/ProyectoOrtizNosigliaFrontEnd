"use client";
import React, { useEffect, useRef, useState } from "react";
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
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { Appointment } from "@prisma/client";
import {
  crearCita,
  editarCita,
  listarCitas,
} from "@/controller/dashboard/citas/citasController";
import { useSession } from "next-auth/react";
import { mostrarAlertaExito } from "@/utils/show_success_alert";

export default function ListadoCitas() {
  const { data: session } = useSession();
  const [eventos, setEventos] = useState<EventInput[]>([]);
  const personas: any[] = [];
  const fetchData = async () => {
    const eventos: Appointment[] = await listarCitas();
    let inputs: EventInput[] = [];
    eventos.forEach((e) => {
      inputs.push({
        id: e.id,
        title: e.description!,
        start: e.start,
        end: e.end,
        paciente: e.subjectId,
        doctor: e.practitionerId,
      });
    });
    setEventos(inputs);
  };
  useEffect(() => {
    fetchData();
  }, []);
  function handleDateSelect(selectInfo: DateSelectArg) {
    const now = new Date();
    if (selectInfo.start < now) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "No se puede crear una cita en una fecha anterior",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#28a745",
      });
      selectInfo.view.calendar.unselect();
      return;
    }
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
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const { motivo, persona } = result.value;
        const startDate = new Date(selectInfo.start);
        startDate.setHours(8, 0, 0, 0);
        const endDate = new Date(selectInfo.start);
        endDate.setHours(9, 0, 0, 0);
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        try {
          const cita: Appointment = {
            resourceType: "Appointment",
            status: "pending",
            description: motivo,
            start: startDate,
            end: endDate,
            subjectId: "",
            practitionerId: session?.user.id!,
            specialty: "",
            reason: "",
          } as Appointment;
          const res = await crearCita(cita);
          //const newEvent = {
          //  id: nuevaCita._id,
          //  title: `${motivo}`,
          //  start: startDate.toISOString(),
          //  end: endDate.toISOString(),
          //  paciente: persona,
          //  doctor: "Ortiz",
          //};
          //calendarApi.addEvent(newEvent);
          //setEventos([...eventos, newEvent]);
        } catch (error) {
          console.error("Error en el fetch:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo agendar la cita",
          });
        }
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
    const now = new Date();
    if (info.event.start && info.event.start < now) {
      await Swal.fire({
        title: "Error",
        icon: "error",
        text: "No se puede mover la cita a una fecha anterior",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#28a745",
      });
      info.revert();
      return;
    }
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
    }).then(async (result) => {
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
        if (!info.event.allDay) {
          const cita: Appointment = {
            id: info.event.id,
            resourceType: "Appointment",
            status: "pending",
            description: info.event.title,
            start: info.event.start!,
            end: info.event.end!,
          } as Appointment;
          const res = await editarCita(info.event.id, cita);
          if (res.message) {
            mostrarAlertaExito(res.message);
          }
        }
      } else {
        info.revert();
      }
    });
  };
  function renderEventContent(eventInfo: EventContentArg) {
    const now = new Date();
    const isPastEvent = eventInfo.event.start && eventInfo.event.start < now;
    console.log(isPastEvent);
    return (
      <div
        className={`flex h-full w-full flex-wrap overflow-hidden ${
          isPastEvent ? "bg-rose-600 text-white" : ""
        }`} // Añadir fondo rojo si es un evento antiguo
      >
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
  const handleResize = async (info: EventResizeDoneArg) => {
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
    const appointment: Appointment = {
      resourceType: "Appointment",
      status: "pending",
      description: info.event.title,
      start: info.event.start!,
      end: info.event.end!,
    } as Appointment;
    const res = await editarCita(info.event.id, appointment);
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
