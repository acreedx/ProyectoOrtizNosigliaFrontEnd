import { Permission } from "@prisma/client";

export const PersonHasPermission = (
  permisos: Permission[],
  permissionName: string,
): boolean => {
  return permisos.some((permiso) => permiso.code === permissionName);
};
