import { prisma } from "@/prisma";
import { auditEventOutcome, auditEventSeverity } from "@/types/auditEventTypes";
import { AuditEvent } from "@prisma/client";

export const logAuditEvent = async (eventData: Partial<AuditEvent>) => {
  const auditEvent: AuditEvent = {
    type: "Action",
    action: eventData.action,
    severity: eventData.severity || auditEventSeverity.SEVERIDAD_BAJA,
    outcome: eventData.outcome || auditEventOutcome.OUTCOME_EXITO,
    module: eventData.module,
    detail: eventData.detail || "No hay detalles",
    requestor: eventData.requestor || false,
    occurredDateTime: eventData.occurredDateTime || new Date(),
    network: eventData.network || "Desconocido",
    personName: eventData.personName,
    personRole: eventData.personRole,
    personId: eventData.personId,
  } as AuditEvent;

  try {
    await prisma.auditEvent.create({
      data: auditEvent,
    });
  } catch (error) {
    console.error("Error al registrar el evento de auditoría:", error);
  }
};
