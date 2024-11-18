export enum auditEventTypes {
  ACCESS = "acceso",
  AUTHENTICATION = "autenticacion",
  ACTION = "accion",
  CONFIGURATION = "configuracion",
  SYSTEM = "sistema",
}

export enum auditEventSeverity {
  SEVERIDAD_BAJA = "baja",
  SEVERIDAD_MEDIA = "media",
  SEVERIDAD_ALTA = "alta",
}

export enum auditEventOutcome {
  OUTCOME_EXITO = "exito",
  OUTCOME_ERROR = "error",
  OUTCOME_DESCONOCIDO = "desconocido",
}

export enum auditEventAction {
  ACCION_LEER = "leer",
  ACCION_CREAR = "crear",
  ACCION_EDITAR = "editar",
  ACCION_ELIMINAR = "eliminar",
  ACCION_INICIAR_SESION = "inicio_sesion",
  ACCION_CERRAR_SESION = "cerrar_sesion",
  ACCION_CAMBIAR_CONTRASENA = "cambio_password",
  ACCION_RECUPERAR_CONTRASENA = "recuperar_password",
}

export enum modulos {
  MODULO_PACIENTES = "pacientes",
  MODULO_CITAS = "citas",
  MODULO_USUARIOS = "usuarios",
  MODULO_TRATAMIENTOS = "tratamientos",
  MODULO_DEUDAS = "deudas",
  MODULO_APLICACION_MOVIL = "aplicacion_movil",
  MODULO_PAGINA_WEB = "pagina_web",
}
