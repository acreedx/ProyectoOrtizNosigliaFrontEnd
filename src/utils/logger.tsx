import { prisma } from "@/config/prisma";
import {
  auditEventOutcome,
  auditEventSeverity,
  auditEventTypes,
} from "@/enums/auditEventTypes";
import { AuditEvent } from "@prisma/client";

export async function logEvent({
  type,
  action,
  severity,
  outcome,
  moduleName,
  detail,
  requestor,
  ocurredDateTime,
  network,
  personName,
  personRole,
  personId,
  patientId,
}: {
  type?: string;
  action: string;
  severity?: string;
  outcome?: string;
  moduleName: string;
  detail?: string;
  requestor?: boolean;
  ocurredDateTime?: Date;
  network?: string;
  personName: string;
  personRole: string;
  personId?: string;
  patientId?: string;
}) {
  await logAuditEvent({
    type: type,
    action,
    severity: severity,
    outcome: outcome,
    module: moduleName,
    detail: detail,
    requestor: requestor,
    occurredDateTime: ocurredDateTime,
    network: network,
    personName: personName,
    personRole: personRole,
    personId: personId,
    patientId: patientId,
  } as Partial<AuditEvent>);
}

const logAuditEvent = async (eventData: Partial<AuditEvent>) => {
  const auditEvent: AuditEvent = {
    type: eventData.type || auditEventTypes.SYSTEM,
    action: eventData.action,
    severity: eventData.severity || auditEventSeverity.SEVERIDAD_BAJA,
    outcome: eventData.outcome || auditEventOutcome.OUTCOME_EXITO,
    module: eventData.module,
    detail: eventData.detail || "No hay detalles",
    requestor: eventData.requestor || false,
    occurredDateTime: eventData.occurredDateTime || new Date(),
    network: eventData.network || "Red no proporcionada",
    personName: eventData.personName,
    personRole: eventData.personRole,
    personId: eventData.personId,
    patientId: eventData.patientId,
  } as AuditEvent;

  try {
    await prisma.auditEvent.create({
      data: auditEvent,
    });
  } catch (error) {
    console.error("Error al registrar el evento de auditoría:", error);
  }
};
