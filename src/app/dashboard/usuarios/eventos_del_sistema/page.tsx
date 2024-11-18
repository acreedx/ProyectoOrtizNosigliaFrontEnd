"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Heading,
  Input,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { AuditEvent } from "@prisma/client";
import { listarLogs } from "@/controller/dashboard/logs/eventos_del_sistemaController";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { auditEventOutcome } from "@/enums/auditEventTypes";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { timeFormatter } from "@/utils/time_formater";

export default function Logs() {
  const [loading, setloading] = useState(true);
  const [auditEvents, setauditEvents] = useState<AuditEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AuditEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logs = await listarLogs();
        setauditEvents(logs);
        setFilteredEvents(logs);
        setloading(false);
      } catch (e) {
        Swal.fire("Error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = auditEvents;
    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.action.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((log) => log.outcome === statusFilter);
    }
    setFilteredEvents(filtered);
  }, [searchQuery, statusFilter, auditEvents]);

  const columns: TableColumn<AuditEvent>[] = [
    {
      name: "Fecha",
      cell: (row) => birthDateFormater(row.occurredDateTime),
      ignoreRowClick: true,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const dateA = new Date(rowA.occurredDateTime).getTime();
        const dateB = new Date(rowB.occurredDateTime).getTime();
        return dateA - dateB;
      },
    },
    {
      name: "Hora",
      selector: (row) => timeFormatter(row.occurredDateTime),
      sortable: true,
    },
    {
      name: "Usuario",
      selector: (row) => row.personName,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.personRole,
      sortable: true,
    },
    {
      name: "Módulo",
      selector: (row) => row.module,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.outcome || "desconocido",
      sortable: true,
    },
    {
      name: "Accion",
      selector: (row) => row.action,
      sortable: true,
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Listado de Actividades" />
      {loading ? (
        <Spinner />
      ) : (
        <Box className="w-full rounded-sm border border-stroke bg-white py-6 shadow-default">
          <Heading as="h4" size="md" className="mb-6 px-7.5 text-black">
            Últimas actividades registradas
          </Heading>

          <Box mb={4} display="flex" gap={4} px={8}>
            <FormControl>
              <FormLabel>Ingresa un texto</FormLabel>
              <Input
                placeholder="Buscar por usuario, módulo o acción"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Filtrar por estado</FormLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value={`${auditEventOutcome.OUTCOME_EXITO}`}>
                  Éxito
                </option>
                <option value={`${auditEventOutcome.OUTCOME_ERROR}`}>
                  Error
                </option>
                <option value={`${auditEventOutcome.OUTCOME_DESCONOCIDO}`}>
                  Desconocido
                </option>
              </Select>
            </FormControl>
          </Box>

          <DataTable
            columns={columns}
            data={filteredEvents}
            pagination
            highlightOnHover
            responsive
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20]}
            paginationComponentOptions={paginationOptions}
            noDataComponent={noDataFoundComponent}
            customStyles={{
              headCells: {
                style: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  justifyContent: "center",
                },
              },
              cells: {
                style: {
                  justifyContent: "center",
                },
              },
            }}
          />
        </Box>
      )}
    </DefaultLayout>
  );
}
