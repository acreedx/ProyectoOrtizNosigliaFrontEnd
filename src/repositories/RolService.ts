import { localDomain } from "@/types/domain";
import Rol from "../interfaces/Rol";
const moduleName = "rol";
export class RolService {
  static async getRoles(): Promise<Rol[]> {
    const res = await fetch(localDomain + moduleName);
    const data: Rol[] = await res.json();
    return data;
  }
  static async getRolesById(id: string): Promise<Rol> {
    const res = await fetch(localDomain + moduleName + "/" + id);
    const data: Rol = await res.json();
    return data;
  }
  static async createRol(rol: Rol) {
    const res = await fetch(localDomain + moduleName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rol),
    });
    const data = await res.json();
    return data;
  }
  static async updateRol(rol: Rol) {
    const res = await fetch(localDomain + moduleName + "/" + rol._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rol),
    });
    const data = await res.json();
    return data;
  }
  static async enableRol(id: string): Promise<Rol> {
    const res = await fetch(localDomain + moduleName + "/habilitar/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data: Rol = await res.json();
    return data;
  }
  static async disableRol(id: string): Promise<Rol> {
    const res = await fetch(localDomain + moduleName + "/deshabilitar/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data: Rol = await res.json();
    return data;
  }
}
