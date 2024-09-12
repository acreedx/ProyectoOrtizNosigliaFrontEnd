"use client";
import React, { useRef, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventContentArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import LoadingMessage from "../../components/LoadingMessage";
import Swal from "sweetalert2";
import { title } from "process";

export default function ListadoCitas() {
  const [eventos, setEventos] = useState<EventInput[]>([
    {
      id: "1",
      title: "Cita con el Doctor",
      start: "2024-09-10T10:00:00",
      end: "2024-09-10T11:00:00",
    },
    {
      id: "2",
      title: "Revisión Dental",
      start: "2024-09-16T12:00:00",
      end: "2024-09-16T13:00:00",
    },
    {
      id: "3",
      title: "Control de Salud",
      start: "2024-09-16T14:00:00",
      end: "2024-09-16T15:00:00",
    },
  ]);
  const personas = [
    { id: 1, nombre: "Paciente García" },
    { id: 2, nombre: "Paciente Pérez" },
    { id: 3, nombre: "Paciente Juan" },
  ];
  function handleDateSelect(selectInfo: DateSelectArg) {
    // SweetAlert para seleccionar el título y persona
    Swal.fire({
      title: "Agendar Cita",
      html: `
        <label for="motivo">Motivo de la cita:</label>
        <input id="motivo" class="swal2-input" placeholder="Motivo de la cita" /></br>
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
        console.log(calendarApi);
        const newEvent = {
          id: String(eventos.length + 1), // ID único para el evento
          title: `${motivo} - ${persona}`,
          start: selectInfo.startStr,
          end: selectInfo.endStr ? selectInfo.endStr : selectInfo.startStr, // Maneja rango o un solo día
        };
        calendarApi.addEvent(newEvent);
        setEventos([...eventos, newEvent]); // Guardar el nuevo evento en el estado
      }
    });
  }
  const manejarDropEvento = (info: EventDropArg) => {
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
    const fechaInicio = info.event.start
      ? info.event.start.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";

    const horaInicio = info.event.start
      ? info.event.start.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    const horaFinal = info.event.end
      ? info.event.end.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    const title = info.event.title || "(sin título)";
    alert(
      `Evento "${title}" movido a la fecha ${fechaInicio} de ${horaInicio} a ${horaFinal}`,
    );
  };
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <b>{eventInfo.timeText.toString()}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const handleResize = (info: EventResizeDoneArg) => {
    const updatedEvent = {
      ...info.event,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
    };
    setEventos([...eventos, updatedEvent]);
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
          eventResize={handleResize}
          initialView="dayGridMonth"
          selectable={true}
          events={eventos}
          select={handleDateSelect}
          editable={true}
          locale={esLocale}
          eventContent={renderEventContent}
          eventDrop={manejarDropEvento}
          slotMinTime="08:00:00"
          slotMaxTime="16:00:00"
          weekends={false}
        />
      </div>
    </DefaultLayout>
  );
}
