import Permission from "./Permission";

export default interface Role {
  _id: string; // ID único del rol
  roleName: string; // Nombre del rol
  permissions: Permission[]; // Lista de permisos asociados (puedes usar un tipo más específico si es necesario)
  active: boolean; // Estado del rol (activo/inactivo)
}
