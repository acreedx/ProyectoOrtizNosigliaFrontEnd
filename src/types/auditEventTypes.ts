export enum auditEventTypes {
  SEVERIDAD_BAJA = "Baja",
  SEVERIDAD_MEDIA = "Media",
  SEVERIDAD_ALTA = "Alta",
}

export enum auditEventSeverity {
  SEVERIDAD_BAJA = "Baja",
  SEVERIDAD_MEDIA = "Media",
  SEVERIDAD_ALTA = "Alta",
}

export enum auditEventOutcome {
  OUTCOME_EXITO = "Exito",
  OUTCOME_ERROR = "Error",
}

export enum auditEventAction {
  ACCION_LEER = "Leer",
  ACCION_CREAR = "Crear",
  ACCION_EDITAR = "Editar",
  ACCION_ELIMINAR = "Eliminar",
  ACCION_INICIAR_SESION = "Inicio_Sesion",
  ACCION_CERRAR_SESION = "Cerrar_Sesion",
}

export enum modulos {
  MODULO_PACIENTES = "Pacientes",
  MODULO_CITAS = "Citas",
  MODULO_USUARIOS = "Usuarios",
  MODULO_TRATAMIENTOS = "Tratamientos",
  MODULO_DEUDAS = "Deudas",
  MODULO_APLICACION_MOVIL = "Aplicacion_Movil",
  MODULO_PAGINA_WEB = "Pagina_Web",
}
