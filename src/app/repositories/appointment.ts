import { localDomain } from "@/types/domain";
import Appointment from "../interfaces/Appointment";
const moduleName = "appointment";
export class AppointmentService {
  static async getAppointments(): Promise<Appointment[]> {
    const res = await fetch(localDomain + moduleName);
    const data: Appointment[] = await res.json();
    return data;
  }
  static async getPendingAppointments(): Promise<Appointment[]> {
    const res = await fetch(localDomain + moduleName + "/pendientes");
    const data: Appointment[] = await res.json();
    return data;
  }
  static async getActiveAppointments(): Promise<Appointment[]> {
    const res = await fetch(localDomain + moduleName + "/confirmadas");
    const data: Appointment[] = await res.json();
    return data;
  }
  static async getCanceledAppointments(): Promise<Appointment[]> {
    const res = await fetch(localDomain + moduleName + "/canceladas");
    const data: Appointment[] = await res.json();
    return data;
  }
  static async createAppointment(cita: Appointment) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
    const data = await res.json();
    return data;
  }
  static async updateAppointment(cita: Appointment) {
    const res = await fetch(localDomain + moduleName, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
    const data = await res.json();
    return data;
  }
  static async disableAppointment(cita: Appointment) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
    const data = await res.json();
    return data;
  }
  static async enableAppointment(cita: Appointment) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
    const data = await res.json();
    return data;
  }
  static async confirmAppointment(id: string) {
    const res = await fetch(localDomain + moduleName + "/confirmar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const data = await res.json();
    return data;
  }
  static async cancelAppointment(id: string) {
    const res = await fetch(localDomain + moduleName + "/cancelar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const data = await res.json();
    return data;
  }
}
