import { localDomain } from "@/types/domain";
import Permission from "@/interfaces/Permission";
const moduleName = "permission";
export class PermissionService {
  static async getPermissions(): Promise<Permission[]> {
    const res = await fetch(localDomain + moduleName);
    const data: Permission[] = await res.json();
    return data;
  }
  static async getActivePermissions(): Promise<Permission[]> {
    const res = await fetch(localDomain + moduleName + "/active");
    const data: Permission[] = await res.json();
    return data;
  }
  static async getInactivePermissions(): Promise<Permission[]> {
    const res = await fetch(localDomain + moduleName + "/inactive");
    const data: Permission[] = await res.json();
    return data;
  }
}
