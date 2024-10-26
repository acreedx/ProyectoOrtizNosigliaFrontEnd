import { EventInput } from "@fullcalendar/core/index.js";
import { Appointment } from "@prisma/client";

interface CustomEvent extends EventInput {
  extendedProps?: {
    appointment: Appointment;
  };
}
export const events: CustomEvent[] = [
  {
    title: "Consulta Médica",
    start: "2024-10-25T10:00:00",
    end: "2024-10-25T11:00:00",
    description: "Consulta médica regular",
    color: "#ce5e31",
    extendedProps: {
      appointment: {
        id: "",
        specialty: "",
        reason: "",
        start: new Date("2024-10-25T10:00:00"),
        end: new Date("2024-10-25T10:00:00"),
      } as Appointment,
    },
  },
  {
    title: "Reunión de equipo",
    start: "2024-10-28T09:00:00",
    end: "2024-10-28T10:30:00",
    color: "#31ce58",
    extendedProps: {
      appointment: {
        id: "",
        specialty: "",
        reason: "",
        start: new Date("2024-10-25T10:00:00"),
        end: new Date("2024-10-25T10:00:00"),
      } as Appointment,
    },
  },
  {
    title: "Examen de laboratorio",
    start: "2024-10-29T09:00:00",
    end: "2024-10-29T10:30:00",
    description: "Examen de laboratorio anual",
    extendedProps: {
      appointment: {
        id: "",
        specialty: "",
        reason: "",
        start: new Date("2024-10-25T10:00:00"),
        end: new Date("2024-10-25T10:00:00"),
      } as Appointment,
    },
  },
];
