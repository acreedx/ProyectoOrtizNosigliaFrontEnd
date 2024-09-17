import { localDomain } from "@/types/domain";
import Appointment from "../interfaces/Appointment";
const moduleName = "appointment";
export class AppointmentService {
  static async getAppointments(): Promise<Appointment[]> {
    const res = await fetch(localDomain + moduleName);
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
  static async confirmAppointment(cita: Appointment) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
    const data = await res.json();
    return data;
  }
  static async cancelAppointment(cita: Appointment) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
    const data = await res.json();
    return data;
  }
}
